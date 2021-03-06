const express = require('express')
const app = express()
const port = 3000
const {requireLogin} = require('./middleware')
const path = require('path')
const bodyParser = require('body-parser')

const server = app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// Routes
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoutes')

app.use('/login', loginRoute)
app.use('/register', registerRoute)


app.get('/', requireLogin, (req, res, next) => {

  const payload = {
    pageTitle: 'Home'
  }

  res.status(200).render('home', payload)
})