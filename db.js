var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/bodega");

exports.Module = mongoose.model("Module", {
	name: String,
	date: {
		type: String,
		index: true
	},
	owner: String,
	elapsedTime: String,
	reg2AttrTotal: Number,
	reg2AttrPassed: Number,
	reg2AttrFailed: Number
});

exports.Test = mongoose.model("Test", {
	module: {
		type: mongoose.Schema.ObjectId,
		ref: "Module",
		index: true
	},
	name: String,
	status: String,
	rtlBuildLog: {
		path: String
	},
	buildLog: {
		path: String,
		errors: Number,
		warnings: Number
	},
	simulationLog: {
		path: String,
		errors: Number,
		warnings: Number
	},
	runtime: String,
	seed: Number
});
