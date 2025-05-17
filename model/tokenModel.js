const mongoose = require('mongoose');

/**
 * @property name of token
 * @property token itself
 */
const tokenSchema = new mongoose.Schema(
	{
		name: String,
		token: String,
		user: {
			type: mongoose.Types.ObjectId,
			ref: User,
		},
	},
	{ timestamps }
);

const Token = new mongoose.model('Token', tokenSchema);
module.exports = Token;
