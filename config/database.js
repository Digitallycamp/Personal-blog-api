const mongoose = require('mongoose');

exports.config = function (url) {
	try {
		mongoose.connect(url);
	} catch (error) {
		console.log(error);
	}
};
