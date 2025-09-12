const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    set: function(value) {
      return value.trim() === "" ? "https://unsplash.com/photos/a-view-of-the-golden-gate-bridge-at-sunset-XsesAdW7cps" : value;
    }
  },
  price: Number,
  location : String,
  country : String

});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;