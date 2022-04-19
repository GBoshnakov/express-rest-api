const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [5, 'Username must be at least 5 characters long']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        match: [/^[0-9]{10}$/, 'Mobile number must be 10 digits long']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    adverts: {
        type: [ObjectId], 
        ref: 'Advert', 
        default: []
    }
}, { timestamps: { createdAt: 'created_at' } });

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;