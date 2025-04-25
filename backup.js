const sendEmail = require('./emailService');

require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,
    BACKUP_FOLDER
} = process.env;

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

const BACKUP_DIR = path.join(__dirname, 'tmp_backups');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

async function createBackup() {
    const timestamp = dayjs.utc().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `${DB_NAME}_backup_${timestamp}.sql.gz`;
    const filepath = path.join(BACKUP_DIR, filename);

    const dumpCommand = `PGPASSWORD="${DB_PASSWORD}" pg_dump -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} ${DB_NAME} | gzip > ${filepath}`;

    console.log(`[+] Running backup command...`);
    exec(dumpCommand, async (error) => {
        if (error) {
            console.error(`Backup failed: ${error.message}`);
            return;
        }

        console.log(`[+] Backup created: ${filename}`);

        // Upload to S3
        const fileContent = fs.readFileSync(filepath);
        const s3Key = `${BACKUP_FOLDER}/${filename}`;
        const uploadParams = {
            Bucket: S3_BUCKET_NAME,
            Key: s3Key,
            Body: fileContent,
        };

        try {
            await s3.upload(uploadParams).promise();
            console.log(`[+] Uploaded to S3: ${s3Key}`);
            fs.unlinkSync(filepath);
        } catch (err) {
            console.error(`S3 upload failed: ${err.message}`);
        }
    });
}

async function deleteOldBackups() {
    try {
        const list = await s3
            .listObjectsV2({ Bucket: S3_BUCKET_NAME, Prefix: `${BACKUP_FOLDER}/` })
            .promise();

        const now = dayjs.utc();
        for (const obj of list.Contents) {
            const lastModified = dayjs(obj.LastModified);
            if (now.diff(lastModified, 'day') > 30) {
                await s3
                    .deleteObject({ Bucket: S3_BUCKET_NAME, Key: obj.Key })
                    .promise();
                console.log(`[-] Deleted old backup: ${obj.Key}`);
            }
        }
    } catch (err) {
        console.error(`Error deleting old backups: ${err.message}`);
    }
}

async function runBackupProcess() {
    try {
        await createBackup();
        await deleteOldBackups();
        await sendEmail('✅ PostgreSQL Backup Success', `Backup for ${DB_NAME} completed successfully at ${new Date().toISOString()}`);
    } catch (err) {
        console.error(err);
        await sendEmail('❌ PostgreSQL Backup Failed', `An error occurred during backup: ${err.message}`);
    }
}