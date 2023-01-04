const express = require('express');
const cors = require('cors');
const colors = require('colors');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const conectDB = require("./src/config/db");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// conect to DB
conectDB();

// routes

app.use("/api/users", require("./src/routes/UsersRoutes"));
app.use("/api/admin", require("./src/routes/AdminRoutes"));

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.bold);
}
);