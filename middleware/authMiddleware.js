const jwt = require('jsonwebtoken');
exports.authMiddleWare = {
	protect: async function (req, res, next) {
		// Extract data from Authorization header

		try {
			const header = req.headers.authorization;
			if (!header || !header.startsWith('Bearer ')) {
				return res
					.status(401)
					.json({ success: false, message: 'No token provided' });
			}

			const accessToken = header.split(' ')[1];
			// Verify token
			const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET, {
				algorithms: ['HS256'],
			});
			// Attach payload to req.user
			req.user = decoded;

			next();
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid or expired token' });
		}
	},

	authorize: async function (req, res, next) {},
};
