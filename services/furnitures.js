const Furniture = require('../models/Furniture');

async function getAll() {
    return Furniture.find({});
}

async function getById(id) {
    return Furniture.findById(id).lean();
}

async function createNew(data) {
    const furniture = new Furniture(data);

    await furniture.save();

    return furniture;
}

async function updateById(id, data) {
    const existing = await Furniture.findById(id);

    existing.make = data.make;
    existing.model = data.model;
    existing.year = Number(data.year);
    existing.description = data.description;
    existing.price = Number(data.price);
    existing.img = data.img;
    existing.material = data.material;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Furniture.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById
}