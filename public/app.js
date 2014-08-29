angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ngTable'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/latest', {
		templateUrl: 'views/latest.html',
		controller: 'LatestCtrl'
	})
	.when('/yesterday', {
		templateUrl: 'views/yesterday.html',
		controller: 'YesterdayCtrl'
	})
	.when('/archive', {
		templateUrl: 'views/archive.html',
		controller: 'ArchiveCtrl'
	})
	.when('/module/:id', {
		templateUrl: 'views/module.html',
		controller: 'ModuleCtrl'
	})
	.when('/module/:id/:status', {
		templateUrl: 'views/module.html',
		controller: 'ModuleCtrl'
	})
	.when('/date/:date', {
		templateUrl: 'views/date.html',
		controller: 'DateCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);