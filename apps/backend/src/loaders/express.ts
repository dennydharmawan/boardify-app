import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type express from 'express';
import httpContext from 'express-http-context';
import ruid from 'express-ruid';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import pinoHTTP from 'pino-http';

import CONFIG from '@/config';
import { User } from '@/models/user';
import { errorHandler, notFoundHandler } from '@/modules/error-handler/error-handler.middlewares';

import apiRoutesLoader from './api-routes';
import logger, { loggerContextMiddleware } from './logger';

export default ({ app }: { app: express.Application }) => {
  app.use(httpContext.middleware);
  app.use(ruid({ setInContext: true, attribute: 'requestId' }));
  app.use(loggerContextMiddleware);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: CONFIG.client.url, credentials: true }));

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );

  // Use express session to maintain state across requests
  app.use(
    session({
      secret: CONFIG.auth.cookieSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000 // Set the maximum age of the session to 24 hours (in milliseconds)
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: CONFIG.auth.clientId,
        clientSecret: CONFIG.auth.clientSecret,
        callbackURL: 'http://localhost:3001/api/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const defaultUser = {
          fullName: `${profile.name?.givenName} ${profile.name?.familyName}`,
          email: profile?.emails?.[0].value,
          avatarUrl: profile?.photos?.[0].value,
          googleId: profile.id
        };

        try {
          const [user] = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: defaultUser
          });

          done(null, profile);
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  // Enable logging
  if (CONFIG.log.enable) {
    app.use(
      pinoHTTP({
        logger
      })
    );
  }

  // Load API routes
  app.use(CONFIG.api.prefix, apiRoutesLoader());

  // Generic error handler
  app.use(notFoundHandler);
  app.use(errorHandler);
};
