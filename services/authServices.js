const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

class AuthServices {
	async signup(email, password) {
		const isExist = await User.findOne({ email });
		if (isExist) {
			throw new Error('Account already exist');
		}

		const salt = await bycrypt.genSalt(10);
		const hashedPassword = await bycrypt.hash(password, salt);
		const newUser = await User.create({ email, password: hashedPassword });

		return newUser;
	}
	async login(email, password) {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('Account do not exist');
		}
		const comparePassword = await bycrypt.compare(password, user.password);
		if (!comparePassword) {
			throw new Error('Invlaid email or password');
		}

		const payload = { userId: user._id };
		const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '5m',
		});
		const refreshToken = await jwt.sign(payload, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '15m',
		});

		// Store refresh token in database
		await Token.findOneAndUpdate(
			{ _id: user._id },
			{ name: 'refreshToken', token: refreshToken }
		);

		return { accessToken, refreshToken };
	}

	// verify refresh token
	async refreshToken(refreshToken) {
		// verify refresh token
		const decoded = await jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET,
			{
				algorithms: ['HS256'],
			}
		);

		console.log(decoded);
		// CEHCK if resheh token exits in database
		const user = await User.findOne({ _id: decoded.userId, refreshToken });
		if (!user) {
			throw new Error('Invalid refresh token');
		}

		// Generate new accesss token
		const payload = { userId: user._id };
		const newAccessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '5m',
		});

		return { accessToken: newAccessToken };
	}

	//logout servicce to revote refresh token
	async logout(userId, refreshToken) {
		await User.findOneAndDelete(
			{ _id: userId },
			{ refreshToken: refreshToken }
		);
	}
}

module.exports = AuthServices;
