const crypto = require('crypto');
var express = require('express');
const { addUser, checkUser, getNicknames } = require('./model/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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

router.get('/nicknames', (req, res) => {
  getNicknames(req.body)
  .then(response => {
    res.json(response.rows);
  })
  .catch(err => {
    console.log(err);
    res.status(500);
  })
})

module.exports = router;
