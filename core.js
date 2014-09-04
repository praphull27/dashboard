var db = require("./db");
var async = require('async');

exports.getLatestDate = function(callback) {
	return db.Module.distinct('date', function(err, res) {
		res.sort();
		res.reverse();
		if (err != null) {
			return callback(err);
		}
		return callback(null, {date: res[0]});
	});
};

exports.getYesterdayDate = function(callback) {
	return db.Module.distinct('date', function(err, res) {
		res.sort();
		res.reverse();
		if (err != null) {
			return callback(err);
		}
		return callback(null, {date: res[1]});
	});
};

exports.getAllDates = function(callback) {
	return db.Module.distinct('date', function(err, dates) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, dates);
	});
};

exports.getAllModules = function(callback) {
	return db.Module.distinct('name', function(err, modules) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, modules);
	});
};

exports.getAllTestName = function(callback) {
	return db.Test.distinct('name', function(err, tests) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, tests);
	});
};


/*
	APIs to get the details about the modules.
	*/

exports.getModuleById = function(moduleId, callback) {
	return db.Module.findOne({
		_id: moduleId
	}, function(err, module) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, module);
	});
};

exports.getModulesByName = function(name, callback) {
	return db.Module.find({
		name: name
	}, function(err, modules) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, modules);
	});
};

exports.getModulesByDate = function(date, callback) {
	return db.Module.find({
		date: date
	}, function(err, modules) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, modules);
	});
};

exports.getModuleByNameAndDate = function(name, date, callback) {
	return db.Module.find({
		name: name,
		date: date
	}, function(err, module) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, module);
	});
};

exports.getModulesByOwner = function(owner, callback) {
	return db.Module.find({
		owner: owner
	}, function(err, modules) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, modules);
	});
};


/*
APIs to get the details about Tests.
*/

exports.getTestById = function(testId, callback) {
	return db.Test.find({
		_id: testId
	}, function(err, test) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, test);
	});
};

exports.getTestsByModule = function(moduleId, callback) {
	return db.Test.find({
		module: moduleId
	}, function(err, tests) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, tests);
	});
};

exports.getTestsByModuleAndStatus = function(moduleId, status, callback) {
	return db.Test.find({
		module: moduleId,
		status: status
	}, function(err, tests) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, tests);
	});
};

exports.getTestsByName = function(name, callback) {
	return db.Test.find({
		name: name
	}, function(err, tests) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, tests);
	});
};

exports.getTestsByStatus = function(status, callback) {
	return db.Test.find({
		status: status
	}, function(err, tests) {
		if (err != null) {
			return callback(err);
		}
		return callback(null, tests);
	});
};

exports.getStatusCountByModule = function(module, callback) {
	module = module.toJSON();
	return db.Test.count({
		module: module._id,
		status: /^passed$/
	}, function(err, passed) {
		if (err != null) {
			return callback(err);
		}
		module.passed = passed;
		module.total = passed;
		return db.Test.count({
			module: module._id,
			status: /^failed$/
		}, function(err, failed) {
			if (err != null) {
				return callback(err);
			}
			module.failed = failed;
			module.total = module.total + failed;
			return db.Test.count({
				module: module._id,
				status: /^indeterminate$/
			}, function(err, indeterminate) {
				if (err != null) {
					return callback(err);
				}
				module.indeterminate = indeterminate;
				module.total = module.total + indeterminate;
				return callback(null, module);
			});
		});
	});
};

exports.getStatusCountByDate = function(date, callback) {
	var dateJSON;
	dateJSON = {};
	dateJSON.name = date;
	dateJSON.passed = 0;
	dateJSON.failed = 0;
	dateJSON.indeterminate = 0;
	dateJSON.total = 0;
	return db.Module.find({
		date: date
	}, function(err, modules) {
		if (err != null) {
			return callback(err);
		}
		async.each(modules, function(module, callback){
			exports.getStatusCountByModule(module, function(err, module) {
				if (err != null) {
					callback(err);
				} else {
					dateJSON.passed = dateJSON.passed + module.passed;
					dateJSON.failed = dateJSON.failed + module.failed;
					dateJSON.indeterminate = dateJSON.indeterminate + module.indeterminate;
					dateJSON.total = dateJSON.total + module.passed + module.failed + module.indeterminate;
					callback();
				}
			});
		}, function(err){
			if (err != null) {
				return callback(err);
			}
			return callback(null, dateJSON);
		});
	})
};