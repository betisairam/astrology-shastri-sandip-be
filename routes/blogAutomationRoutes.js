const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/blogs/automation/schedule:
 *   get:
 *     summary: Auto-publish scheduled blogs
 *     tags: [Automation]
 *     description: >
 *       Blogs with `status: scheduled` and a `published_at` timestamp in the past
 *       are automatically marked as `published` by a cron job that runs every hour.
 *       
 *       This helps admins plan future content while ensuring timely publication without manual intervention.
 *       
 *       ✅ Triggered by a scheduled cron job
 *       ✅ No API request required
 *       ✅ `status` will update to `published` and `published_at` will be respected
 *       
 *       **Note**: Blogs must have both `status: scheduled` and `published_at` set.
 *     responses:
 *       200:
 *         description: This endpoint only exists to document automation. No data is returned.
 */
router.get('/schedule', (req, res) => {
    res.status(200).json({
        message: 'This route exists only for Swagger documentation. Blog auto-publishing is handled by a cron job.'
    });
});

module.exports = router;
