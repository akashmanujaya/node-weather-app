const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forcast = require('./utils/forecast')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to the server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{ 
        title: 'About Page',
        name: 'Akash'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Akash'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, lognitude, location} = {}) =>{

        if(error){
            return res.send({
                error: 'Unable to find the location. Please try again with another search'
            })
        }

        forcast(latitude, lognitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'Unable to find the location. Please try again with another search' 
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    }) 
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search )
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Page Not Found',
        name: 'Akash Manujaya',
        errorMessage: 'Opps!!! This article has been removed or not exiting'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page Not Found',
        name: 'Akash Manujaya',
        errorMessage: 'Opps!!! Page Not Found'

    })
})

app.listen(80, () => {
    console.log('Server is on port 80 ')
})