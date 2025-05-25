const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.toCustomer = (to, message) =>
  transporter.sendMail({
    to,
    from: process.env.EMAIL_USER,
    subject: 'We received your contact form!',
    text: message
  });

exports.toAdmin = (subject, data) =>
  transporter.sendMail({
    to: process.env.ADMIN_EMAIL,
    from: process.env.EMAIL_USER,
    subject,
    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
  });

// Send Email
exports.sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject,
    text,
    html
  };

  await transporter.sendMail(mailOptions);
};

// 💬 Reply to Contact
exports.replyToContact = async ({ to, name, subject, message }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial,sans-serif;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" style="padding: 30px 0;">
              <table style="max-width:600px; background:#fff; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.05);" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px; text-align:center;">
                    <img src="https://www.shastrisandip.com/logo.png" alt="Shastri Sandip Logo" style="height: 60px; margin-bottom: 20px;">
                    <h2 style="color:#1f2937;">Hello ${name || 'there'},</h2>
                    <p style="color:#374151; font-size: 16px; line-height: 1.6;">
                      ${message}
                    </p>
                    <p style="margin-top: 20px; font-size: 15px; color: #4b5563;">🙏 Thank you for reaching out to us.</p>
                    <hr style="margin: 30px 0; border:none; border-top:1px solid #e5e7eb;" />
                    <p style="color:#6b7280; font-size: 12px;">
                      This email was sent by Shastri Sandip Astrologer<br/>
                      <a href="https://www.shastrisandip.com" style="color:#3b82f6; text-decoration: none;">Visit our website</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  });
};
