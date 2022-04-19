const Advert = require('../models/Advert');

async function getAll() {
    return Advert.find({});
}

async function getById(id) {
    return Advert.findById(id).lean();
}

async function createNew(data) {
    const advert = new Advert(data);

    await advert.save();

    return advert;
}

async function updateById(id, data) {
    const existing = await Advert.findById(id);

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
    await Advert.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById
}