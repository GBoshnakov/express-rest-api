const router = require('express').Router();
const mapErrors = require('../utils/mappers');
const { login, register, logout } = require('../services/users');
const { isGuest } = require('../middlewares/guards');

router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Email and password are required');
        }
        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);

    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.post('/login', isGuest(), async (req, res) => {

    try {
        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('Email and password are required');
        }
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);

    } catch (error) {
        console.error(error);
        const errMsg = mapErrors(error);
        res.status(400).json({ message: errMsg });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
})

module.exports = router;

