const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const events = require('./db/events.json');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carpool"
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

app.get('/dashboard', verifyToken, (req, res) => { //verifyToken is middleware
  jwt.verify(req.token, 'the_secret_key', err => { // verifies token
    if (err) { // if error, respond with 401 code
      res.sendStatus(401)
    } else { // otherwise, respond with private data
      res.json({
        events: events
      })
    }
  })
})

app.post('/register', (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
      // In a production app, you'll want to encrypt the password
    }
    console.log(user);
    con.query("SELECT * FROM users WHERE email='"+user.email+"'", function(err, userdb){
      if (err){
        console.log(err);
      } else if (userdb[0] == []){
        res.sendStatus(400); //Ha van már ilyen felhasználó
      } else {
        con.query("INSERT INTO users (username, email, password) VALUES('"+user.name+"', '"+user.email+"', '"+user.password+"')", function(err, result){
          if (err){
            console.log(err + result);
          } else {
            const token = jwt.sign({ user }, 'the_secret_key')
            // In a production app, you'll want the secret key to be an environment variable
            res.json({
              token,
              email: user.email,
              name: user.name
            })
          }
        });
      }
    });
  } else {
    res.sendStatus(400)
  }
})

app.post('/login', (req, res) => {
  if (req.body) {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    con.query("SELECT * FROM users WHERE email='"+user.email+"'", function(err, userdb){
      if (err){
        console.log(err);
        res.sendStatus(400);
      } else if (user.email === userdb[0].email && user.password === userdb[0].password){
        const userInfo = {
          email: userdb[0].email,
          name: userdb[0].username
        }
        const token = jwt.sign({ userInfo }, 'the_secret_key')
        // In a production app, you'll want the secret key to be an environment variable
        res.json({
          token,
          email: userInfo.email,
          name: userInfo.name
        })
      }
    });
  } else {
    res.sendStatus(400)
  }
})

// MIDDLEWARE
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(401)
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
