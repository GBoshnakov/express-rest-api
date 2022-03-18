const Furniture = require('../models/Furniture');

async function getAll() {
    return Furniture.find({});
}

async function getById(id) {
    return Furniture.findById(id);
}

async function createNew(data) {
    const furniture = new Furniture(data);
    
    await furniture.save();

    return furniture;
}

module.exports = {
    getAll,
    getById,
    createNew
}