const express = require('express');
const colors = require('colors')
const cors = require('cors')
require('dotenv').config();

const connectDB = require('./src/config/db');
const port = process.env.PORT || 5000;
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.listen(port, () =>
    console.log(`☕️ Server is running on port ➔  ${port} 💣`.green.underline.bold))

