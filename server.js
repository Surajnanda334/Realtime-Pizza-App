const { static } = require('express')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

// assets
app.use(express.static('public'))

app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.use('/', (req,res) =>{
  res.render('home');
})

app.listen(PORT , () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})