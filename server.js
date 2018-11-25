const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err)
    }
  })
  console.log(log);
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {

  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcome: 'Welcome!!'
  })

})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Problem with handling URL'
  })
})


app.listen(3000, () => console.log('Server is up on 3000 port'))