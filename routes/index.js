var express = require('express');
var router = express.Router();
var service = require('../services/service')();

/* GET home page. */
router.get('/', function(req, res, next) {
	var response = service.serveHomePage();
  res.render('index', {response: response});
});

router.get('/useraction/:userAction', function(req, res, next) {
	var response = service.getImpactForUserAction(req.params.userAction);
	res.json(response);
});

router.get('/useraction/:userAction/:application', function(req, res, next) {
	var response = service.getComponents(req.params.userAction, req.params.application);
	res.json(response);
});

router.get('/useractions/errorcode/:errorCode', function(req, res, next) {
	var response = service.getUserActionsForErrorCode(req.params.errorCode);
	res.json(response);
});

module.exports = router;
