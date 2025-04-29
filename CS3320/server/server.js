require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection - Updated with modern connection options
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://joeejiasi:Java2025@cluster0.qwz6mae.mongodb.net/book", {
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Test route with better connection status reporting
app.get('/api/test', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMessages = [
    'Disconnected',
    'Connected',
    'Connecting',
    'Disconnecting'
  ];
  
  res.json({ 
    status: 'Server is running',
    database: statusMessages[dbStatus] || 'Unknown',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});