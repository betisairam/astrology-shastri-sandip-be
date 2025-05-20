// routes/backupRoutes.js
const express = require('express');
const auth = require('../middlewares/authMiddleware');
const restoreBackupController = require('../controllers/restoreBackupController');
const router = express.Router();
const { downloadAndDecryptLatestBackup } = require('../services/backupService'); // adjust path if needed

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


/**
 * @swagger
 * /api/backup/download-latest:
 *   get:
 *     summary: Download and decrypt the latest backup from S3
 *     description: Downloads the most recent encrypted backup from S3, decrypts it, and stores it locally.
 *     tags:
 *       - Backup
 *     responses:
 *       200:
 *         description: Latest backup downloaded and decrypted successfully.
 *       500:
 *         description: Server error while downloading or decrypting the backup.
 */
router.get('/download-latest', auth, async (req, res) => {
    try {
        await downloadAndDecryptLatestBackup();
        res.status(200).json({ message: '✅ Latest backup downloaded and decrypted successfully.' });
    } catch (error) {
        console.error('❌ Error downloading/decrypting backup:', error);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

module.exports = router;
