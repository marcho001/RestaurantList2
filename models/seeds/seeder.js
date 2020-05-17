const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const list = require('../../restaurant.json')
const restaurants = list.results
const addRestaurant = require('../addRestaurant')

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connect!')
  restaurants.forEach((item) => {
    addRestaurant.create({
      name: item.name,
      category: item.category,
      location: item.location,
      phone: item.phone,
      rating: item.rating,
      description: item.description,
      image: item.image,
      google_map: item.google_map
    })
  })

  console.log('done!!')
})
