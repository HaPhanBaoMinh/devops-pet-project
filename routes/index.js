var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { pipeline: process.env.PIPELINE || 'Development' });
});

module.exports = router;
