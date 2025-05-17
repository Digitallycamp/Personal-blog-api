const AuthServices = require('../services/authServices');

const authService = new AuthServices();

exports.authController = {
	signup: async function (req, res, next) {
		const { email, password, confirmPassword } = req.body;
		try {
			if (!email || !password || !confirmPassword) {
				return res
					.status(400)
					.json({ sucess: false, message: 'All fields are required!' });
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email format',
				});
			}
			if (password !== confirmPassword) {
				return res
					.status(400)
					.json({ sucess: false, message: 'Paaaword not equal' });
			}

			const user = await authService.signup(email, password);
			return res
				.status(200)
				.json({ sucess: true, message: 'Account created successfully' });
		} catch (error) {
			next(error);
		}
	},
	login: async function (req, res, next) {
		const { email, password } = req.body;
		try {
			if (!email || !password) {
				return res
					.status(400)
					.json({ sucess: false, message: 'All fields are required!' });
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email format',
				});
			}

			const { accessToken, refreshToken } = await authService.login(
				email,
				password
			);

			return res.status(200).json({
				sucess: true,
				message: 'Account created successfully',
				accessToken,
				refreshToken,
			});
		} catch (error) {
			next(error);
		}
	},
	verify: async function (req, res, next) {
		try {
		} catch (error) {}
	},
	refreshToken: async function (req, res, next) {
		const { refreshToken } = req.body;
		try {
			if (!refreshToken) {
				return res
					.status(400)
					.json({ success: false, message: 'Refresh token is required' });
			}
			const { accessToken } = await authService.refreshToken(refreshToken);
			res.status(200).json({
				success: true,
				message: 'Token refrshed successfully',
				accessToken,
			});
		} catch (error) {
			next(error);
		}
	},
	logout: async function (req, res, next) {
		const { refreshToken } = req.body;
		try {
			if (!refreshToken) {
				return res
					.status(400)
					.json({ success: false, message: 'Refresh token is required' });
			}
			await authService.logout(req.user._id, refreshToken);
			return res.status(200).json({
				success: true,
				message: 'Logged out successfully',
			});
		} catch (error) {
			next(error);
		}
	},
	resetPassword: function (req, res, next) {
		try {
		} catch (error) {}
	},
	forgotPassword: function (req, res, next) {
		try {
		} catch (error) {}
	},

	deleteAccount: function (req, res, next) {
		try {
		} catch (error) {}
	},
};
