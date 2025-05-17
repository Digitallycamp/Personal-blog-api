const mongoose = require('mongoose');

const AboutServices = require('../services/aboutServices');

const aboutService = new AboutServices();
exports.aboutController = {
	// crerate blog module
	createAbout: async function (req, res, next) {
		console.log(req.body);
		try {
			const { intro, body } = req.body;

			if (!intro || !body) {
				throw new Error('Title and post required!');
			}

			// const post = Blog.create({ title, body });
			const about = await aboutService.createAbout({ intro, body });
			if (!about) {
				throw new Error('Failed to create post');
			}

			res
				.status(201)
				.json({ success: true, message: 'AAbout created succeffuly' });
		} catch (error) {
			next(error);
		}
	},

	// get about
	getAbout: async function (req, res, next) {
		const { id } = req.body;
		try {
			if (!mongoose.isValidObjectId(id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const about = await aboutService.getAbout(id);

			if (!about) {
				return res.status(404).json({
					success: false,
					message: 'No About with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A About retrived succeffuly',
				data: about,
			});
		} catch (error) {
			next(error);
		}
	},
	// edit module
	editAbout: async function (req, res, next) {
		const { intro, body, id } = req.body;

		if (!intro || !body) {
			throw new Error('Title and post required!');
		}
		try {
			if (!mongoose.isValidObjectId(id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const about = await aboutService.editAbout(id, { intro, body });

			if (!about) {
				return res.status(404).json({
					success: false,
					message: 'No about with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A about editted succeffuly',
				data: about,
			});
		} catch (error) {
			next(error);
		}
	},
	//delete module
	deleteBlogs: async function (req, res, next) {
		const { id } = req.body;
		try {
			if (!mongoose.isValidObjectId(id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const about = await aboutService.deleteAbout(id);

			if (!about) {
				return res.status(404).json({
					success: false,
					message: 'No about with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A about Deleted succeffuly',
			});
		} catch (error) {
			next(error);
		}
	},
};

// generate the folder structure and test unit and integration
