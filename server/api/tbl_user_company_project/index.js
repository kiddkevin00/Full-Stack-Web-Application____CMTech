'use strict';

var express = require('express');
var controller = require('./tbl_user_company_project.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/project/:id', controller.showByProject);
router.get('/company:id', controller.showByCompany);
router.get('/user/:id', controller.showByUser);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;