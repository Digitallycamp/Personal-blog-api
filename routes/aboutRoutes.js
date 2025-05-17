const express = require('express');
const { aboutController } = require('../controller/aboutController');
const aboutRoutes = express.Router();

aboutRoutes.post('/create', aboutController.createAbout);
aboutRoutes.get('/me', aboutController.getAbout);
aboutRoutes.put('/me', aboutController.editAbout);
aboutRoutes.delete('/me', aboutController.deleteBlogs);

module.exports = aboutRoutes;
