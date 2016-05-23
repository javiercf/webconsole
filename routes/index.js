var express = require('express');
var router = express.Router();
var io = require('socket.io')(3001);
var exec = require('child_process').exec;
var path = require('path');

var rootPath = path.resolve('../');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web Console' });
});

router.post('/', function(req, res, next) {
  try {
    var cmd = exec(req.body.command, [rootPath]);
    cmd.stdout.on('data', function(data) {
      io.emit('test', data);
    });
  } catch(err) {
    console.log('error', err);
  }
  res.end('procesando');
});

io.on('connection', function(socket){
  socket.emit('test', 'connect');
})

module.exports = router;
