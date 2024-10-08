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

    }
}

module.exports = resolvers