
var Excel = require("exceljs"),
	_ = require('lodash');

var workbook = new Excel.Workbook();
workbook.xlsx.readFile('/Users/sujithrb/Desktop/Log\ Analysis/User\ Actions.xlsx').then(fileRead);

function fileRead(data) {
	var sheet = workbook.getWorksheet("Execution Paths"),
		rows = sheet.getRow(1),
		root = [],
		headerRow = true;


	sheet.eachRow(function(row, rowNumber) {
		if (headerRow) {
			headerRow = false;
		} else {
			var userActionBlock = null,
				impactInstance = null;
	    	row.eachCell(function(cell, rowNo) {
	    		if (rowNo == 1) {
	    			var userAction = cell.value,
	    				index = _.findIndex(root, function(userActionBlock) {
	    					return userActionBlock.userAction == userAction;
	    				});

	    			if (index != -1) {
	    				userActionBlock = root[index];
	    			} else {
	    				userActionBlock = {};
	    				userActionBlock.userAction = cell.value;
	    				userActionBlock.impact = [];
	    				root.push(userActionBlock);
	    			}
	    			impactInstance = {};
	    			userActionBlock.impact.push(impactInstance);
	    		} else if (rowNo == 2) {
	    			impactInstance.sequenceNumber = cell.value;
	    		} else if (rowNo == 3) {
	    			impactInstance.application = cell.value;
	    		} else if (rowNo == 4) {
	    			impactInstance.component = cell.value;
	    		} else if (rowNo == 5) {
	    			impactInstance.action = cell.value;
	    		} else if (rowNo == 6) {
	    			if (!impactInstance.errorCodes) {
	    				impactInstance.errorCodes = [];
	    			}
	    			var errorCodes = cell.value.toString().split(",");
	    			errorCodes.forEach(function(errorCode) {
	    				impactInstance.errorCodes.push(parseInt(errorCode));
	    			});
	    		}
	    	});
		}
	});
	console.log("Data\n" + JSON.stringify(root));
}