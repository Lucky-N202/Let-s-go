require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connection = require('./src/models/db.config');

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./src/routes/user');
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, async() => {
    await connection;
  console.log(`Server is running on port ${port}`);
});
