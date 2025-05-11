const sendWebhookAlert = async ({ event, orderId, paymentId, amount }) => {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: process.env.NOTIFY_EMAIL_TO,
        subject: `🔔 Razorpay Webhook Received: ${event}`,
        text: `📬 Webhook Type: ${event}
  📦 Order ID: ${orderId}
  💸 Payment ID: ${paymentId}
  💰 Amount: ₹${(amount || 0) / 100}
  
  Time: ${new Date().toLocaleString()}
  `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('📧 Webhook alert email sent!');
    } catch (error) {
        console.error('❌ Failed to send webhook email alert:', error.message);
    }
};

module.exports = {
    sendWebhookAlert
};
