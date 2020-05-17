const mongoose = require('mongoose')
const Schema = mongoose.Schema
const addRestaurantSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  rating: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  google_map: {
    type: String
  }

})

module.exports = mongoose.model('AddRestaurant', addRestaurantSchema)
