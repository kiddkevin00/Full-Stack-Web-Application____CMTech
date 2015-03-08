'use strict';

var _ = require('lodash');
var Company = require('./company.model');
var User = require('../user/user.model');
var TblUserCompanyProject = require('../tbl_user_company_project/tbl_user_company_project.model');
var validationError = function(res, err) {
  return res.json(422, err);
};
// Get list of companys
exports.index = function(req, res) {
  Company.find(function (err, companys) {
    if(err) { return handleError(res, err); }
    return res.json(200, companys);
  });
};

// Get a single company
exports.show = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if(err) { return handleError(res, err); }
    if(!company) { return res.send(404); }
    return res.json(company);
  });
};

// Creates a new company in the DB.
exports.create = function(req, res) {
 var newCompany = new Company(req.body);
 newCompany.save(function(err, company) {
   if (err) return validationError(res, err);
   res.json(company);
 });
};


exports.checkCreate = function(req, res) {
 var newCompany = new Company(req.body);
 var projectId = req.params.projectId;
 if(!projectId) return res.send("invalid projectid");
 Company.find({company_name : newCompany.company_name}).select("_id").exec(function(err, docs){
    if(err) { return handleError(res, err); };
    if(docs.length !== 0) {
      TblUserCompanyProject.find({link_project : projectId}).select("link_company").exec(function(err, items){
        console.log(docs,items)
        for(var i = 0 ; i < docs.length ; i++) {
          for(var j =0 ; j <items.length ; j++) {
            console.log(docs[i]._id , items[j].link_company)
            if(docs[i]._id.toString() === items[j].link_company.toString()) return res.json(422, 'Company name used in the company');
          }
        } 
          Company.create(newCompany, function(err, company){
          if(err) { return handleError(res, err); };
          return res.json(company);
        })
      });
    } else {
      Company.create(newCompany, function(err, company){
        if(err) { return handleError(res, err); };
        return res.json(company);
      })
    }
 });
 // TblUserCompanyProject.find
 // newCompany.save(function(err, company) {
 //   if (err) return validationError(res, err);
 //   res.json(company);
 // });
};

// Updates an existing company in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Company.findById(req.params.id, function (err, company) {
    if (err) { return handleError(res, err); }
    if(!company) { return res.send(404); }
    var updated = _.merge(company, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, company);
    });
  });
};

// Deletes a company from the DB.
exports.destroy = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if(err) { return handleError(res, err); }
    if(!company) { return res.send(404); }
    company.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}