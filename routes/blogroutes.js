const express = require('express');
const { blogController } = require('../controller/blogController');
const { authMiddleWare } = require('../middleware/authMiddleware');

const blogRoutes = express.Router();

blogRoutes.post('/create', authMiddleWare.protect, blogController.createBlog);
blogRoutes.get('/', blogController.getBlogs);
blogRoutes.get('/:id', blogController.getblog);
blogRoutes.put('/:id', blogController.editBlogs);
blogRoutes.delete('/:id', blogController.deleteBlogs);

module.exports = blogRoutes;
