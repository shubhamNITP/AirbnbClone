const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js'); 
const {validateReview, isLoggedIn , isAuthor} = require('../middleware.js');
const reviewsController = require('../controller/review.js');

// Add review route
router.route('/')
  .post(isLoggedIn, validateReview, wrapAsync(reviewsController.addReview));

// Delete review route
router.route('/:reviewId')
  .delete(isLoggedIn, isAuthor, wrapAsync(reviewsController.deleteReview));


module.exports = router;