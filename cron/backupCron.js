const cron = require('node-cron');
const { generateBackup, deleteOldBackups } = require('../services/backupService');

const startBackupCron = () => {
    // Schedule a job to run at 12:00 AM every day
    cron.schedule('0 0 * * *', async () => {
        console.log('🕔 Running scheduled DB backup...');
        await generateBackup();
    });

    // Every 15 days - delete old local backups
    cron.schedule('0 0 */15 * *', () => {
        console.log('🧹 Cleaning up old backups...');
        deleteOldBackups();
    });

    console.log('✅ Backup Cron scheduled (Daily backup at 12 AM, Cleanup every 15 days)');
};

module.exports = startBackupCron;
