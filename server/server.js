const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const {authMiddleware} = require('./utils/auth')
const { typeDefs, resolvers} = require('./schema/index');
const connectDB = require('./config/connections');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

const PORT = process.env.PORT || 3001;
const app = express();

// Configure multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startApolloServer = async () => {
    await server.start();
  
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  
    // Serve up static assets
    app.use('/images', express.static(path.join(__dirname, '../client/images')));
  
    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));
  
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
  
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }
  
    try {
      await connectDB(); // Connect to the database
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  };
  
  // Call the async function to start the server
  startApolloServer();

