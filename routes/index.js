var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// api provides api functions
router.use('/api', require('./api'));

module.exports = router;
