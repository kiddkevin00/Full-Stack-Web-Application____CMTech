'use strict';

var _ = require('lodash');
var Submittal = require('./submittal.model');

// Get list of submittals
exports.index = function(req, res) {
  Submittal.find(function (err, submittals) {
    if(err) { return handleError(res, err); }
    return res.json(200, submittals);
  });
};

// Get a single submittal
exports.show = function(req, res) {
  Submittal.findById(req.params.id, function (err, submittal) {
    if(err) { return handleError(res, err); }
    if(!submittal) { return res.send(404); }
    return res.json(submittal);
  });
};

// Creates a new submittal in the DB.
exports.create = function(req, res) {
  Submittal.create(req.body, function(err, submittal) {
    if(err) { return handleError(res, err); }
    return res.json(201, submittal);
  });
};

// Updates an existing submittal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Submittal.findById(req.params.id, function (err, submittal) {
    if (err) { return handleError(res, err); }
    if(!submittal) { return res.send(404); }
    var updated = _.merge(submittal, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, submittal);
    });
  });
};

// Deletes a submittal from the DB.
exports.destroy = function(req, res) {
  Submittal.findById(req.params.id, function (err, submittal) {
    if(err) { return handleError(res, err); }
    if(!submittal) { return res.send(404); }
    submittal.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}