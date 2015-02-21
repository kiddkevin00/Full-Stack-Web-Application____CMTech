'use strict';

var _ = require('lodash');
var TblUserCompanyProject = require('./tbl_user_company_project.model');

// Get list of tbl_user_company_projects
exports.index = function(req, res) {
  TblUserCompanyProject.find(function (err, tbl_user_company_projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, tbl_user_company_projects);
  });
};

// Get a single tbl_user_company_project
exports.show = function(req, res) {
  TblUserCompanyProject.findById(req.params.id, function (err, tbl_user_company_project) {
    if(err) { return handleError(res, err); }
    if(!tbl_user_company_project) { return res.send(404); }
    return res.json(tbl_user_company_project);
  });
};

// Creates a new tbl_user_company_project in the DB.
exports.create = function(req, res) {
  TblUserCompanyProject.create(req.body, function(err, tbl_user_company_project) {
    if(err) { return handleError(res, err); }
    return res.json(201, tbl_user_company_project);
  });
};

// Updates an existing tbl_user_company_project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TblUserCompanyProject.findById(req.params.id, function (err, tbl_user_company_project) {
    if (err) { return handleError(res, err); }
    if(!tbl_user_company_project) { return res.send(404); }
    var updated = _.merge(tbl_user_company_project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tbl_user_company_project);
    });
  });
};

// Deletes a tbl_user_company_project from the DB.
exports.destroy = function(req, res) {
  TblUserCompanyProject.findById(req.params.id, function (err, tbl_user_company_project) {
    if(err) { return handleError(res, err); }
    if(!tbl_user_company_project) { return res.send(404); }
    tbl_user_company_project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}