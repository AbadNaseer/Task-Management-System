const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3030;
// Connect to MongoDB using the URI from config.js
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err) => {
        console.error(err.message);
        process.exit(1); // Exit the application if MongoDB connection fails
      });
app.use(express.json());
// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/tasks', require('./middlewares/authMiddleware'), require('./routes/taskRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
