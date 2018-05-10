const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Schema = mongoose.Schema;

var MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://admin:admin@ds115740.mlab.com:15740/wisebatt';

const secret = 'W1sebAt7Test';

const TaskSchema = new Schema({
  name: String,
  description: String
})

const UserSchema = new Schema({
  email: String,
  password: String
})

mongoose.connect(url);
const taskModel = mongoose.model('task',TaskSchema);
const userModel = mongoose.model('user',UserSchema);

app.get('/',(req,res) => res.send('Hello'));

app.get('/task',(req,res) => {
  taskModel.find((err,tasks) => res.send(tasks))
})

app.post('/login',(req,res) => {
  userModel.findOne({email: req.body.email}).exec().then((user) =>{
    console.log(user);
    if (user.password === req.body.password) {
      const token = jwt.sign(user.email, secret);
      res.status(200).send({
        jwt: token
      });
    } else {
      res.status(403).send({
        error: 'Wrong password or not register'
      });
    }
  });
});

app.post('/sign',(req,res) => {
  userModel.create({email: req.body.email,password: req.body.password});
  const token = jwt.sign(req.body.email, secret);
  res.status(200).send({
    jwt: token
  });
})

app.post('/task',(req,res) => {
  const token = req.headers['authorization'];
  jwt.verify(token, secret, (err,decoded) => {
  const user = userModel.findOne({email: decoded.email}).cast;
    if(err) {
        res.status(403);
    } else if (user) {
      taskModel.create({name:req.body.name,description:req.body.description});
      res.status(202)
        .send(req.body.name + " created");
    }
  });
})

app.listen(8080, ()=>console.log('App listening on port 8080!'))
