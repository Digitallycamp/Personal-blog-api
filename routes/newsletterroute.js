const express = require('express');
const { createNewsLetter } = require('../controller/newLetterController');

const newLetterRoutes = express.Router();

newLetterRoutes.post('/send', createNewsLetter);

module.exports = newLetterRoutes;
