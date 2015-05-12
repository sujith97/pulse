(function() {
	angular.module('pulse', ['ui.router', 'useraction.controller'])
	.config(function($stateProvider, $urlRouterProvider) {
	  
	  $stateProvider
	    .state('useraction', {
	      url: '/userAction/:userAction',
	      templateUrl: '/javascripts/partials/user-action.html',
	      controller: 'userActnCtrl',
	      controllerAs: 'uaCtrl'
	    })
	    .state('useraction.application', {
	      url: '/:application',
	      templateUrl: '/javascripts/partials/application-path.html',
	      controller: 'compCtrl',
	      controllerAs: 'compCtrl'
	    });
	    $urlRouterProvider.otherwise('/');
	})
	.run(function($rootScope) {
		$rootScope.constants = {
			serverAddress : 'http://localhost:3000'
		}
	})
	.controller('MainCtrl', ['$location', '$scope', '$rootScope', '$http', function($location, $scope, $rootScope, $http) {
		var vm = this;
		vm.isActive = function(param) {
			return $location.path().indexOf(param) > -1;
		};

		$scope.$on('menuItemChanged', function() {
			if ($scope.errorCode && $scope.errorCode !== 'Error Code') {
				$scope.$broadcast('errorCodeSelected', $scope.errorCode);
			}
		});

		$scope.show = function(name) {
			if ($scope.erroCodeUserActions && $scope.erroCodeUserActions.indexOf(name) != -1) {
				return true;
			} else {
				return false;
			}
		};

		$scope.$watch('errorCode', function(newVal, oldVal) {
			$scope.$broadcast('errorCodeSelected', newVal);
			if (newVal != 'undefined') {
				$http.get($rootScope.constants.serverAddress + '/useractions/errorcode/' + newVal).then(function(data) {
					$scope.erroCodeUserActions = data.data;
				});
			}
		});
	}]);
})();