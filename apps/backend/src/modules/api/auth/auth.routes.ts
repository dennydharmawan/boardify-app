import { Router } from 'express';
import passport from 'passport';

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
      res.redirect('http://localhost:5173');
    }
  );

  route.get('/logout', (req, res) => {
    // req.logout();
    res.redirect('/');
  });

  route.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });
};
