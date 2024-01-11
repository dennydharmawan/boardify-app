import { Router } from 'express';
import passport from 'passport';

import CONFIG from '@/config';

export default (router: Router) => {
  const route = Router();

  router.use('/auth', route);

  route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  route.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      failureMessage: 'Cannot login to google, please try again later!'
    }),
    (req, res) => {
      res.redirect(CONFIG.client.url);
    }
  );

  route.get('/logout', (req, res) => {
    // req.logout();
    res.redirect('/');
  });

  route.get('/users/me', (req, res) => {
    res.json(req.user || null);
  });
};
