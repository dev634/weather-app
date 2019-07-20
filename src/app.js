const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set path for handlebars and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

//Set up route 
app.get('', (req,res) =>{
   const lang = req.headers["accept-language"][0] + req.headers["accept-language"][1]
   module.exports = lang
   res.render('index',{
      title: 'Weather',
      name: 'Mathieu TOURRET'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About Me',
      name: 'Mathieu TOURRET'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help Me',
      message: 'A little help page',
      name: 'Mathieu TOURRET'
   })
})

app.get('/weather', (req, res) => {
   if (!req.query.adress) {

      return res.send({error: 'Please can you provide an adress and the city'})

   }
      geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
         if (error) {
            return res.send({error})
         }
         forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({error})
            }
            res.send({
               forecast: forecastData,
               location,
               adress: req.query.adress
            })
         })
      })
   })

app.get('/products', (req, res) => {
   if (!req.query.search){
      return res.send({
         error: 'You must provide a search term'
      })
   }
      console.log(req.query.search)
   res.send({
         products: []
      })
})

app.get('/help/*', (req,res) => {
   res.render('404',{
      title:'404',
      message: 'Help article note found',
      name: 'Mathieu TOURRET'
   })
})

app.get('*',(req, res) => {
   res.render('404',{
      title:'404',
      message: 'My 404 Page',
      name: 'Mathieu TOURRET'
   })
})

app.listen(3000, () => {
   console.log('Listening on port 3000 ...')
})

