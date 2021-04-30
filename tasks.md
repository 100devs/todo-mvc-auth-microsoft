## Binary Upload Boom

## Things to do/help (updated April 29th):
- CSS for: all ejs files
- EJS files: profile.ejs, singlePost.ejs (with lots of event listeners)
- Routes (and controllers) for /addComment (put request coming from client-side js, and redirect), /profile (get request, res.render)
- Client-Side JS (main.js linked to dashboard.ejs):
  - event listener for 'Post Comment' button should send a PUT request, and push the new comment to the comments array
  - event listener for clicking 'Like' should send a PUT request to increase the total likes by one
  - event listener for deleting userPost (comments are forever)
- Update routes to handle the each request sent from client-side js

## ejs files
- index.ejs (done -- paths: '/auth/login', '/signup', '/profile')
- login.ejs (Deiticus)
- signup.ejs (Deiticus)
- feed.ejs ()
- posts.ejs ()
- dashboard.ejs (dvkr)

## database (mongodb - brownfox)
- got it up and running (for all ips)

## azure auth connectivity (brownfox)
- need to make client id and secret
- pass in client id and secret and modify to fit template
- change links up a bit (on requirement)
- handle auth route (middleware, controllers, etc)

## routes(shadi)


## controllers
- posts and feeds (doncellanerdy)
- home
- 

PASS IN USER ID WHEN MAKING POST AND DO FINDONE WITH REQ.USER.id I THINK

