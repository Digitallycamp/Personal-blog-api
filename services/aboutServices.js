const About = require('../model/aboutModule');

class AboutServices {
	async createAbout(intro, body) {
		const about = await About.create(intro, body);
		return about;
	}

	async getAbout(id) {
		const about = await About.findOne({ _id: id });

		return about;
	}
	async editAbout(id) {
		const about = await About.findOneAndUpdate(
			{ _id: id },
			{ new: true, runValidators: true }
		);
		return about;
	}
	async deleteAbout(id) {
		const about = await About.findOneAndDelete({ _id: id });
		return about;
	}
}

module.exports = AboutServices;
