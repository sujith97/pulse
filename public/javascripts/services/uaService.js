(function() {
angular.module('useraction.service', [])
	.factory('uaService', uaService);
	
	uaService.$inject = ['$http', '$rootScope'];
	function uaService($http, $rootScope) {
		var service = {
				getImpactForUserAction: getImpactForUserAction,
				getComponents: getComponents
		};
		return service;
		
		function getImpactForUserAction(userAction) {
			return $http
							.get($rootScope.constants.serverAddress + '/useraction/' + userAction)
							.then(function(data) {
								return data.data;
							});
		};

		function getComponents(userAction, application) {
			return $http
							.get($rootScope.constants.serverAddress + '/useraction/' + userAction + '/' + application)
							.then(function(data) {
								return data.data;
							});
		}
	};
})();