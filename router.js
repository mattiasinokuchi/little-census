// Import authentication middleware
const passport = require('passport');

const { Router } = require("express");

const router = Router();

// Import renderings
const rendering = require('./controllers/rendering');
const counting = require('./controllers/counting');

// Define route for requests to homepage
router.get("/", rendering.home);

// Define route for request to login
router.post("/login",
  passport.authenticate('local',
  { failureRedirect: '/' }),
  rendering.login
);

// Define route for request to profile page
router.get("/profile", rendering.profile);

// Define route for request to logout
router.get('/logout', rendering.logout);

// Define route for request to register with login
router.post('/register',
  rendering.register,
  passport.authenticate('local'),
  rendering.login
);

// Define routes for requests to counting
router.get("/load", counting.load);
router.get("/let-in", counting.in);
router.get("/let-out", counting.out);
router.get("/reset", counting.reset);
router.get("/que", counting.que);
router.get("/call", counting.call);

// Make routes available from server.js
module.exports = router;
