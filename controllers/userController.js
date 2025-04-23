const userService = require('../services/userService');

exports.getAll = async (req, res) => {
    const users = await userService.getAll();
    res.json(users);
};

exports.create = async (req, res) => {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
};
