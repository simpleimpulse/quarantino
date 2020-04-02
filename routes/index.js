var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/quarantino')
});
router.get('/quarantino', function(req, res, next) {
  res.render('index', { title: '#Quarantino' });
});
module.exports = router;
