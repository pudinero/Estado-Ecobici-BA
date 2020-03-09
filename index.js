const express = require('express')
const cors = require('cors')
const i18n = require('i18n')
var getJSON = require('get-json')
const app = express()
const port = 3000

app.use(express.static('public'));

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

app.use(i18n.init)
app.set('view engine', 'pug')

i18n.configure({
    locales:['en', 'es'],
    directory: __dirname + '/locales'
});

app.get('/', function(req, res){
    res.render('index', {locale: req.locale})
})

app.listen(port, () => console.log(`App listening on port ` + port + `!`))