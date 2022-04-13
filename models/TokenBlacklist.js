const { model, Schema } = require('mongoose');

const TokenBlacklistSchema = new Schema({
    token: String
}, { timestamps: { createdAt: 'created_at' } });

const TokenBlacklist = model('TokenBlacklist', TokenBlacklistSchema);

module.exports = TokenBlacklist;