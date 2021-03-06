const passport = require('passport');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');

const listingsController = require('../controllers/listingsController.js');
const imageController = require('../controllers/imageController.js');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'dist/images/');
  },
  filename: function filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  },
});
const upload = multer({ storage });
// const upload = multer({ dest: 'dist/images/' });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('User is not authenticated. Redirect to splash');
  return res.redirect('/');
}

function checkLoginHandler(req, res) {
  if (req.session.isLoggedIn) {
    // Send back this response so client and use it to update state
    res.json(true);
  } else {
    res.redirect('/');
  }
}

module.exports = (app) => {
  app.get('/auth/github',
  passport.authenticate('github', { scope: ['repo'] }));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      console.log('User successfully authenticated with Github.');
      // On success, attach the logged in status to session for the duration
      // of the session. Will be used to set the state on the front end
      req.session.isLoggedIn = true;
      req.session.save();
      res.redirect('/');
    });

  app.post('/api/images', ensureAuthenticated, upload.single('file'), imageController.postImage);

  app.post('/api/listings', ensureAuthenticated, listingsController.addListing);
  app.get('/api/listings', ensureAuthenticated, listingsController.getListings);

  app.get('/checklogin', ensureAuthenticated, checkLoginHandler);

  app.post('/email', (req, res) => {
    console.log('email body', req.body);
    process.send({ email: { to: req.body.to, body: req.body.body } });
    res.end();
  });

  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  app.get('/compressed/*', imageController.getImage);

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
  });
};
