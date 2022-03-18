const router = require('express').Router();
const furnitureService = require('../services/furnitures');

router.get('/', async (req, res) => {
    try {
        const result = await furnitureService.getAll();
        res.json(result); 
    } catch (error) {
        console.error(error);
    }
});

router.post('/', async (req, res) => {

    const furniture = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material
    };

    try {
        const result = await furnitureService.createNew(furniture);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;