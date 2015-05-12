
var _ = require('lodash'),
	Q = require('q'),
	service = serviceProvider,
	external = 'External';
module.exports = service;
function serviceProvider() {
	var response = {
		serveHomePage: serveHomePage,
		getImpactForUserAction: getImpactForUserAction,
		getComponents: getComponents,
		getUserActionsForErrorCode: getUserActionsForErrorCode
	}
	return response;

	function getUserActionsForErrorCode(errorCodeReq) {
		var data = queryData(),
			userActions = [];
		_.forEach(data, function(userAction) {
			var impacts = userAction.impact;
			_.forEach(impacts, function(impact) {
				_.forEach(impact.errorCodes, function(errorCode) {
					if (parseInt(errorCode) == parseInt(errorCodeReq)) {
						if (userActions.indexOf(userAction.userAction) == -1) {
							userActions.push(userAction.userAction);
						}
					}
				});
			});
		});
		return userActions;
	};

	function serveHomePage() {
		var data = queryData(),
			userActions = [],
			applications = [],
			response = {};
		response.userActions = userActions;
		response.errorCodes = [];
		_.forEach(data,function(userAction) {
			var impacts = userAction.impact;
			_.forEach(impacts, function(impact) {
				_.forEach(impact.errorCodes, function(errorCode) {
					if (response.errorCodes.indexOf(errorCode) == -1) {
						response.errorCodes.push(errorCode);
					}
				});
				
			});
			userActions.push(userAction.userAction);
		});
		return response;
	};

	function getImpactForUserAction(userAction) {
		var data = queryData();
		var index = _.findIndex(data, function(userActionContent) {
			return userActionContent.userAction == userAction;
		});
		if (index != -1) {
			var action = data[index],
				response = [];
			_.forEach(action.impact, function(impactInstance) {
				var application = impactInstance.application;
				var impactIndex = _.findIndex(response, function(respInst) {
					return respInst.application == application;
				});
				if (impactIndex != -1) {
					var respInst = response[impactIndex],
						newComp = {};
					newComp.component = impactInstance.component;
					newComp.action = impactInstance.action;
					newComp.sequenceNo = impactInstance.sequenceNumber;
					newComp.errorCodes = impactInstance.errorCodes;
					respInst.components.push(newComp);
				} else {
					var respInst = {},
						newComp = {};
					respInst.application = impactInstance.application;
					respInst.components = [];
					newComp.component = impactInstance.component;
					newComp.action = impactInstance.action;
					newComp.sequenceNo = impactInstance.sequenceNumber;
					newComp.errorCodes = impactInstance.errorCodes;
					respInst.components.push(newComp);
					response.push(respInst);
				}
			});
		}

		var updatedResponse = [], extr;
		_.forEach(response, function(respInstance) {
			if (respInstance.application === external) {
				extr = respInstance;
			} else {
				updatedResponse.push(respInstance);
			}
		});
		updatedResponse.push(extr);
		return updatedResponse;
	};

	function getComponents(userAction, application) {
		var data = queryData();
		var index = _.findIndex(data, function(userActionContent) {
			return userActionContent.userAction == userAction;
		});
		if (index != -1) {
			var action = data[index],
				response = [];
				_.forEach(action.impact, function(impactInstance) {
					if (impactInstance.application == application) {
						var newComp = {};
						newComp.sequence = impactInstance.sequenceNumber;
						newComp.action = impactInstance.action
						newComp.component = impactInstance.component
						newComp.errorCodes = impactInstance.errorCodes;
						response.push(newComp);
					}
					
				});
		}
		console.log('Resp: ' + action);
		return response;
	}

	function queryData() {
		return [{"userAction":"Import","impact":[{"sequenceNumber":1,"application":"UI","component":"FSV","action":"Initiate Import","errorCodes":[118]},{"sequenceNumber":2,"application":"External","component":"XMLGateway","action":"Virus Scan","errorCodes":[129]},{"sequenceNumber":3,"application":"External","component":"DRS","action":"Upload File","errorCodes":[120]},{"sequenceNumber":4,"application":"UI","component":"FSV","action":"Initiate Async FSV","errorCodes":[122,127]},{"sequenceNumber":5,"application":"UI","component":"FSV","action":"Pre Parser Validations","errorCodes":[120]},{"sequenceNumber":6,"application":"UI","component":"FSV","action":"Schema Validations"},{"sequenceNumber":7,"application":"UI","component":"FSV","action":"File Validations"},{"sequenceNumber":8,"application":"UI","component":"FSV","action":"Mismo To Ldsf Conversion"},{"sequenceNumber":9,"application":"UI","component":"FSV","action":"Initiate Persistence Request"},{"sequenceNumber":10,"application":"UI","component":"FSV","action":"Generate Import Report"},{"sequenceNumber":11,"application":"UI","component":"FSV","action":"Initiate Save Import Results"},{"sequenceNumber":9.1,"application":"TS","component":"LDO","action":"Parse LDSF"},{"sequenceNumber":9.2,"application":"TS","component":"LDO","action":"Initiate Enrichment Request"},{"sequenceNumber":9.3,"application":"TS","component":"LDO","action":"Save Loans"},{"sequenceNumber":11.1,"application":"TS","component":"LDO","action":"Save Import Results"},{"sequenceNumber":11.2,"application":"TS","component":"LDO","action":"Publish Import Results"},{"sequenceNumber":"9.2.1.1","application":"EU","component":"SSN","action":"Validate Request"},{"sequenceNumber":"9.2.1.2","application":"EU","component":"SSN","action":"Invoke Service"},{"sequenceNumber":"9.2.2.1","application":"EU","component":"AMDS","action":"Validate Request"},{"sequenceNumber":"9.2.2.2","application":"EU","component":"AMDS","action":"Perform Enrichment"},{"sequenceNumber":"9.2.2.3","application":"External","component":"AMDS","action":"Execute Service"},{"sequenceNumber":"9.2.3.1","application":"EU","component":"AES","action":"Validate Request"},{"sequenceNumber":"9.2.3.2","application":"EU","component":"AES","action":"Perform Enrichment"},{"sequenceNumber":"9.2.3.3","application":"External","component":"CDDS","action":"Execute Service"},{"sequenceNumber":"9.2.4.1","application":"External","component":"DU","action":"Validate Request"},{"sequenceNumber":"9.2.4.2","application":"External","component":"DU","action":"Perform Enrichment"},{"sequenceNumber":"9.2.4.3","application":"External","component":"D2D","action":"Execute Service"},{"sequenceNumber":"9.2.5.1","application":"External","component":"DULLS","action":"Validate Request"},{"sequenceNumber":"9.2.5.2","application":"External","component":"DULLS","action":"Perform Enrichment"},{"sequenceNumber":"9.2.5.3","application":"External","component":"DULLS","action":"Execute Service"},{"sequenceNumber":"9.2.6.1","application":"EU","component":"BOB","action":"Validate Request"},{"sequenceNumber":"9.2.6.2","application":"EU","component":"BOB","action":"Invoke Service"},{"sequenceNumber":9.4,"application":"TS","component":"LDO","action":"Merge Enrichment Results"},{"sequenceNumber":9.5,"application":"TS","component":"LDO","action":"Initiate Eligibility Request"},{"sequenceNumber":9.6,"application":"TS","component":"LDO","action":"Save Enrichment Results"},{"sequenceNumber":9.7,"application":"External","component":"BRO","action":"Process Eligibility Request"},{"sequenceNumber":9.8,"application":"External","component":"CBRS","action":"Process Eligibility Request"},{"sequenceNumber":9.9,"application":"External","component":"BRO","action":"Process Eligibility Response"},{"sequenceNumber":"9.10","application":"TS","component":"LDO","action":"Process Eligibility Response"},{"sequenceNumber":9.11,"application":"TS","component":"LDO","action":"Publish LDO Event"},{"sequenceNumber":9.12,"application":"TS","component":"Loan Publisher","action":"Publish Import Event"},{"sequenceNumber":9.13,"application":"External","component":"ADS","action":"Process Import Event"}]},{"userAction":"Run Eligibility","impact":[{"sequenceNumber":"1","application":"UI","component":"Controller","action":"Validate Eligibility Request"},{"sequenceNumber":"2","application":"UI","component":"Controller","action":"Publish Eligibility Request"},{"sequenceNumber":"3","application":"TS","component":"LDO","action":"Initiate Enrichment Request","errorCodes":[111,120]},{"sequenceNumber":"4.1.1","application":"EU","component":"SSN","action":"Validate Request"},{"sequenceNumber":"4.1.2","application":"EU","component":"SSN","action":"Invoke Service"},{"sequenceNumber":"4.2.1","application":"EU","component":"AMDS","action":"Validate Request"},{"sequenceNumber":"4.2.2","application":"EU","component":"AMDS","action":"Perform Enrichment"},{"sequenceNumber":"4.2.3","application":"External","component":"AMDS","action":"Execute Service"},{"sequenceNumber":"4.3.1","application":"EU","component":"AES","action":"Validate Request"},{"sequenceNumber":"4.3.2","application":"EU","component":"AES","action":"Perform Enrichment"},{"sequenceNumber":"4.3.3","application":"External","component":"CDDS","action":"Execute Service"},{"sequenceNumber":"4.4.1","application":"EU","component":"DU","action":"Validate Request"},{"sequenceNumber":"4.4.2","application":"EU","component":"DU","action":"Perform Enrichment"},{"sequenceNumber":"4.4.3","application":"External","component":"D2D","action":"Execute Service"},{"sequenceNumber":"4.5.1","application":"EU","component":"DULLS","action":"Validate Request"},{"sequenceNumber":"4.5.2","application":"EU","component":"DULLS","action":"Perform Enrichment"},{"sequenceNumber":"4.5.3","application":"External","component":"DULLS","action":"Execute Service"},{"sequenceNumber":"4.6.1","application":"EU","component":"BOB","action":"Validate Request"},{"sequenceNumber":"4.6.2","application":"EU","component":"BOB","action":"Invoke Service"},{"sequenceNumber":"5","application":"TS","component":"LDO","action":"Merge Enrichment Results"},{"sequenceNumber":"6","application":"TS","component":"LDO","action":"Initiate Eligibility Request"},{"sequenceNumber":"7","application":"TS","component":"LDO","action":"Save Enrichment Results"},{"sequenceNumber":"8","application":"External","component":"BRO","action":"Process Eligibility Request"},{"sequenceNumber":"9","application":"External","component":"CBRS","action":"Process Eligibility Request"},{"sequenceNumber":"10","application":"External","component":"BRO","action":"Process Eligibility Response"},{"sequenceNumber":"11","application":"TS","component":"LDO","action":"Process Eligibility Response"},{"sequenceNumber":"12","application":"TS","component":"LDO","action":"Publish LDO Event"},{"sequenceNumber":"13","application":"TS","component":"Loan Publisher","action":"Publish Eligibility Event"},{"sequenceNumber":"14","application":"External","component":"ADS","action":"Process Eligibility Event"}]},{"userAction":"Submit","impact":[{"sequenceNumber":"1","application":"UI","component":"Controller","action":"Validate Submit Request"},{"sequenceNumber":"2","application":"UI","component":"Controller","action":"Publish Submit Request"},{"sequenceNumber":"3","application":"TS","component":"LDO","action":"Invoke ID Service"},{"sequenceNumber":"4","application":"External","component":"ID Service","action":"Execute Service"},{"sequenceNumber":"5","application":"TS","component":"LDO","action":"Assign Loan IDs"},{"sequenceNumber":"6","application":"TS","component":"LDO","action":"Publish LDO Event","errorCodes":[120]},{"sequenceNumber":"7","application":"TS","component":"Loan Publisher","action":"Publish Submit Event"},{"sequenceNumber":"8","application":"External","component":"ADS","action":"Process Submit Event","errorCodes":[127]},{"sequenceNumber":"9","application":"ES","component":"Mornet Adapter","action":"Generate 2K File"},{"sequenceNumber":"10","application":"ES","component":"Mornet Adapter","action":"FTP 2K File"},{"sequenceNumber":"11","application":"External","component":"MBS Pool","action":"Process 2K File"}]}];
	}
};