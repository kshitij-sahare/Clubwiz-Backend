const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  eventId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number
  },
  images: [
    {
      src: String,
      alt: String
    }
  ],
  coupleFee: String,
  stagFee: String,
  eventTitle: String,
  eventSubtitle: String,
  specialOffer: String,
  capacity: String,
  parking: String,
  location: String,
  iframeLink: String,
});

module.exports = mongoose.model('Event', EventSchema);
