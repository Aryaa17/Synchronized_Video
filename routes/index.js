var express = require('express');
var join = require('../routes/join');
var channel = require('../routes/channel');
var video = require('../routes/video');
var router = express.Router();

router.get('/', function(req, res){
	res.render('pages/index');
});

router.use('/join', join);
router.use('/channel/:channel', channel);
router.use('/video', video);

module.exports = router;
