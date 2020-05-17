const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurants = require('./models/addRestaurant')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb connect!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extend : true }))


app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(list => res.render('index', { list }))
    .catch(error => console.log('error')) 
})

app.get('/restaurant/:id', (req, res) => {
  return Restaurants.findById(req.params.id)
    .lean()
    .then(list => res.render('show',{ list }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:id/delete', (req, res) => {
  return Restaurants.findById(req.params.id)
    .then(list => list.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id/edit', (req, res) => {
  return Restaurants.findById( req.params.id )
    .lean()
    .then(list => res.render('edit', { list }))
    .catch(error => console.log(error))
})

app.get('/create', (req, res) => {
   return res.render('create')
})
app.get('/search', (req, res) => {
  const query = req.query.keywords.toUpperCase()
  const keywords = list.results.filter((item) => {
    return (item.name.toUpperCase().includes(query) || item.name_en.toUpperCase().includes(query))
  })
  res.render('index', { list: keywords })
})

app.post('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  const {
    name, 
    category, 
    location, 
    phone, 
    rating, 
    description, 
    image, 
    google_map
  } = req.body

  return Restaurants.findById(id)
    .then(list =>{
      list.name = name
      list.location = location
      list.category = category
      list.phone = phone
      list.rating = rating
      list.description = description
      list.image = image
      list.google_map = google_map
      return list.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('yoyo now is working')
})