const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js'); 
const {isLoggedIn} = require('../middleware.js');
const {isOwner} = require('../middleware.js');
const {validateListing} = require('../middleware.js');
const listingsController = require('../controller/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

router.route('/')
  .get( wrapAsync(listingsController.index))
  .post( isLoggedIn,  upload.single('image') ,validateListing, wrapAsync(listingsController.createListing));
  

router.route('/new')
  .get( isLoggedIn , listingsController.renderNewForm);


router.route('/:id')
  .get( wrapAsync(listingsController.renderShowListingForm))
  .put( isLoggedIn, isOwner, upload.single('image'), validateListing, wrapAsync(listingsController.updateListing))
  .delete( isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));


router.route('/:id/edit')
  .get( isLoggedIn, isOwner, wrapAsync(listingsController.renderEditListingForm));


module.exports = router;