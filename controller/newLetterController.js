const NewsLetterServices = require('../services/newLetterServices');

const newsLetterServices = new NewsLetterServices();
module.exports = {
	//valid for small tpo medium aplication
	// joi, express-validaor, yup
	createNewsLetter: function (req, res, next) {
		console.log(req.body);
		const { email, fullname } = req.body;
		if (!email || !fullname) {
			return res.status(400).json({
				success: false,
				message: 'Subscriber email and fullanem required',
			});
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format',
			});
		}

		try {
			// add user to news letter
			const subscriber = newsLetterServices.addSunscriber({ email, fullname });
			res.status(200).json({
				success: true,
				message: 'You have sucessfully subscribe toour newsletter.',
			});
		} catch (error) {
			next(error);
		}

		// send email via node mailer or mailcheamp
	},
};
