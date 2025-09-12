const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const data = require('./data.js');
const sampleListing = data.data;


main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/wanderlust') ;
}


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListing);
    console.log('Database initialized with sample listings');
}

initDB();