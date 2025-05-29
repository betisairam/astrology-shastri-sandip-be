const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// TODO: Add authentication middleware for production use!

// GET /admin/generate-token
// Generates a secure 256-bit (32-byte) random token and returns it as JSON
router.get('/generate-token', (req, res) => {
    const token = crypto.randomBytes(32).toString('hex');
    res.json({ token });
});

module.exports = router;
