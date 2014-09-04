var db = require("./db");
var core = require("./core");
var express = require('express');
var path = require('path');
var logger = require('morgan');
var async = require('async');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/yesterday', express.static(path.join(__dirname, 'public')));
app.use('/latest', express.static(path.join(__dirname, 'public')));
app.use('/archive', express.static(path.join(__dirname, 'public')));
app.use('/date/:date', express.static(path.join(__dirname, 'public')));
app.use('/module/:id', express.static(path.join(__dirname, 'public')));
app.use('/module/:id/:status', express.static(path.join(__dirname, 'public')));

app.get('/api/getLatestDate', function(req, res, next) {
	core.getLatestDate(function(err, date) {
		if (err) return next(err);
		return res.send(date);
	});
});

app.get('/api/getYesterdayDate', function(req, res, next) {
	core.getYesterdayDate(function(err, date) {
		if (err) return next(err);
		return res.send(date);
	});
});

app.get('/api/getLatestModules', function(req, res, next) {
	core.getLatestDate(function(err, date) {
		if (err) return next(err);
		core.getModulesByDate(date.date, function(err, modules) {
			if (err) return next(err);
			async.map(modules, function(module, callback) {
				return core.getStatusCountByModule(module, function(err, mod) {
					if (err == null) {
						return callback(null, mod);
					} else {
						return callback(err);
					}
				});
			}, function(err, mods) {
				return res.send(mods);
			});
		});
	});
});

app.get('/api/getYesterdayModules', function(req, res, next) {
	core.getYesterdayDate(function(err, date) {
		if (err) return next(err);
		core.getModulesByDate(date.date, function(err, modules) {
			if (err) return next(err);
			async.map(modules, function(module, callback) {
				return core.getStatusCountByModule(module, function(err, mod) {
					if (err == null) {
						return callback(null, mod);
					} else {
						return callback(err);
					}
				});
			}, function(err, mods) {
				if (err) return next(err);
				return res.send(mods);
			});
		});
	});
});

app.get('/api/getTestByModule/:id', function(req, res, next) {
	core.getTestsByModule(req.params.id, function(err, tests) {
		if (err) return next(err);
		return res.send(tests);
	});
});

app.get('/api/getTestByModuleAndStatus/:id/:status', function(req, res, next) {
	core.getTestsByModuleAndStatus(req.params.id, req.params.status, function(err, tests) {
		if (err) return next(err);
		return res.send(tests);
	});
});

app.get('/api/getModuleById/:id', function(req, res, next) {
	core.getModuleById(req.params.id, function(err, mod) {
		if (err) return next(err);
		return res.send(mod);
	});
});

app.get('/api/getArchive', function(req, res, next) {
	core.getAllDates(function(err, dates) {
		if (err) return next(err);
		dates.sort();
		dates.reverse();
		async.map(dates, function(date, callback) {
			return core.getStatusCountByDate(date, function(err, dat) {
				if (err == null) {
					return callback(null, dat);
				} else {
					return callback(err);
				}
			});
		}, function(err, dats) {
			if (err) return next(err);
			return res.send(dats);
		});
	});
});

app.get('/api/getModulesByDate/:date', function(req, res, next) {
	core.getModulesByDate(req.params.date, function(err, modules) {
		if (err) return next(err);
		async.map(modules, function(module, callback) {
			return core.getStatusCountByModule(module, function(err, mod) {
				if (err == null) {
					return callback(null, mod);
				} else {
					return callback(err);
				}
			});
		}, function(err, mods) {
			return res.send(mods);
		});
	});
});


app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});