const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(subject, body) {
    try {
        await transporter.sendMail({
            from: `"Backup Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject,
            text: body,
        });
        console.log(`[+] Notification sent: ${subject}`);
    } catch (err) {
        console.error(`[x] Failed to send email:`, err.message);
    }
}

module.exports = sendEmail;
