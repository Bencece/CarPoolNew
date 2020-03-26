const express = require('express');
var passport = require('passport');
var session = require('express-session');
var mysql = require('mysql');
const app = express();
var cors = require('cors');
var bcrypt = require('bcrypt');

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

app.use(express());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

/*Regisztráció*/
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var sql = "INSERT INTO users (name, password, email) VALUES ('"+req.body.name+"','"+hashedPassword+"','"+req.body.email+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(req.body.name+" sikeresen regisztrált");
    });
    res.send({message: true});
  } catch (err) {
    res.send({message: err});
  }
});

var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    let user = new Promise(function(resolve,reject){
      var sql = "SELECT * FROM users WHERE email = '"+email+"'";
      con.query(sql, function (err, result) {
        if (err) throw reject(err);
        console.log(result[0].name);
        resolve(result[0]);
      });
    });
    user.then(user=>{
      if (!user) {
        console.log("!user");
      }
      /*if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }*/
      console.log("user: "+user.id)
      return done(null, user);
    }).catch(done(null, false, { message: 'Incorrect username.' }));
  }
));

passport.serializeUser((user, done) => done(null, user.id));
/*passport.deserializeUser((id, done) => {
  return done(null, getUserById(id));
});*/

app.post('/login',
  passport.authenticate('local', { successRedirect: '/#/home',
                                   failureRedirect: '/#/login' }));

/*const initializePassport = require('./config')
initializePassport(
  passport,
  email = email =>{
    var sql = "SELECT * FROM users WHERE email = '"+email+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0].name)
      return result[0].name;
    });
  },
  id = id =>{
    var sql = "SELECT * FROM users WHERE id = '"+id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result[0].id;
    });
  } 
)*/


/*app.get('/', checkAuthenticated, (req, res) => {
  res.redirect("/home");
})*/

/*app.get('/login', checkNotAuthenticated, (req, res) => {
  res.redirect('/login')
})*/

/*app.post('/login', passport.authenticate('local'), function(req, res){
  res.send({message:true});
})*/

/*app.get('/registraton', checkNotAuthenticated, (req, res) => {
  res.redirect('/registration')
})*/

/*app.post('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Not auth')
    return res.redirect('/')
  }
  next()
}*/
 
app.listen(3000);