const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const pug = require('pug')
const port = 3000
const path = require('path')
const generateRoute = require('./routes/generate') 
const apiRoutes = require('./routes/api')


//init app
const app = express()

//serve the static website on the primary domain launchfizz.com
app.use(express.static(path.join(__dirname, 'public')))

//catch errors
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
})

//enable parsing of JSON and URL encoded data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//serve the web app on the subdomain app.launchfizz.com
app.use('/app', generateRoute)

//use external apis
app.use('/api', apiRoutes)

//configure pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//server confirmation
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
    console.log('Server running on port ' + port)
})
