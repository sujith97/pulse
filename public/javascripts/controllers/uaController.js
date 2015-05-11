(function() {
	angular.module('useraction.controller', ['useraction.service'])
	.controller('userActnCtrl', UserActnCtrl)
	.controller('compCtrl', CompCtrl);

	UserActnCtrl.$inject = ['$scope', '$stateParams', 'uaService'];
	function UserActnCtrl($scope, $stateParams, uaService) {
		var vm = this;
		vm.a = 'ss';
		$scope.userAction=$stateParams.userAction;
		uaService.getImpactForUserAction($stateParams.userAction).then(function(response) {
			vm.impact = response;
		});

		vm.getColSize = function() {
			return 'col-md-' + 12/vm.impact.length;
		}
	};

	CompCtrl.$inject = ['$scope', '$stateParams', 'uaService'];
	function CompCtrl($scope, $stateParams, uaService) {
		var vm = this;
		uaService.getComponents($scope.userAction, $stateParams.application).then(function(response) {
			vm.components = JSON.stringify(response);
		});
	}

})();