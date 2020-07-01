var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
  req.session.username = req.body.username;
  req.session.channel = req.body.channelName
  channel = req.body.channelName;
  res.redirect('/channel/'+channel);
});

module.exports = router;
