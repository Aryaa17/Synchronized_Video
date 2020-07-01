'use strict';

var url = window.location.href;
var channel = url.match(/([^\/]*)\/*$/)[1];
console.log(channel);

var socket = io();
var video = document.getElementById('Video1');

video.addEventListener('play', onPlay, false);
video.addEventListener('pause', onPause, false);
video.addEventListener('seeked', onSeeked, false);

socket.emit('joinRoom', { roomEvent: "new user", user: username, room: channel });

var current = {playing: false, seeked: false, time: 0};


socket.on('videoSet', onVideoEvent);
socket.on('roomEvent', onRoomEvent);

var lastCall = 0;
var currentTime = 0;

function onPlay(e){
  // limit
  if (Date.now() - lastCall < 40) { return; }

  currentTime = video.currentTime;
  socket.emit('videoSet', { setting: "play", time: currentTime, room: channel });
  lastCall = Date.now();
}

function onPause(e){
  if (Date.now() - lastCall < 40) { return; }
  socket.emit('videoSet', { setting: "pause", room: channel });
  lastCall = Date.now();
}

function onSeeked(e){
  if (Date.now() - lastCall < 40) { return; }
  currentTime = video.currentTime;
  socket.emit('videoSet', { setting: "seek", time: currentTime, room: channel });
  lastCall = Date.now();
}

function onVideoEvent(data){
  switch (data.setting) {
    case "play":
//      if (video.currentTime - data.time > 3) { video.currentTime = data.time; }
      video.play();
      console.log("playing");
      break;
    case "pause":
      video.pause();
/*      video.setAttribute("src", "https://youtu.be/4VnMmBmiKw8");
      video.load();
*/      
      break;
    case "seek":
      video.pause();
      video.currentTime = data.time;
      console.log("seeked");
      break;
  }
}

function onRoomEvent(data){
  switch (data.roomEvent) {
    case "new user": 
      console.log(data.user + " has joined the room.");
      break;
    case "user left":
      break;
  }
}
