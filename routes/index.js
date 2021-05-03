var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UberNoEs' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'UberNoEs' });
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery', { title: '---' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: '---' });
});

router.get('/single', function(req, res, next) {
  res.render('single', { title: '---' });
});

module.exports = router;
