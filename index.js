require('dotenv').config();
const app = require('./app');
const { config } = require('./config/database');
const PORT = process.env.PORT;

function startServer() {
	config(process.env.DB_URL);
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

startServer();
