const mongoose = require('mongoose');
const Blog = require('../model/blogModel');
const BlogServices = require('../services/blogServices');
const blogService = new BlogServices();
exports.blogController = {
	// crerate blog module
	createBlog: async function (req, res, next) {
		console.log(req.body);
		try {
			const { title, body } = req.body;

			if (!title || !body) {
				throw new Error('Title and post required!');
			}

			// const post = Blog.create({ title, body });
			const blog = await blogService.createBlog({ title, body });
			if (!blog) {
				throw new Error('Failed to create post');
			}

			res
				.status(201)
				.json({ success: true, message: 'Blog created succeffuly' });
		} catch (error) {
			next(error);
		}
	},

	// get all blog in assending order module
	getBlogs: async function (req, res, next) {
		console.log('USER', req.user);
		try {
			const blogs = await blogService.getAllBlog();
			if (blogs.length == 0) {
				res
					.status(201)
					.json({ success: true, message: 'You dont have a post yet' });
			}

			res.status(200).json({
				success: true,
				message: 'All retrived succeffuly',
				data: blogs,
			});
		} catch (error) {
			next(error);
		}
	},
	// get a blog
	getblog: async function (req, res, next) {
		try {
			if (!mongoose.isValidObjectId(req.params.id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const blog = await blogService.getABlog(req.params.id);

			if (!blog) {
				return res.status(404).json({
					success: false,
					message: 'No blog with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A blog retrived succeffuly',
				data: blog,
			});
		} catch (error) {
			next(error);
		}
	},
	// edit module
	editBlogs: async function (req, res, next) {
		const { title, body } = req.body;

		if (!title || !body) {
			throw new Error('Title and post required!');
		}
		try {
			if (!mongoose.isValidObjectId(req.params.id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const blog = await blogService.editABlog(req.params.id, { title, body });

			if (!blog) {
				return res.status(404).json({
					success: false,
					message: 'No blog with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A blog editted succeffuly',
				data: blog,
			});
		} catch (error) {
			next(error);
		}
	},
	//delete module
	deleteBlogs: async function (req, res, next) {
		try {
			if (!mongoose.isValidObjectId(req.params.id)) {
				return res.status(404).json({
					success: false,
					message: 'Invalid ID',
				});
			}

			const blog = await blogService.deleteABlog(req.params.id);

			if (!blog) {
				return res.status(404).json({
					success: false,
					message: 'No blog with such ID',
				});
			}
			res.status(200).json({
				success: true,
				message: 'A blog Deleted succeffuly',
			});
		} catch (error) {
			next(error);
		}
	},
};

// generate the folder structure and test unit and integration
