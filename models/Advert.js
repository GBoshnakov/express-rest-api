const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [4, 'Title must be at least 4 characters long']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['electronics', 'vehicles', 'tools', 'gadgets', 'home', 'garden'],
            message: 'Invalid category'
        }
    },
    image: {
        type: Number,
        required: [true, 'ImageURL is required'],
        match: [/^https?:\/\/[\w]/, 'Image must be a valid URL address']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0']
    },
    owner: { type: ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'created_at' } });

const Furniture = model('Furniture', schema);

module.exports = Furniture;