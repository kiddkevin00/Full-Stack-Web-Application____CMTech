
'use strict';

var user = require('./user.model');

exports.register = function(socket) {
  user.schema.post('save', function (doc) {
      doc.populate({path: 'link_projects'}, function (err, user) {
          onSave(socket, user);
      });
  });
  user.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('user:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('user:remove', doc);
}