const Listing = require('../models/listing.js');
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError.js');

// Index route
module.exports.index = async (req, res) => {
    const listings = await Listing.find();
    res.render("listings/index.ejs", { listings: listings });
}


// New route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}


// Create route
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path || req.file.url,
      filename: req.file.filename
    };
  }

  await newListing.save();
  req.flash("success", "Listing created successfully!");
  res.redirect("/listings");
};


// Edit route
module.exports.renderEditListingForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404).
      req.flash("error", "Listing not found!");
      return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { listing: listing });
  }

// Delete route
module.exports.deleteListing = async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    req.flash("success", "Listing deleted successfully!");
    res.redirect('/listings');
  }


// Update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Update basic fields
  listing.title = req.body.title;
  listing.description = req.body.description;
  listing.price = req.body.price;
  listing.location = req.body.location;
  listing.country = req.body.country;

  // Only update image if a new file is uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path || req.file.url,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};


// Show route
module.exports.renderShowListingForm = async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }
    const listing = await Listing.findById(id).populate({path :'reviews', populate: {path: 'author'}}).populate('owner'); // Populate reviews and owner
    if (!listing) {
      res.status(404).
      req.flash("error", "Listing not found!");
      return res.redirect('/listings');
    }
    res.render("listings/show.ejs", { listing: listing });
   
}