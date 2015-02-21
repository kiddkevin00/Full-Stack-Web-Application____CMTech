'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var CompanySchema = new Schema({
    company_name: String,
    company_title: String,
    company_address: String
});

module.exports = mongoose.model('Company', CompanySchema);