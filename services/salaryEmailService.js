const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');
const moment = require('moment');
const db = require('../db/knex');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendSalarySlip = async (salaryId) => {
    try {
        const salary = await db('salaries')
            .join('users', 'salaries.user_id', '=', 'users.id')
            .select(
                'salaries.*',
                'users.email as userEmail',
                'users.name as userName',
                'users.mobileNumber'
            )
            .where('salaries.id', salaryId)
            .first();

        if (!salary) throw new Error('Salary not found');

        const pdfBytes = await generatePdf(salary);
        const fileName = `salary-slip-${salary.user_id}-${salary.month}.pdf`;
        const filePath = path.join(__dirname, '..', 'backups', fileName);
        fs.writeFileSync(filePath, pdfBytes);

        const passwordHint = salary.mobileNumber.slice(-4); // last 4 digits

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: salary.userEmail,
            subject: `Salary Slip for ${moment(salary.month).format('MMMM YYYY')}`,
            text: `Hi ${salary.userName},\n\nAttached is your salary slip.\nPassword: last 4 digits of your mobile number.`,
            attachments: [
                {
                    filename: fileName,
                    path: filePath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        logger.info(`📤 Salary slip sent to ${salary.userEmail}`);
    } catch (err) {
        logger.error('❌ Failed to send salary slip', err);
        throw err;
    }
};

async function generatePdf(salary) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const draw = (text, y) => page.drawText(text, { x: 50, y, size: 12, font });

    draw(`Salary Slip - ${moment(salary.month).format('MMMM YYYY')}`, height - 50);
    draw(`Name: ${salary.userName}`, height - 100);
    draw(`Email: ${salary.userEmail}`, height - 120);
    draw(`Base Salary: ₹${salary.base_salary}`, height - 140);
    draw(`Equity Adj.: ₹${salary.equity_adjustment}`, height - 160);
    draw(`Final Salary: ₹${salary.final_salary}`, height - 180);
    draw(`Status: ${salary.status}`, height - 200);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
