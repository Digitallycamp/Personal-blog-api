const mongoose = require('mongoose');

/**
 * @property intro about heading
 * @property body about body
 */
const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	verification: String,
	isVerified: Boolean,
	refreshToken: String,
});

const User = new mongoose.model('Users', userSchema);
module.exports = User;
