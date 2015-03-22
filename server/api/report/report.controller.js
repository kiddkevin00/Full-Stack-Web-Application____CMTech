'use strict';

// var _ = require('lodash');
var Report = require('./report.model');
var uploadcare = require('uploadcare')('83f63cc660fb816745c1', '929f67d263933ef93470');
// var moment = require('moment');
var Project = require('../project/project.model');
var _ =require('lodash');
// Get list of reports
var async = require('async');
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

// exports.showByProject = function(req,res){
//   Report.find({link_project : req.params.id}, function(err, reports){
//     if(err) { return handleError(res, err); }
//     if(!reports) { return res.send(404); }

//     _.groupBy(reports,function(n) {
//       n.day = moment(n.report_create_date).format('dddd');
//       n.date = moment(n.report_create_date).format('MMMM d, YYYY');
//       return moment(n.report_create_date).format('MMMM YYYY');
//     });
//     return res.json(reports);
//   });
// };

// Creates a new report in the DB.
exports.create = function(req, res) {
  console.log(req.body.concrete_photo_uuid,req.body.steel_photo_uuid)
  async.parallel([
       function(callback){
          if(!req.body.concrete_photo_uuid) return callback(null);
          console.log(!req.body.concrete_photo_uuid)
          uploadcare.files.store(req.body.concrete_photo_uuid, function(err,res){
            console.log(err,res)
            if(err) {
              console.log("uploadcare error");
              return  callback(err);
            }
            req.body.report.report_concrete.concrete_photo_url = res.original_file_url;
            callback(null);
          });
       },
       function(callback){
          if(!req.body.steel_photo_uuid) return callback(null);
          console.log(!req.body.steel_photo_uuid)
          uploadcare.files.store(req.body.steel_photo_uuid, function(err,res){
            if(err) {
              console.log("uploadcare error");
              return  callback(err);
            }
            req.body.report.report_steel.steel_photo_url = res.original_file_url;
            callback(null);
          });
       }
    
    ],function(err, results){
      if(err) { return handleError(res, err); }
      console.log(req.body.report)
      Report.create(req.body.report, function(err, report) {
        if(err) { return handleError(res, err); }
        Project.findById(req.body.report.link_project, function(err, project){
          if(err) { return handleError(res, err); }
          project.link_daily_report.push(report._id);
          project.save(function(err){
            if(err) { return handleError(res, err); }
            return res.json(201, report);
          });
        })
      });
  })

};

// Updates an existing report in the DB.
exports.update = function(req, res) {
  async.parallel([
       function(callback){
         if(!req.body.concrete_photo_uuid) {
              return callback(null);
         }
          uploadcare.files.store(req.body.concrete_photo_uuid, function(err,res){
            console.log(err,res)
            if(err) {
              console.log("uploadcare error");
              return  callback(err);
            }
            req.body.report.report_concrete.concrete_photo_url = res.original_file_url;
            callback(null);
          });
       },
       function(callback){
        if(!req.body.steel_photo_uuid) {
          return callback(null);
        }
          uploadcare.files.store(req.body.steel_photo_uuid, function(err,res){
            if(err) {
              console.log("uploadcare error");
              return  callback(err);
            }
            req.body.report.report_steel.steel_photo_url = res.original_file_url;
            callback(null);
          });
       }
    
    ],function(err, results){
      if(err) { return handleError(res, err); }
      if(req.body._id) { delete req.body._id; }
      Report.findById(req.params.id, function (err, report) {
        if (err) { return handleError(res, err); }
        if(!report) { return res.send(404); }
        var updated = _.merge(report, req.body.report);
        if(!req.body.concrete_photo_uuid)  updated.report_concrete.concrete_photo_url = ""
        if(!req.body.steel_photo_uuid)  updated.report_steel.steel_photo_url = ""
        console.log("++" , updated)
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, report);
        });
      });
  })
  
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