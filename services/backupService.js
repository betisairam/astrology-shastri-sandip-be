const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { sendEmail } = require('../utils/emailer');

// Setup S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Paths and DB configs
const algorithm = 'aes-256-cbc';
const secretKey = process.env.BACKUP_SECRET_KEY || 'my_super_secret_key_32_characters!';
const backupFolder = path.join(__dirname, '..', 'backups');
const dbName = process.env.DB_NAME || 'your_db_name';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const s3Bucket = process.env.AWS_S3_BUCKET || 'your-s3-bucket-name';

// Ensure backup folder exists
if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder);
}

// Upload to AWS S3
const uploadToS3 = async (localFilePath, s3Key) => {
    const fileStream = fs.createReadStream(localFilePath);
    const uploadParams = {
        Bucket: s3Bucket,
        Key: s3Key,
        Body: fileStream
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        console.log(`☁️ Backup uploaded to S3: ${s3Key}`);
    } catch (err) {
        console.error('❌ Failed to upload backup to S3:', err.message);
        throw err;
    }
};

// Generate and Encrypt Backup
// const generateBackup = async () => {
//     const timestamp = new Date().toISOString().replace(/:/g, '-');
//     const sqlFilePath = path.join(backupFolder, `backup-${timestamp}.sql`);
//     const encFilePath = path.join(backupFolder, `backup-${timestamp}.enc`);

//     const dumpCommand = `PGPASSWORD=${process.env.DB_PASSWORD} pg_dump -h ${dbHost} -U ${dbUser} -d ${dbName} > ${sqlFilePath}`;

//     exec(dumpCommand, (error) => {
//         if (error) {
//             console.error('❌ Backup Failed:', error.message);
//             return;
//         }
//         console.log('✅ Backup created:', sqlFilePath);

//         const iv = crypto.randomBytes(16);
//         const cipher = crypto.createCipheriv(algorithm, secretKey.slice(0, 32), iv);

//         const input = fs.createReadStream(sqlFilePath);
//         const output = fs.createWriteStream(encFilePath);

//         output.write(iv);

//         input.pipe(cipher).pipe(output);

//         output.on('finish', async () => {
//             console.log('🔒 Backup encrypted with IV embedded:', encFilePath);

//             try {
//                 const s3Key = `backups/${path.basename(encFilePath)}`;
//                 await uploadToS3(encFilePath, s3Key);
//                 fs.unlinkSync(encFilePath); // Optional: delete local encrypted file after upload
//             } catch (err) {
//                 console.error('❌ Upload failed, keeping local encrypted backup:', encFilePath);
//             }

//             fs.unlinkSync(sqlFilePath); // Always delete raw .sql file
//         });
//     });
// };

const generateBackup = async () => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const sqlFilePath = path.join(backupFolder, `backup-${timestamp}.sql`);
    const encFilePath = path.join(backupFolder, `backup-${timestamp}.enc`);

    const dumpCommand = `PGPASSWORD=${process.env.DB_PASSWORD} pg_dump -h ${dbHost} -U ${dbUser} -d ${dbName} > ${sqlFilePath}`;

    exec(dumpCommand, async (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Backup Failed:', error.message);

            await sendEmail({
                to: process.env.BACKUP_NOTIFY_EMAIL,
                subject: `❌ Database Backup Failed [${timestamp}]`,
                text: `Backup failed.\n\nError Message: ${error.message}`,
                html: `<h1>❌ Backup Failed</h1><p>Error: ${error.message}</p>`
            });

            return;
        }

        console.log('✅ Backup created:', sqlFilePath);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, secretKey.slice(0, 32), iv);

        const input = fs.createReadStream(sqlFilePath);
        const output = fs.createWriteStream(encFilePath);

        output.write(iv);
        input.pipe(cipher).pipe(output);

        output.on('finish', async () => {
            console.log('🔒 Backup encrypted with IV embedded:', encFilePath);

            try {
                const s3Key = `backups/${path.basename(encFilePath)}`;
                await uploadToS3(encFilePath, s3Key);

                await sendEmail({
                    to: process.env.BACKUP_NOTIFY_EMAIL,
                    subject: `✅ Database Backup Successful [${timestamp}]`,
                    text: `Backup completed and uploaded successfully.`,
                    html: `<h1>✅ Backup Successful</h1><p>Backup: ${s3Key}</p>`
                });

                fs.unlinkSync(encFilePath); // delete local encrypted file
            } catch (uploadError) {
                console.error('❌ Upload failed, keeping local encrypted backup:', encFilePath);

                await sendEmail({
                    to: process.env.BACKUP_NOTIFY_EMAIL,
                    subject: `⚠️ Backup Upload Failed [${timestamp}]`,
                    text: `Backup was created but failed to upload to S3.\n\nError: ${uploadError.message}`,
                    html: `<h1>⚠️ Backup Upload Failed</h1><p>Error: ${uploadError.message}</p>`
                });
            }

            fs.unlinkSync(sqlFilePath); // delete raw .sql file
        });
    });
};

