'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var TblUserCompanyProjectSchema = new Schema({
    link_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    link_company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    link_subcompany: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    link_project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('TblUserCompanyProject', TblUserCompanyProjectSchema);