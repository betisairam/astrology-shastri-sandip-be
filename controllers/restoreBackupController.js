const { generateLatestBackupDownloadUrl } = require("../services/backupService");

exports.restoreBackupFromS3 = async (req, res) => {
    try {
        const url = await generateLatestBackupDownloadUrl();
        res.json({ downloadUrl: url });
    } catch (error) {
        console.error('Error generating backup download URL:', error.message);
        res.status(500).json({ error: 'Failed to generate backup URL.' });
    }
}