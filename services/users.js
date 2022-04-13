const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'asdah87y17264781ybdna';
const blacklist = [];

async function register(email, password) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new User({ email, hashedPassword: await bcrypt.hash(password, 10) });
    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect email or password');
    }
    return createSession(user);
}

async function logout(token) {
    blacklist.push(token);

    const tokenBlacklist = new TokenBlacklist({ token });

    await tokenBlacklist.save({ token });
}

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    };
}

async function verifySession(token) {

    const result = await TokenBlacklist.findOne({ token });
    
    if (result) {
        throw new Error('Token is blacklisted');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    return {
        email: payload.email,
        _id: payload._id,
        token
    };
}

module.exports = {
    register,
    login,
    logout,
    verifySession
}