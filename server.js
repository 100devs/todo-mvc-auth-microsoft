const express = require('express')  // Express is a framework
const app = express()   // creating express app
const mongoose = require('mongoose') //imports mongoose (ODM Framework)
const passport = require('passport') // auth middleware
const session = require('express-session') // Keeps users session logged in and creates the cookie
const MongoStore = require('connect-mongo')(session)//saving session data in the db
const flash = require('express-flash');
const path = require('path');
const multer = require('multer');
const UserPost = require('./models/UserPost');
const {ensureAuth, ensureGuest} = require('./middleware/auth');
const connectDB = require('./config/database')//connects us to the db
const loginRoutes = require('./routes/login') //import auth routes from local modules
const signupRoutes = require('./routes/signup')
const homeRoutes = require('./routes/home') //import auth routes from local modules
// TODO //dont comment anything out here, just testing stuff
const todoRoutes = require('./routes/todos') //import auth routes from local modules
//TESTING post controller
//const postsRoutes = require('./routes/post') //import auth routes from local module
require('dotenv').config({ path: './config/.env' }) // enviornment variables

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash());

// Sessions
app.use(
  session({
    secret: 'keyboard cat', //this can be anything you want
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    //forget about session storage now
  })
)

// Passport middleware
app.use(passport.initialize()) //setting up passport
app.use(passport.session())

//Multer middleware
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}
  }).single('photo');
  

//setting up the routes
app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
// TODO //just testing with the todos route for right now, will change later
app.use('/todos', todoRoutes);

//TESTING post controller
//app.use('/post', postsRoutes);

// this is a test, set up mvc later
app.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user);
  res.render('dashboard', {
    // replace the values with stuff from the database
    photos: [
      {
        user: "dvkr",
        likes: 4,
        img: "https://picsum.photos/400",
        comments: [
          {
            user: "hater73683",
            message: "I am greatly displeased with this picture !!1!11!1"
          },
          {
            user: "friend",
            message: "YAS"
          }
        ]
      },
      {
        user: "someone else",
        likes: 0,
        img: "https://picsum.photos/200",
        comments: [
          {
            user: "random person",
            message: ""
          }
        ]
      }
    ]
  })
})

app.post('/dashboard', upload, async (req, res) => {
    try{
        await UserPost.create({text: req.body.desc, imgName: req.file.filename})
        console.log('Post has been added!')
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
    }
})


app.listen(process.env.PORT, (err) => { //setting up the port
  if (err) {
    console.error(err);
  }
  console.log(`Server running at ${process.env.PORT}`);
})
