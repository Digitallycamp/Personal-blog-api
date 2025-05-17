const mongoose = require('mongoose');

/**
 * @property intro about heading
 * @property body about body
 */
const blogSchema = new mongoose.Schema(
	{
		title: String,
		body: String,
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model('Blogs', blogSchema);
module.exports = Blog;
