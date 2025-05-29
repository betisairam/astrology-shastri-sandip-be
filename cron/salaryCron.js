const cron = require('node-cron');
const salaryService = require('../services/salaryService');
const logger = require('../utils/logger');
const dayjs = require('dayjs');

// Run on 1st of every month at 1 AM
cron.schedule('0 1 1 * *', async () => {
    try {
        const targetMonth = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        logger.info(`🕒 Starting salary computation for ${targetMonth}`);
        await salaryService.calculateAndStoreMonthlySalaries(targetMonth);
        logger.info(`✅ Salary computation done for ${targetMonth}`);
    } catch (err) {
        logger.error('❌ Salary cron failed', err);
    }
});
