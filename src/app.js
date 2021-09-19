const exp = require('constants')
const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const { EEXIST } = require('constants')

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Me!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: "Must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {latitude , longitude , location} = {}) => {
    
        if(error){
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
   
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.addressm 
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Andrew',
        errorMessage:'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up in' + port + 'port')
})