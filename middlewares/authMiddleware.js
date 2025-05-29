const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Admin-only
module.exports.adminOnly = (req, res, next) => {
    if (req.user?.role !== 'admin' && req.user?.role !== 'super_admin') {
        return res.status(403).json({ error: 'Admins only' });
    }
    next();
};

