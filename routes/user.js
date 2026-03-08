const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const middleware = require("../middleware.js");
const usersController = require('../controller/user.js');


router.route('/signup')
    .get(usersController.renderSignupForm)
    .post(wrapAsync(usersController.signupUser));


router.route('/login')
    .get(usersController.renderLoginForm)
    .post(middleware.saveRedirectUrl, passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), wrapAsync(usersController.loginUser));

router.route('/logout')
    .get(usersController.logoutUser);


module.exports = router;