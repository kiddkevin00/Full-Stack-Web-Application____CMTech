'use strict';

var _ = require('lodash');
var Report = require('./report.model');

// Get list of reports
exports.index = function(req, res) {
  Report.find(function (err, reports) {
    if(err) { return handleError(res, err); }
    return res.json(200, reports);
  });
};

// Get a single report
exports.show = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    return res.json(report);
  });
};

// Creates a new report in the DB.
exports.create = function(req, res) {
  Report.create(req.body, function(err, report) {
    if(err) { return handleError(res, err); }
    return res.json(201, report);
  });
};

// Updates an existing report in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Report.findById(req.params.id, function (err, report) {
    if (err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    var updated = _.merge(report, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, report);
    });
  });
};

// Deletes a report from the DB.
exports.destroy = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.send(404); }
    report.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}