const { verifySession } = require('../services/users');

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
        }
        next();
    } catch (error) {
        res.status(498).json({ message: 'Access token not valid. Please sign in' });
    }
}