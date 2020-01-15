const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

app.post('/register', function (req, res) {
  res.send('Hello '+req+'!')
})
 
app.listen(3000);