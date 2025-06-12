const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;
