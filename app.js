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

app.get('/restaurant/:list_id', (req, res) => {
  let targetList = list.results.find(item => item.id.toString() === req.params.list_id)
  res.render('show', { list: targetList })
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