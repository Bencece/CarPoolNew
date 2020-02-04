const express = require('express');
var passport = require('passport');
var session = require('express-session');
var mysql = require('mysql');
const app = express();

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

const initializePassport = require('./config')
initializePassport(
  passport,
  email = email =>{
    var sql = "SELECT * FROM users WHERE email = '"+email+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  },
  id = id =>{
    var sql = "SELECT * FROM users WHERE id = '"+id+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  } 
)

app.use(express());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {
  res.redirect("/home");
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.redirect('/login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/registraton', checkNotAuthenticated, (req, res) => {
  res.redirect('/registration')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  console.log("anyád")
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    var sql = "INSERT INTO users (name, password, email) VALUES ('"+req.body.name+"','"+hashedPassword+"','"+req.body.email+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(req.body.name+" sikeresen regisztrált");
    });
    res.redirect('/login')
  } catch {
    res.redirect('/registration')
  }
})

app.post('/logout', (req, res) => {
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
  console.log("humor1")
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
 
app.listen(3000);