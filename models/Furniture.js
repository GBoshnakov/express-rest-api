const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    make: { type: String, required: [true, 'Make is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1950, 'Year must be between 1950 and 2050'],
        max: [2050, 'Year must be between 1950 and 2050']
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
    img: { type: String, required: [true, 'Image is required'] },
    material: { type: String },
    owner: { type: ObjectId, ref: 'User' }
});

const Furniture = model('Furniture', schema);

module.exports = Furniture;