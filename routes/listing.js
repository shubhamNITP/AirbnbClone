const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync.js'); 
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');
const { reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');

// Validation middleware for listing data
const validateListing = (req , res , next) => {
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

 
// Index route
router.get('/', wrapAsync(async (req, res) => {
    const listings = await Listing.find();
    res.render("listings/index.ejs", { listings: listings });
}));




// New route
router.get('/new', (req, res) => {
  res.render("listings/new.ejs");
});

// Create route
router.post('/', validateListing, wrapAsync(async (req, res) => {
    if (!req.body.image || req.body.image.trim() === "") {
      delete req.body.image;
    }
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect('/listings');
}));


// Edit route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render("listings/edit.ejs", { listing: listing });
  }));


// Delete route
router.delete('/:id', wrapAsync(async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    res.redirect('/listings');
  }));
  


// Update route
router.put('/:id',validateListing , wrapAsync(async (req, res) => { 
    if (!req.body.image || req.body.image.trim() === "") {
      delete req.body.image;
    }
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedListing) {
      return res.status(404).send('Listing not found');
    }
    res.redirect('/listings/' + updatedListing._id);
   
}));


// Show route 
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }
    const listing = await Listing.findById(id).populate('reviews'); // Populate reviews
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render("listings/show.ejs", { listing: listing });
   
}));

module.exports = router;