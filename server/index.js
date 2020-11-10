const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const events = require('./db/events.json');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const saltRounds = 10;
var https = require('https')
require('dotenv').config();


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
  res.send("CarPool szerver")
})

app.get('/dashboard', verifyToken, (req, res) => { //verifyToken is middleware
  jwt.verify(req.token, process.env.SECRET_KEY, err => { // verifies token
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
    }
    con.query("SELECT * FROM users WHERE email='"+user.email+"'", function(err, userdb){
      if (err){
        console.log(err);
      } else if (userdb != ''){
        res.sendStatus(400); //Ha van már ilyen felhasználó
      } else {
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
          if (err){
            console.log(err);
          } else {
            con.query("INSERT INTO users (username, email, password) VALUES('"+user.name+"', '"+user.email+"', '"+hash+"')", function(err, result){
              if (err){
                console.log(err + result);
              } else {
                con.query("SELECT auth FROM users WHERE email='"+user.email+"'", function(err, auth){
                  if (err){
                    console.log(err);
                  } else {
                    console.log(user.name+" registered: "+ new Date());
                    const token = jwt.sign({ user }, process.env.SECRET_KEY)
                    // In a production app, you'll want the secret key to be an environment variable
                    res.json({
                      token,
                      email: user.email,
                      name: user.name,
                      auth: auth
                    })
                  }
                })
              }
            });
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
      } else if (userdb[0] != null && user.email === userdb[0].email){
        bcrypt.compare(user.password, userdb[0].password, function(err, result) {
          if (err){
            console.log(err);
            res.sendStatus(400)
          } else if (result) {
            const userInfo = {
              email: userdb[0].email,
              name: userdb[0].username,
              auth: userdb[0].auth
            }
            console.log(userInfo.name+" logined: "+ new Date());
            const token = jwt.sign({ userInfo }, process.env.SECRET_KEY)
            // In a production app, you'll want the secret key to be an environment variable
            res.json({
              token,
              email: userInfo.email,
              name: userInfo.name
              //auth: userInfo.auth
            })
          } else {
            res.sendStatus(401)
          }
        });
      } else {
        res.sendStatus(401)
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

app.get('/cars', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT car.plate, manufacturers.name, car_type.type, car_type.consumption, units.short_name, car_type.info, car_type.img FROM car, car_type, manufacturers, units WHERE car.typeID = car_type.id AND car_type.manufacturerID = manufacturers.id AND car_type.consumption_unitID = units.id ", function(err, result){
        if(err){
          console.log(err);
          res.status(400);
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.get('/getCarTypes', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT car_type.id, manufacturers.name, car_type.type FROM car_type, manufacturers WHERE car_type.manufacturerID = manufacturers.id", function(err, result){
        if(err){
          console.log(err);
          res.status(400);
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.get('/getManufacturers', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT * FROM manufacturers", function(err, result){
        if(err){
          console.log(err);
          res.status(400);
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.get('/getCars', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT * FROM car", function(err, result){
        if(err){
          console.log(err);
          res.status(400)
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.get('/getFuelTypes', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT * FROM fuel", function(err, result){
        if(err){
          console.log(err);
          res.status(400)
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.get('/getUnits', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else { 
      con.query("SELECT * FROM units", function(err, result){
        if(err){
          console.log(err);
          res.status(400)
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.post('/addCar', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else {
      const car = {
        plate: req.body.plate,
        typeID: req.body.typeID
      }
      con.query("INSERT INTO car (plate, typeID) VALUES ('"+car.plate+"', "+car.typeID+")", (err, result) =>{
        if(err){
          console.log(err);
          res.sendStatus(400);
        } else {
          res.json({
            text: car.plate+" sikeresen hozzáadva!"
          });
        }
      });
    }
  });  
});

app.post('/removeCar', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else {
      const car = {
        plate: req.body.plate
      }
      con.query("DELETE FROM car WHERE plate='"+car.plate+"'", (err, result) =>{
        if(err){
          console.log(err);
          res.sendStatus(400)
        } else {
          res.json({
            text: car.plate+" sikeresen eltávolítva!"
          });
        }
      });
    }
  });  
});

app.post('/addManufacturer', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else {
      const manufacturer = {
        name: req.body.manufacturer
      }
      con.query("INSERT INTO manufacturers (name) VALUES ('"+manufacturer.name+"')", (err, result) =>{
        if(err){
          console.log(err);
          res.sendStatus(400);
        } else {
          res.json({
            text: manufacturer.name+" gyártó sikeresen hozzáadva!"
          });
        }
      });
    }
  });  
});

app.post('/addCarType', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
          if (err){
            console.log(err);
            res.sendStatus(400);
          } else {
            const carType = {
              manufacturerID: fields.manufacturerID,
              type: fields.type,
              consumption: fields.consumption,
              consumption_unitID: fields.consumption_unitID,
              fuelID: fields.fuelID,
              info: fields.info,
              img: fields.manufacturerID+"_"+fields.type+".jpg"
            }
            var oldpath = files.file.path;
            var newpath = '../client/public/img/cars/' + carType.img;
            fs.rename(oldpath, newpath, function (err) {
              if (err){
                console.log(err);
                res.sendStatus(400);
              } else{
                console.log(carType.img+" mentve.");
                con.query("INSERT INTO car_type (manufacturerID, type, consumption, consumption_unitID, fuelID, info, img) VALUES ('"+carType.manufacturerID+"', '"+carType.type+"', '"+carType.consumption+"', '"+carType.consumption_unitID+"', '"+carType.fuelID+"', '"+carType.info+"', '"+carType.img+"')", (err, result) =>{
                  if(err){
                    console.log(err);
                    res.sendStatus(400);
                  } else {
                    res.json({
                      text: carType.type+" sikeresen hozzáadva!"
                    });
                  }
                });
              }
            });
          }
      });
    }
  });  
});

app.post('/giveUserPos', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, err => {
    if (err) {
      res.sendStatus(401)
    } else {
      console.log(req.body.id+" "+req.body.latitude+" "+req.body.longitude)
      con.query("UPDATE users SET lastLat='"+req.body.latitude+"', lastLong='"+req.body.longitude+"' WHERE users.id='"+req.body.id+"';", (err, result) =>{
        if(err){
          console.log(err);
          res.sendStatus(400);
        } else {
          //console.log(result)
          con.query("SELECT username, lastLat, lastLong FROM users WHERE NOT id='"+req.body.id+"' AND NOT id='1'", (err, result) =>{
            if(err){
              console.log(err);
              res.sendStatus(400);
            } else {
              //console.log(result)
              res.json(result);
            }
          })
        }
      });
    }
  });  
});

app.post('/getUsersPos', verifyToken, (req, res) => {
  con.query("SELECT username, lastLat, lastLong FROM users WHERE NOT id='1'", (err, result) =>{
    if(err){
      console.log(err);
      res.sendStatus(400);
    } else {
      //console.log(result)
      res.json(result);
    }
  })
})

app.post('/checkPrivilege', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.sendStatus(401)
    } else {
      if(req.body){
        console.log(decoded.userInfo.auth+ "== "+req.body.privilige)
        if(decoded.userInfo.auth == req.body.privilige){
          res.json({ privilige : true});
        } else {
          res.json({ privilige : false});
        }
      } else res.sendStatus(403);
    }
  });
});

https.createServer({
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.cert')
}, app).listen(3000, function () {
  console.log('Server listening on port 3000!')
})

