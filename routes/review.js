const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync.js'); 
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');
const { reviewSchema } = require('../schema.js');




// Validation middleware for review data
const validateReview = (req , res , next) => {
    const result = reviewSchema.validate(req.body);  
    if (result.error) {
      console.log(result.error);
      throw new ExpressError(400, result.error.details[0].message);
    }
    else {
      next();
    }
}



// Review route
// Post review route
router.post('/', validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview); // Push the new review into the listing's reviews array
    await newReview.save(); // Save the new review
    await listing.save(); // Save the updated listing
    res.redirect('/listings/' + listing._id);
    // res.send("Review added successfully!");
}));

// Delete review route
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect('/listings/' + id);
}));


module.exports = router;