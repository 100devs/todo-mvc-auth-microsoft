const express = require('express')  // Express is a framework
const app = express()   // creating express app
const mongoose = require('mongoose') //imports mongoose (ODM Framework)
const passport = require('passport') // auth middleware
const session = require('express-session') // Keeps users session logged in and creates the cookie
const MongoStore = require('connect-mongo')(session) //saving session data in the db
const flash = require('express-flash');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const UserPost = require('./models/UserPost');
const {ensureAuth, ensureGuest} = require('./middleware/auth');
const connectDB = require('./config/database') //connects us to the db
const loginRoutes = require('./routes/login') //import auth routes from local modules
const signupRoutes = require('./routes/signup')
const homeRoutes = require('./routes/home') //import auth routes from local modules
// TODO //dont comment anything out here, just testing stuff
//TESTING post controller
const postsRoutes = require('./routes/post') //import auth routes from local module
require('dotenv').config({ path: './config/.env' }) // enviornment variables

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash());
app.use(cors());

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

//cloudinary middleware
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Multer middleware
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});


//setting up the routes
app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)

//TESTING post controller
app.use('/post', postsRoutes);

app.post('/dashboard', upload.single("photo"), async (req, res) => {
    try{
      console.log(req.file.path);
        // await UserPost.create({imgName: req.file.filename, caption: req.body.caption, username: req.user.username})
        // console.log('Post has been added!')
        // res.redirect('/dashboard')
      const result = await cloudinary.uploader.upload(req.file.path);
      await UserPost.create({
        img: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        username: req.user.username,
      });
      console.log("Post has been added!");
      res.redirect("/dashboard");
    }catch(err){
        console.error(err)
    }
})


app.listen(process.env.PORT, (err) => { //setting up the port
  if (err) {
    console.error(err);
  }
  console.log(`Server running at ${process.env.PORT}`);
})
