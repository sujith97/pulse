var _ = require('lodash'),
	data = 
	[
		{
			"userAction": "import",
			"impact": [
				{
					"sequenceNumber": 1,
					"application": "UI",
					"component": "FSV",
					"action": "Initiate Import",
					"errorCodes": [118]
				}
			]
		},
		{
			"userAction": "export",
			"impact": [
				{
					"sequenceNumber": 1,
					"application": "UI",
					"component": "FSV",
					"action": "Initiate Import",
					"errorCodes": [118]
				}
			]
		}
	];

var key = _.findIndex(data, function(content) {
		return content.userAction == 'import';
	});

if (key != -1) {
	console.log('Resp ' + data[key].userAction);
}