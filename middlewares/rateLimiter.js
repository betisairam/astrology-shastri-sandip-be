const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: 'Too many login attempts, try again later',
});
