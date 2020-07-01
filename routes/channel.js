var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  //  res.sendFile(path.join(__dirname, '../public/', 'room.html'));
  if (req.session.username) {
    res.render('pages/channel', {username: req.session.username});
  } else {
    res.redirect('/');
  }
});

module.exports = router;
