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
	.controller('MainCtrl', ['$location', function($location) {
		var vm = this;
		vm.isActive = function(param) {
			return $location.path().indexOf(param) > -1;
		};
	}]);
})();