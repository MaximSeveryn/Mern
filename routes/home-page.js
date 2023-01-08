const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home-page', { title: 'Task Management App' });
});


router.get('/about', function(req, res) {
  res.render('about', { title: 'About' });
});


module.exports = router;
