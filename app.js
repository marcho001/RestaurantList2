const express = require('express')
const port = 3000
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurants = require('./models/addRestaurant')

mongoose.connect('mongodb://localhost/restaurant')
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

app.get('/search', (req, res) => {
  const query = req.query.keywords.toUpperCase()
  const keywords = list.results.filter((item) => {
    return (item.name.toUpperCase().includes(query) || item.name_en.toUpperCase().includes(query))
  })
  res.render('index', { list: keywords })
})

app.listen(port, () => {
  console.log('yoyo now is working')
})