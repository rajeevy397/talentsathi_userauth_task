// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
