const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

// Add review route
module.exports.addReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = res.locals.currentUser._id; // Set the author of the review to the current user
    console.log(newReview);
    listing.reviews.push(newReview); // Push the new review into the listing's reviews array
    await newReview.save(); // Save the new review
    await listing.save(); // Save the updated listing
    req.flash("success", "Review added successfully!");
    res.redirect('/listings/' + listing._id);
}

// Delete review route
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect('/listings/' + id);
}