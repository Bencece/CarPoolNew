const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mysql = require('mysql');
const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use(require('morgan')('combined'));
app.use(session({ secret: 'super secret' })); //to make passport remember the user on other pages too.(Read about session store. I used express-sessions.)
app.use(passport.initialize());
app.use(passport.session());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carpool"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post('/register', function (req, res) {
  var sql = "INSERT INTO users (name, password, email) VALUES ('"+req.body.name+"','"+req.body.password+"','"+req.body.email+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(req.body.name+" sikeresen regisztrált");
    res.send('registration', { ok: true});
  });
});

passport.serializeUser(function(user, done) { //In serialize user you decide what to store in the session. Here I'm storing the user id only.
  done(null, user.id);
});

passport.deserializeUser(function(id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users WHERE id = "+id+" ", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      done(err, result[0].id);
    });
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users WHERE name = "+username+" ", function (err, result, fields) {
      if(err) return done(err,{message:message});//wrong roll_number or password; 
        var pass_retrieved = password;
        bcrypt.compare(result[0].password, pass_retrieved, function(err3, correct) {
          if(err3){
            message = [{"msg": "Incorrect Password!"}];
            return done(null,false,{message:message});  // wrong password
          }       
          if(correct){
              return done(null,user);
          } 
        });
    });
  });
}));



app.post('/login',passport.authenticate('local',{successRedirect:'/home', failureRedirect: '/registration'}),
    function(req,res,next){
});

app.get('/home',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });
 
app.listen(3000);