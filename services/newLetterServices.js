const NewsLetter = require('../model/newlettersModel');

class NewsLetterServices {
	async addSunscriber(data) {
		const subscriber = await NewsLetter.create(data);
		return subscriber;
	}
}

module.exports = NewsLetterServices;
