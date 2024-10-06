const {User, Story} = require('../model/index')

const resolvers = {
    Queery: {
        getAllUser: async () => {
            const user = await User.find()
            return user
          }

    }
}

module.exports = resolvers