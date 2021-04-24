const express = require("express"); // Framework - simple way of creating APIs
const app = express(); // initialize the app
const mongoose = require("mongoose"); // Data Base interaction Object Data Model
const passport = require("passport"); // Auth protocol
const session = require("express-session"); // Keeps sessions on for users
const MongoStore = require("connect-mongo")(session); //Grabs the code thats getting returned from the connect-mongo npm package
const connectDB = require("./config/database"); // Config file with private keys of our DB
const authRoutes = require("./routes/auth"); // Routes //
const homeRoutes = require("./routes/home"); // Routes //
const todoRoutes = require("./routes/todos"); // Routes //

require("dotenv").config({ path: "./config/.env" }); // Environment Variables (private)

// Passport config
require("./config/passport")(passport);

connectDB(); // DB connection

app.set("view engine", "ejs"); // Templating language, kind of PHP
app.use(express.static("public")); // Public files like css and js scripts
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parsing into json object
// Parses json objects sent from the front-end that we can access with req.body

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRoutes); // Home page route
app.use("/auth", authRoutes); // <- Triggered whenever the user ask for a personal site like the todo list, redirects to MS login site (Elephant kick gif)
app.use("/todos", todoRoutes); // Related with todos CRUD

// Listen setup
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
