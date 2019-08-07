const path = require('path')
const express = require('express'),
 request = require('request'),
app = express(),
publicDirectoryPath = path.join(__dirname, '/public');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const hbs = require('hbs');
const partialsPath = path.join(__dirname, '/templates/partials');
const viewPath = path.join(__dirname, '/templates/views');



app.use(express.static("public"));
app.set('view engine' , 'hbs')
app.set('views' , viewPath);
hbs.registerPartials(partialsPath);

app.get('/', (req,res) => {
    res.render('index' , { 
        title: 'Welcome to the Weather app',
        name:'eduardo'
    })
})


app.get('/contact' , (req , res ) => {
    res.render('contact' , {
        title: 'Welcome to the Contact page'
    })
    
})

app.get('/help' , (req , res ) => {
    res.render('help' , {
        title: 'Welcome to the Help page'
    })
    
})

app.get('/about' , (req , res) => {
    res.render('about', {
        title : 'about  page',
        name: 'eduardo'
    })
})
app.get('/help/*' , (req , res) => {
    res.render('error', {
        error: "sorry this help url cant be displayed at the moment"
    })
})

app.get('/weather' , (req , res ) => {
   
    if (!req.query.address) {
        return res.send({
            error : 'you must provide an adress'
        })
    } 
    geocode(req.query.address, (error , {latitude , longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude,longitude,(error ,forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location : location ,
                address: req.query.address
            })
        })
    })
})

app.get('*' , (req , res) => {
    res.render('error', {
       error: "sorry this page do not exist try another one"
    })
})

app.listen(3000, () => {
    console.log("server up and running")
})