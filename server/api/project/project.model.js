'use strict';

var mongoose = require('mongoose'), Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    project_number: String,
    project_name: String,
    project_address: String,
    project_type: String,
    project_scope: String,
    project_plan_start: Date,
    project_plan_complete: Date,
    project_plan_duration: Number,
    project_origin_budget: Number,
    project_current_cost: Number,
    project_image_url: String,
    link_home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    link_daily_report: {
        type: Schema.Types.ObjectId,
        ref: 'DailyReport'
    },
    link_change_order: {
        type: Schema.Types.ObjectId,
        ref: 'ChangeOrder'
    },
    link_rfi: {
        type: Schema.Types.ObjectId,
        ref: 'Rfi'
    },
    link_submittal: {
        type: Schema.Types.ObjectId,
        ref: 'Submittal'
    },
    link_punchlist: {
        type: Schema.Types.ObjectId,
        ref: 'Punchlist'
    },
    link_schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);