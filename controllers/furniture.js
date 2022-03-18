const router = require('express').Router();
const furnitureService = require('../services/furnitures');
const mapErrors = require('../utils/mappers');
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preloader');

router.get('/', async (req, res) => {
    try {
        const result = await furnitureService.getAll();
        res.json(result);
    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.get('/:id', preload(), (req, res) => {
    const itemId = req.params.id;

    try {
        const result = res.locals.item;
        res.json(result);

    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
})

router.post('/', isUser(), async (req, res) => {

    const furniture = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material,
        owner: req.user._id
    };

    try {
        const result = await furnitureService.createNew(furniture);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const furniture = {
        make: req.body.make,
        model: req.body.model,
        year: Number(req.body.year),
        description: req.body.description,
        price: Number(req.body.price),
        img: req.body.img,
        material: req.body.material,
    };

    try {
        const result = await furnitureService.updateById(itemId, furniture);
        res.json(result);

    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.delete('/:id', isOwner(), async (req, res) => {
    const itemId = req.params.id;

    try {
        await furnitureService.deleteById(itemId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }

})

module.exports = router;