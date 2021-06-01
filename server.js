const { static } = require('express')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

// assets
app.use(express.static('public'))

app.use(expressEjsLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


app.get('/', (req,res) =>{
  res.render('home');
})
app.get('/cart', (req,res) =>{
  res.render('customers/cart');
})
app.get('/login', (req,res) =>{
  res.render('auth/login');
})
app.get('/register', (req,res) =>{
  res.render('auth/register');
})


app.listen(PORT , () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})