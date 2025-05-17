const express = require('express');
const cors = require('cors');

const newLetterRoutes = require('./routes/newsletterroute');
const blogRoutes = require('./routes/blogroutes');
const aboutRoutes = require('./routes/aboutRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors('*'));

app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/newsletters', newLetterRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/auth', authRoutes);
app.get('/', (req, res) => {
	res.status(200).json({ messasge: 'Welcome to DVA personal blog API' });
});

// error middleare

module.exports = app;
