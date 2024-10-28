const express = require('express');
const bodyParser = require('body-parser')
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const path = require('path');
const fileUpload = require('express-fileupload');
const { typeDefs, resolvers } = require('./schema/index');
const { connectDB, getGridFSBucket } = require('./config/connections');

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Get the user token from the headers
      const token = req.headers.authorization || '';
      
      // Try to retrieve a user with the token
      const user = await getUser(token);
      
      // Add the user to the context
      return { user };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  await server.start();

  // Add the express-fileupload middleware here
  app.use(fileUpload());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Get the user token from the headers
        const token = req.headers.authorization || '';
        
        // Try to retrieve a user with the token
        const user = await getUser(token);
        
        // Add the user to the context
        return { user };
      },
    })
  );

  // Serve static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
  }

  try {
    await connectDB();
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

// Helper function to retrieve a user from the token
async function getUser(token) {
  // Implement your user authentication logic here
  // This is a placeholder example
  if (token) {
    return { _id: '123', username: 'exampleUser' };
  }
  return null;
}

startApolloServer();