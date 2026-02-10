const Listing = require("./models/listing");
const { listingSchema , reviewSchema} = require('./schema.js');
const ExpressError = require('./utils/ExpressError');
const Review = require("./models/review.js");


// Authentication middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    }   
    next();
};


// Middleware to save redirect URL after login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }   
    next();
};


// Authorization middleware to check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    let {id } = req.params;
    let ListingToUpdate = await Listing.findById(id);
    if( res.locals.currentUser && !ListingToUpdate.owner.equals(res.locals.currentUser._id)){
      req.flash("error", "You do not have permission to do that!");
      return res.redirect('/listings/' + id);
    }
    next();
};


// Validation middleware for listing data
module.exports.validateListing = (req , res , next) => {
    const result = listingSchema.validate({listing: req.body });
    if (result.error) {
      // let errMsg = result.error.details.map(el => el.message).join(',');
      console.log(result.error);
      throw new ExpressError(400, result.error.details[0].message);
    }
    else {
      next();
    }
}



// Validation middleware for review data
module.exports.validateReview = (req , res , next) => {
    const result = reviewSchema.validate(req.body);  
    if (result.error) {
      console.log(result.error);
      throw new ExpressError(400, result.error.details[0].message);
    }
    else {
      next();
    }
}


module.exports.isAuthor = async (req, res, next) => {
    const { reviewId , id} = req.params;
    const review =  await Review.findById(reviewId);
    if( res.locals.currentUser && !review.author.equals(res.locals.currentUser._id)){
      req.flash("error", "You do not have permission to do that!");
      return res.redirect('/listings/' + id);
    }
    next();
};

