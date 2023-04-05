const crypto = require('crypto');
var express = require('express');
const { addUser, checkUser, getNicknames } = require('../model/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user', (req, res) => {
  addUser(req.body).then(
    (r) => res.status(200)
  ).catch(
    (e) => {
      console.log(e);
      res.status(500);
    }
  );
;
})

router.get('/user', (req, res) => {
  checkUser(req.body)
  .then(
    (user) => {      
      res.json(user.rows);
    } 
  ).catch(
    (err) => {      
      console.log(err);
      res.status(500);
    }
  );
})



router.get('/nicknames', (req, res) => {
  getNicknames(req.body).then(
    (nicknames) => {      
      res.json(nicknames.rows);
    } 
  ).catch(
    (err) => {      
      console.log(err);
      res.status(500);
    }
  );
})

module.exports = router;
