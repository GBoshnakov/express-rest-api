const router = require('express').Router();
const advertService = require('../services/adverts');
const mapErrors = require('../utils/mappers');
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preloader');

router.get('/', async (req, res) => {
    try {
        const result = await advertService.getAll();
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

    const advert = {
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        image: req.body.image,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        const result = await advertService.createNew(advert);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;

    const advert = {
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        image: req.body.image,
        description: req.body.description,
    };

    try {
        const result = await advertService.updateById(itemId, advert);
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
        await advertService.deleteById(itemId);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }

})

module.exports = router;