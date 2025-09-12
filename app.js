const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js'); 
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require('./schema.js'); 

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE methods in forms

app.engine('ejs', ejsMate); // Use ejsMate for EJS layout support

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory

// Connect to MongoDB
main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust') ;
}



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



// Root route
app.get('/', (req, res) => {
  res.send("Hi , Welcome to the Express.js application!");  
});
 
// Index route
app.get('/listings', wrapAsync(async (req, res) => {
    const listings = await Listing.find();
    res.render("listings/index.ejs", { listings: listings });
}));




// New route
app.get('/listings/new', (req, res) => {
  res.render("listings/new.ejs");
});

// Create route
app.post('/listings', validateListing, wrapAsync(async (req, res) => {
    if (!req.body.image || req.body.image.trim() === "") {
      delete req.body.image;
    }
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect('/listings');
}));


// Edit route
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render("listings/edit.ejs", { listing: listing });
  }));


// Delete route
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    res.redirect('/listings');
  }));
  


// Update route
app.put('/listings/:id',validateListing , wrapAsync(async (req, res) => { 
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
app.get('/listings/:id', wrapAsync(async (req, res) => {

    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render("listings/show.ejs", { listing: listing });
   
}));


// app.get('/testListing', async (req, res) => {
//   let sampleListing = new Listing({
//     title: 'My new House',
//     description: 'A beautiful house in the countryside',
//     price: 250000,
//     location: 'Countryside',
//     country : 'USA',
//   });

//   await sampleListing.save();
//   res.send('Listing created successfully!');
// });


app.all(/.*/, (req, res , next) => {
  next(new ExpressError(404, "Page Not Found"));
});


// Error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render("error.ejs" , { statusCode, message });
  // res.status(statusCode).send(message);
});


app.listen(8080, () => {
  console.log('Server is running on port 8080 ');
});