import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protected route example (uses auth middleware)
import { protect } from './middleware/auth.js';

app.get('/api/profile', protect, (req, res) => {
  res.json({
    message: 'Welcome to your protected profile',
    user: req.user,
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Demo Auth Project API is running' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/demo-auth')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });