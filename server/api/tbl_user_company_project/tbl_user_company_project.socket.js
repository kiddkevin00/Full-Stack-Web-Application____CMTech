/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TblUserCompanyProject = require('./tbl_user_company_project.model');

exports.register = function(socket) {
  TblUserCompanyProject.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TblUserCompanyProject.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tbl_user_company_project:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tbl_user_company_project:remove', doc);
}