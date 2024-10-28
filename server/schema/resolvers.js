const {User} = require('../model/index')
const { finished } = require('stream/promises');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        getAllUsers: async () => {
            const user = await User.find()
            return user
          },
          getAllFiles: async (parent, args, context) => {
            if (!context.user) {
              throw new GraphQLError('Authentication required');
            }
          
            try {
              const { getGridFSBucket } = require('./config/connections');
              const bucket = getGridFSBucket();
          
              // Find all files with a 'application/pdf' contentType
              const files = await bucket.find({ 'metadata.contentType': 'application/pdf' }).toArray();
          
              return files.map(file => ({
                _id: file._id.toString(),
                filename: file.filename,
                contentType: file.metadata.contentType,
                uploadDate: file.uploadDate.toISOString()
              }));
            } catch (err) {
              throw new GraphQLError('Error fetching files');
            }
          },
          getFile: async (parent, { fileId }, context) => {
            if (!context.user) {
              throw new GraphQLError('Authentication required');
            }
          
            try {
              const { getGridFSBucket } = require('./config/connections');
              const bucket = getGridFSBucket();
              const _id = new mongoose.Types.ObjectId(fileId);
          
              // Check if file exists
              const file = await bucket.find({ _id }).next();
          
              if (!file) {
                throw new GraphQLError('PDF not found');
              }
          
              // Return download URL (will be handled by separate endpoint)
              return {
                success: true,
                fileId: file._id.toString(),
                downloadUrl: `/api/download/${file._id}`,
                message: 'PDF found'
              };
            } catch (err) {
              throw new GraphQLError('Error retrieving PDF');
            }
          },
        //gonna need a sectiion for alll stories stored in chronological order
        //a search funtion aswell
        //make a create button for articles 
        //allow myself admin control

    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
    
            return {token, user};
        }, 
        uploadFile: async (parent, { file }, context) => {
            if (!context.user) {
              throw new GraphQLError('Authentication required');
            }
          
            try {
              const { createReadStream, filename, mimetype } = await file;
          
              // Validate file type
              if (mimetype !== 'application/pdf') {
                throw new GraphQLError('Only PDF files are allowed');
              }
          
              const stream = createReadStream();
              const { getGridFSBucket } = require('./config/connections');
              const bucket = getGridFSBucket();
          
              const uploadStream = bucket.openUploadStream(filename, {
                metadata: {
                  contentType: mimetype,
                  userId: context.user._id,
                  uploadDate: new Date()
                }
              });
          
              await finished(stream.pipe(uploadStream));
          
              return {
                success: true,
                fileId: uploadStream.id.toString(),
                message: 'PDF uploaded successfully',
                downloadUrl: `/api/download/${uploadStream.id}`
              };
            } catch (err) {
              throw new GraphQLError('Error uploading PDF');
            }
          }
        }
          
    }


module.exports = resolvers