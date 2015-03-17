/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Project = require('./project.model');
var User = require('../user/user.model');

exports.register = function(socket) {
  Project.schema.post('save', function (doc) {
  	doc.populate('link_daily_report',function(err,d){
      User.populate(d.link_daily_report,{path:'link_user', select:'user_first_name user_last_name'},function(err, reports){
          d.link_daily_report = reports;
          onSave(socket, d);
      })
  	});
  });
  Project.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('project:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('project:remove', doc);
}