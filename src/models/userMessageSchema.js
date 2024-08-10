const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const UserMessageData = mongoose.models['User Information'] || mongoose.model('User Information', userMessageSchema, 'User Information');

module.exports = UserMessageData;
