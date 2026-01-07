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
const Review = require('./models/reviews.js');
const { reviewSchema } = require('./schema.js');
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');
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




// Root route
app.get('/', (req, res) => {
  res.send("Hi , Welcome to the Express.js application!");  
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


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