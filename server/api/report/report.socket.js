/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Report = require('./report.model');

exports.register = function(socket) {
  Report.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Report.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('report:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('report:remove', doc);
}