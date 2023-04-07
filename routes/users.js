const crypto = require('crypto');
var express = require('express');

const { addUser, checkUser, getNicknames } = require('../model/user');
var router = express.Router();
const cors = require('cors');
router.use(cors());

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

router.get('/user/:mail', (req, res) => {
  const mail = req.params.mail;
  checkUser(mail)
  .then(
    (user) => {      
      res.json(user.rows);
      console.log(mail);
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
