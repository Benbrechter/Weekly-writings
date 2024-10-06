const mongoose = require('mongoose');

const { Schema } = mongoose;

const storySchema = new Schema({
    title: {
        type: String,
    },
    story: {
        type: String
    }
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story