const Blog = require('../model/blogModel');

class BlogSerivices {
	async createBlog(title, body) {
		const blog = await Blog.create(title, body);
		return blog;
	}

	async getAllBlog() {
		const blogs = await Blog.find({});
		return blogs;
	}
	async getABlog(id) {
		const blog = await Blog.findOne({ _id: id });

		return blog;
	}
	async editABlog(id) {
		const blog = await Blog.findOneAndUpdate(
			{ _id: id },
			{ new: true, runValidators: true }
		);
		return blog;
	}
	async deleteABlog(id) {
		const blog = await Blog.findOneAndDelete({ _id: id });
		return blog;
	}
}

module.exports = BlogSerivices;
