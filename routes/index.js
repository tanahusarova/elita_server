var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ever' });
});

module.exports = router;
