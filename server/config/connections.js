const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gridFSBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Weekly-writings');
    
    // Initialize GridFS bucket after successful connection
    gridFSBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });
    
    console.log('MongoDB connected successfully');
    return { connection: conn, gridFSBucket };
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Export both the connection function and the gridFSBucket
module.exports = {
  connectDB,
  getGridFSBucket: () => gridFSBucket
};
