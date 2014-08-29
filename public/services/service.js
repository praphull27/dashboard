angular.module('MyApp')
.factory('getArchive', ['$resource', function($resource) {
	return $resource('/api/getArchive');
}])

.factory('getLatestDate', ['$resource', function($resource) {
	return $resource('/api/getLatestDate');
}])

.factory('getLatestModules', ['$resource', function($resource) {
	return $resource('/api/getLatestModules');
}])

.factory('getModuleById', ['$resource', function($resource) {
	return $resource('/api/getModuleById/:id');
}])

.factory('getModulesByDate', ['$resource', function($resource) {
	return $resource('/api/getModulesByDate/:date');
}])

.factory('getTestByModule', ['$resource', function($resource) {
	return $resource('/api/getTestByModule/:id');
}])

.factory('getTestByModuleAndStatus', ['$resource', function($resource) {
	return $resource('/api/getTestByModuleAndStatus/:id/:status');
}])

.factory('getYesterdayDate', ['$resource', function($resource) {
	return $resource('/api/getYesterdayDate');
}])

.factory('getYesterdayModules', ['$resource', function($resource) {
	return $resource('/api/getYesterdayModules');
}]);