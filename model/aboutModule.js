const mongoose = require('mongoose');

/**
 * @property intro about heading
 * @property body about body
 */
const aboutSchema = new mongoose.Schema({
	intro: String,
	body: String,
});

const About = new mongoose.model('About', aboutSchema);
module.exports = About;
