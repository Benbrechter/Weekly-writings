const {User, Story} = require('../model/index')

const resolvers = {
    Query: {
        getAllUser: async () => {
            const user = await User.find()
            return user
          },
        getAllStory: async () => {
            const story = await Story.find()
            return story
        }
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
        }   
    }
}

module.exports = resolvers