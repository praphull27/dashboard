angular.module('MyApp')
.controller('LatestCtrl', ['$scope', '$filter', 'ngTableParams', 'getLatestModules', 'getLatestDate', function($scope, $filter, ngTableParams, getLatestModules, getLatestDate) {
	var data = getLatestModules.query();
	$scope.headingTitle = getLatestDate.get();
	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		count: 50,          // count per page
		filter: {
			name: ''       // initial filter
		}
	}, {
		total: data.length, // length of data
		getData: function($defer, params) {
			var orderedData = params.filter() ?
			$filter('filter')(data, params.filter()) :
			data;
			$scope.modules = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total(orderedData.length); // set total for recalc pagination
			$defer.resolve($scope.modules);
		}
	});
}])

.controller('YesterdayCtrl', ['$scope', '$filter', 'ngTableParams', 'getYesterdayModules', 'getYesterdayDate', function($scope, $filter, ngTableParams, getYesterdayModules, getYesterdayDate) {
	var data = getYesterdayModules.query();
	$scope.headingTitle = getYesterdayDate.get();
	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		count: 50,          // count per page
		filter: {
			name: ''       // initial filter
		}
	}, {
		total: data.length, // length of data
		getData: function($defer, params) {
			var orderedData = params.filter() ?
			$filter('filter')(data, params.filter()) :
			data;
			$scope.modules = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total(orderedData.length); // set total for recalc pagination
			$defer.resolve($scope.modules);
		}
	});
}])

.controller('ModuleCtrl', ['$scope', '$routeParams', '$filter', 'ngTableParams', 'getTestByModule', 'getTestByModuleAndStatus', 'getModuleById', function($scope, $routeParams, $filter, ngTableParams, getTestByModule, getTestByModuleAndStatus, getModuleById) {
	var data;
	if ($routeParams.status != null) {
		data = getTestByModuleAndStatus.query({id: $routeParams.id, status: $routeParams.status});
	} else {
		data = getTestByModule.query({id: $routeParams.id});
	}
	$scope.headingTitle = getModuleById.get({id: $routeParams.id});
	$scope.headStatus = $routeParams.status;
	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		count: 50,          // count per page
		filter: {
			name: ''       // initial filter
		}
	}, {
		total: data.length, // length of data
		getData: function($defer, params) {
			var orderedData = params.filter() ?
			$filter('filter')(data, params.filter()) :
			data;
			$scope.tests = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total(orderedData.length); // set total for recalc pagination
			$defer.resolve($scope.tests);
		}
	});
}])

.controller('DateCtrl', ['$scope', '$routeParams', '$filter', 'ngTableParams', 'getModulesByDate', function($scope, $routeParams, $filter, ngTableParams, getModulesByDate) {
	var data = getModulesByDate.query({date: $routeParams.date});
	$scope.headingTitle = $routeParams.date;
	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		count: 50,          // count per page
		filter: {
			name: ''       // initial filter
		}
	}, {
		total: data.length, // length of data
		getData: function($defer, params) {
			var orderedData = params.filter() ?
			$filter('filter')(data, params.filter()) :
			data;
			$scope.tests = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total(orderedData.length); // set total for recalc pagination
			$defer.resolve($scope.tests);
		}
	});
}])

.controller('ArchiveCtrl', ['$scope', '$timeout', '$filter', 'ngTableParams', 'getArchive', function($scope, $timeout, $filter, ngTableParams, getArchive) {
	var data = getArchive.query();
	$scope.headingTitle = "Archive Results";
	$scope.tableParams = new ngTableParams({
		page: 1,            // show first page
		count: 50,          // count per page
		filter: {
			name: ''       // initial filter
		}
	}, {
		total: data.length, // length of data
		getData: function($defer, params) {
			var orderedData = params.filter() ?
			$filter('filter')(data, params.filter()) :
			data;
			$scope.dates = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
			$timeout(function() {
				params.total(orderedData.length); // set total for recalc pagination
				$defer.resolve($scope.dates);
			}, 0);
		}
	});
}]);
