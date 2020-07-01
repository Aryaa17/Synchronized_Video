const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var xss = require('xss');

app.set('view engine', 'ejs');
app.use(session({secret: "banana milk"}));

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes');
app.use('/', routes);

function onConnection(socket){
  // add to room
  socket.on('joinRoom', (data) => socket.join(data.room));
  // notify users when new members join/leave room
  socket.on('joinRoom', (data) => io.sockets.in(data.room).emit('roomEvent', data));
  // play/pause/seek change alert others in room
  socket.on('videoSet', (data) => io.sockets.in(data.room).emit('videoSet', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
