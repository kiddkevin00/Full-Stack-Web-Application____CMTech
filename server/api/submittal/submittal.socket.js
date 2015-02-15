/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Submittal = require('./submittal.model');

exports.register = function(socket) {
  Submittal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Submittal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('submittal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('submittal:remove', doc);
}