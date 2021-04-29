# Dependencies: 
- mongoose, express, express-session, express-flash, passport, passport-local, bcrypt, ejs, nodemon, validator, multer

# Security:
- Using bcrypt.hash() with 10 rounds. NO SALT REQUIRED
- Using bcrypt.compare() to match passwords within passport config. No need for pre functions upon saving of mongoose model.

# Database Structuring:
- There are three collections.
1) Users - Stores user info (uniqueid, username, password, email)
2) Sessions - Stores cookie info
3) Posts - Stores post info (uniquepostid, creationDate, title, description, img, idOfPostOwner)

# Landing Page:
- Renders index.ejs upon get request. This is the home page.
Options to login/signup. New users will signup, get posted to the db, and get redirected to their dashboard immediately (immediate login). Existing users will login and get redirected to their dashboard. Session cookies are stored in db.

# Dashboard Page: 
- Renders dashboard.ejs upon get request. An array with all 'post' objects from Posts.find() will be passed in to be rendered in the feed.
- Place special css classes upon posts with req.user.username matching to distinguish it from others' posts.