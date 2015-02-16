'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var SubmittalSchema = new Schema({
    link_project: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    submittal_name: String,
    submittal_info: String,
    submittal_title: String,
    submittal_spec_section: String,
    submittal_number: Number,
    submittal_revision: Number,
    submittal_type: String,
    submittal_issue_date: Date,
    submittal_due_date: Date,
    submittal_response_date: Date,
    submittal_tag: String,
    submittal_issued_by: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    submittal_approver: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    submittal_distributions: [
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    submittal_description: String,
    submittal_attachments: [String]
});

module.exports = mongoose.model('Submittal', SubmittalSchema);