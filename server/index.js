const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pdf_table_extractor = require("pdf-table-extractor"); //<-- FF
const allSchemas = require('../database-mongo/dbPull.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const configAuth = require('./configAuth.js');
const multer = require('multer');
const upload = multer({ dest: './client/droppedFiles'});

var User = allSchemas.user;
var Items = allSchemas.items;
// const post = require('../database-mongo/index.js');
const app = express();

////////////GOOGLE STRATEGY///////////////////
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    console.log('email', profile.emails[0].value);
    
    User.find({'googleID': profile.id}, function(err, data) {
      if (err) {
        return done(err);
      }
      //if no data create new user with values from Google
      if (data.length === 0) {
        user = new User({
          googleID: profile.id, 
          name: profile.displayName, 
          email: profile.emails[0].value
        });
        user.save(function(err, user) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        //found user. Return
        return done(err, data);
      }
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', 
  { session: false, scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', {failureRedirect: '/'}), function(req, res) {
    res.redirect('/profile')
  });

app.get('/profile', function (req, res) {
  console.log('we got to the profile page');
  res.send('AUTHENTICATION OK!');
});
////////////END OF GOOGLE STRATEGY////////////



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

// :kw takes in /items/<any keyword> and passes the kw to req.params.kw below. 
app.get('/items/:kw', function (req, res) {  
  var arr = [];
  var filterObj = [];
  var filterArr = [];
  // Goal here is to create a full search on all columns in the table
    Items.findOne( function(err, val) {
    val = JSON.parse(JSON.stringify(val));
    Object.keys(val).map( (key, index) =>  { arr.push(key) })
    // val is an Array
    // Loop is used to build an object with regex values.
    for (var i = 0; i < arr.length-1; i++){
      var key = arr[i];
      filterObj[arr[i]]={"$regex": req.params.kw, "$options":"i"}
    }
    // loop here is used to place data into the $or find method.
    for (var key in filterObj) {
      var smallObj = {};
      smallObj[key] = filterObj[key]
      smallObj = JSON.parse(JSON.stringify(smallObj))
      filterArr.push( smallObj )
    }
    // removing database added columns _id and __v from search
    filterArr = filterArr.slice(1,filterArr.length)
    var bigObj = {};
    bigObj.$or = filterArr
    console.log('DOES IS REACH?', bigObj)
    // bigObj is the main algorithm used to find data in the table    
    Items.find( bigObj ).limit(100).exec( function (err, data) {
      if (err) {
        console.log( 'server get request failure', err)
      } else {
        console.log('server get request Success!')
      }
      res.end(JSON.stringify(data));
    })  
  })
});

app.post('/data', function(req, res) {
	// take req.body.filter to pull data from our database
  // cloudinary.api.resources(function(result){console.log('RESULT',result)})
	console.log('Fake Post Data')
  res.send('yoiasf')
})


app.get('/allItems', function (req, res) {
  // console.log(req.params.kw)
  // Items.find({"Course Location ": "San Jose " }).limit(30).exec( function (err, data) {
  Items.find({}).limit(100).exec( function (err, data) {
    if (err) {
      console.log( 'server get request failure', err)
    } else {
      console.log('Success!')
    }
    res.end(JSON.stringify(data));
  })
});

app.post('/upload', upload.single('photo'), function(req, res, next) {
  res.end(req.file);
});

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Example app listening on ${port}`);
});





