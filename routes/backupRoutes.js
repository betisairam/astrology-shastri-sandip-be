// routes/backupRoutes.js
const express = require('express');
const auth = require('../middlewares/authMiddleware');
const restoreBackupController = require('../controllers/restoreBackupController');
const router = express.Router();

/**
 * @swagger
 * /api/backup/latest:
 *   get:
 *     summary: Get Latest Backup Download URL
 *     tags: [Backup]
 *     responses:
 *       200:
 *         description: Successfully generated download URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 downloadUrl:
 *                   type: string
 *                   format: uri
 *                   example: "https://your-s3-bucket.s3.amazonaws.com/backups/backup-2025-04-27T11-30-00.enc?X-Amz-SignedHeaders=..."
 *       500:
 *         description: Failed to generate backup URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to generate backup URL."
 */

// GET /api/backup/latest
router.get('/latest', auth, restoreBackupController.restoreBackupFromS3);

module.exports = router;
