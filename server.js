const express = require('express')  // Express is a framework
const app = express()   // creating express app
const mongoose = require('mongoose') //imports mongoose (ODM Framework)
const passport = require('passport') // auth middleware
const session = require('express-session') // Keeps users session logged in and creates the cookie
const MongoStore = require('connect-mongo')(session)//saving session data in the db
const connectDB = require('./config/database')//connects us to the db
const authRoutes = require('./routes/auth') //import auth routes from local modules
const homeRoutes = require('./routes/home') //import auth routes from local modules
const todoRoutes = require('./routes/todos') //import auth routes from local modules

require('dotenv').config({path: './config/.env'}) // enviornment variables

// Passport config
require('./config/passport')(passport) // creating and configuring auth strategy for azure

connectDB() // connect to db

app.set('view engine', 'ejs') // chooses ejs as the view engine
app.use(express.static('public')) // Sets location of where to serve static files from
app.use(express.urlencoded({ extended: true })) // parses form data from post request
app.use(express.json()) //converts data into json objects

// Sessions
app.use( //sets the middleware that handles the sessions
    session({
      secret: 'keyboard cat', //this can be anything you want
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize()) //setting up passport
app.use(passport.session())

//setting up the routes
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(process.env.PORT, ()=>{ //setting up the port
    console.log('Server is running, you better catch it!')
})
