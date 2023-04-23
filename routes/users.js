const crypto = require('crypto');
var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { addUser, checkUser, getNicknames } = require('../model/user');
var router = express.Router();
const cors = require('cors');
router.use(cors());
const bodyParser = require('body-parser');

// Use bodyParser middleware with express.Router()
router.use(bodyParser.json());

function verifyToken(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers.authentication;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, 'your-jwt-secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', async (req, res) => {
  const { nickname, mail, password } = req.body;
  try {
    const check = await checkUser(mail);
    console.log('checkol');
    if (check.rows.length === 0) {
        console.log('som v checku');
        const add = await addUser(req.body);
        if(add){
          console.log('som v adde');
           const token = jwt.sign({ email: mail }, 'your-jwt-secret');
           res.json({ token });
        }
        else{
          res.sendStatus(401);
        }
  
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
;
})




router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("aaa")
    const result = await checkUser(email);
    console.log("aaa1234")
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (passwordMatches) {
        const token = jwt.sign({ email: user.email }, 'your-jwt-secret');
        const id = user.user_id;
        res.json({ token, id });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



router.get('/user/:mail', (req, res) => {
  const mail = req.params.mail;
  checkUser(mail)
  .then(
    (user) => {      
      res.json(user.rows);
      console.log(user.rows);
    } 
  ).catch(
    (err) => {      
      console.log(err);
      res.status(500);
    }
  );
})



router.get('/nicknames', verifyToken, (req, res) => {
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
