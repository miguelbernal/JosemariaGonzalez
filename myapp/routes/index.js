var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Express' });
});

module.exports = router;
