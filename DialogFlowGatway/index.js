
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3200;

const UserRoute = require('./ChatResonse');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(UserRoute);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});


