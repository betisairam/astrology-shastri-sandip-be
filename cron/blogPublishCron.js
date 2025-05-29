const cron = require('node-cron');
const db = require('../db/knex');
const logger = require('../utils/logger');

const scheduleBlogPublishing = () => {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
        try {
            const now = new Date();

            const updated = await db('blogs')
                .where('status', 'scheduled')
                .andWhere('published_at', '<=', now)
                .update({
                    status: 'published',
                    updated_at: now
                });

            if (updated) {
                logger.info(`📝 ${updated} blog(s) published automatically`);
            }
        } catch (err) {
            logger.error('❌ Failed to auto-publish scheduled blogs', err);
        }
    });
};

module.exports = scheduleBlogPublishing;
