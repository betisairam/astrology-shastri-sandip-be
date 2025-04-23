const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

exports.toCustomer = (to, message) =>
    transporter.sendMail({
        to,
        from: process.env.MAIL_USER,
        subject: 'We received your contact form!',
        text: message
    });

exports.toAdmin = (subject, data) =>
    transporter.sendMail({
        to: process.env.ADMIN_EMAIL,
        from: process.env.MAIL_USER,
        subject,
        html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
    });