// Decrypt a local backup file
const decryptBackup = (encryptedFilePath, outputFilePath) => {
    const input = fs.createReadStream(encryptedFilePath);

    input.once('readable', () => {
        const iv = input.read(16); // Read first 16 bytes (IV)
        const decipher = crypto.createDecipheriv(algorithm, secretKey.slice(0, 32), iv);
        const output = fs.createWriteStream(outputFilePath);

        input.pipe(decipher).pipe(output);

        output.on('finish', () => {
            console.log('🔓 Backup decrypted:', outputFilePath);
        });
    });
};

// Delete old backups after 10 minutes
const deleteOldBackups = () => {
    const files = fs.readdirSync(backupFolder);
    const now = Date.now();
    const TEN_MINUTES_MS = 10 * 60 * 1000; // 10 minutes in milliseconds

    files.forEach(file => {
        const filePath = path.join(backupFolder, file);
        const stats = fs.statSync(filePath);

        if (now - stats.mtimeMs > TEN_MINUTES_MS) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted old backup: ${file}`);
        }
    });
};

// Download and decrypt latest backup from S3
const downloadAndDecryptLatestBackup = async () => {
    const listCommand = new ListObjectsV2Command({
        Bucket: s3Bucket,
        Prefix: 'backups/'
    });

    const listResult = await s3.send(listCommand);
    const backups = listResult.Contents || [];

    if (backups.length === 0) {
        console.log('⚠️ No backups found in S3.');
        return;
    }

    // Sort by LastModified
    backups.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));

    const latestBackup = backups[0];
    const key = latestBackup.Key;
    const downloadPath = path.join(backupFolder, path.basename(key));
    const decryptedPath = downloadPath.replace('.enc', '-decrypted.sql');

    const getObjectCommand = new GetObjectCommand({
        Bucket: s3Bucket,
        Key: key
    });

    const data = await s3.send(getObjectCommand);
    const writeStream = fs.createWriteStream(downloadPath);

    await new Promise((resolve, reject) => {
        data.Body.pipe(writeStream)
            .on('finish', resolve)
            .on('error', reject);
    });

    console.log('📥 Downloaded latest encrypted backup:', downloadPath);

    decryptBackup(downloadPath, decryptedPath);
};

const generateLatestBackupDownloadUrl = async () => {
    const listCommand = new ListObjectsV2Command({
        Bucket: s3Bucket,
        Prefix: 'backups/'
    });

    const listResult = await s3.send(listCommand);
    const backups = listResult.Contents || [];

    if (backups.length === 0) {
        throw new Error('No backups found in S3.');
    }

    backups.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
    const latestBackup = backups[0];

    const getObjectParams = {
        Bucket: s3Bucket,
        Key: latestBackup.Key
    };

    const command = new GetObjectCommand(getObjectParams);

    // Pre-signed URL valid for 10 minutes (600 seconds)
    const url = await getSignedUrl(s3, command, { expiresIn: 600 });

    return url;
};

module.exports = {
    generateBackup,
    decryptBackup,
    deleteOldBackups,
    downloadAndDecryptLatestBackup,
    generateLatestBackupDownloadUrl
};


