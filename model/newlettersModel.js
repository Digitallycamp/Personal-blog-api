const mongoose = require('mongoose');

/**
 * @property email of users
 * @property body about body
 */
const newsletterSchema = new mongoose.Schema({
	email: String,
	fullname: String,
});

const NewsLetter = new mongoose.model('NewsLetter', newsletterSchema);
module.exports = NewsLetter;
