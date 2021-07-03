require('dotenv/config')
const { static } = require('express');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo') 
const flash = require('express-flash')

// const bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended : true}))

//database connection
const url= process.env.MONGO_URL
mongoose.connect(url,{ 
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true,   
  useFindAndModify : true 
});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));


//session
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: url}),
  cookie: {maxAge: 1000*60*60},
  ttl:24*60*60 // = 1 day

}))

//flash
app.use(flash())

// assets
app.use(express.static('public'))

//for identifying json data from req.body 
app.use(express.json())
//For data from html forms
app.use(express.urlencoded({extended: false}))

//global middlewares
app.use((req,res,next) => {
  res.locals.session = req.session
  next()
})

app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT , () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})