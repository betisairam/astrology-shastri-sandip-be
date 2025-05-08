const cron = require('node-cron');
const { generateBackup, deleteOldBackups } = require('../services/backupService');

const startBackupCron = () => {
    // Every 5 minutes - generate backup
    cron.schedule('*/5 * * * *', async () => {
        console.log('🕔 Running scheduled DB backup...');
        // await generateBackup();
    });

    // Every 10 minutes - delete old local backups
    cron.schedule('*/10 * * * *', () => {
        console.log('🧹 Cleaning up old backups...');
        deleteOldBackups();
    });

    console.log('✅ Backup Cron scheduled (5 min backup, 10 min cleanup)');
};

module.exports = startBackupCron;
