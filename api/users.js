const crypto = require('crypto');
var express = require('express');
const { addUser, checkUser } = require('./model/user');
var router = express.Router();

router.post('/user', (req, res) => {
    addUser(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.get('/user', (req, res) => {
    checkUser(req.body)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
  })