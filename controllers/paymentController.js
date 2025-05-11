const crypto = require('crypto');
const { createOrder } = require('../services/razorpayService');
const db = require('../db/knex');
const { sendWebhookAlert } = require('../services/emailService');

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const receiptId = `rcpt_${Date.now()}`;

        const order = await createOrder(amount, receiptId);

        // Save order to DB
        await db('payments').insert({
            user_id: req.user.id, // comes from auth middleware
            razorpay_order_id: order.id,
            amount,
            status: 'created'
        });

        res.json(order);
    } catch (error) {
        console.error('❌ Failed to create Razorpay order:', error.message);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        // ✅ Update payment in DB
        await db('payments')
            .where({ razorpay_order_id })
            .update({
                razorpay_payment_id,
                razorpay_signature,
                status: 'paid',
                updated_at: new Date()
            });

        return res.json({ status: 'Payment verified ✅' });
    } else {
        // ❌ Signature mismatch
        await db('payments')
            .where({ razorpay_order_id })
            .update({
                status: 'failed',
                updated_at: new Date()
            });

        return res.status(400).json({ error: 'Invalid signature ❌' });
    }
};


exports.getMyPayments = async (req, res) => {
    const payments = await db('payments')
        .where({ user_id: req.user.id })
        .orderBy('created_at', 'desc');

    res.json(payments);
};

exports.razorpayWebhook = async (req, res) => {
    const crypto = require('crypto');
    const db = require('../db/knex');

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(req.body.toString('utf8'))
        .digest('hex');

    if (receivedSignature !== expectedSignature) {
        console.warn('❌ Webhook signature mismatch');
        return res.status(400).send('Invalid signature');
    }

    const event = JSON.parse(req.body.toString('utf8'));
    const payload = event.payload || {};

    console.log(`📥 Webhook received: ${event.event}`);

    try {
        await db('webhook_logs').insert({
            event_type: event.event,
            razorpay_order_id: payload?.payment?.entity?.order_id || null,
            razorpay_payment_id: payload?.payment?.entity?.id || null,
            payload: event
        });

        await sendWebhookAlert({
            event: event.event,
            orderId: payload?.payment?.entity?.order_id || 'N/A',
            paymentId: payload?.payment?.entity?.id || 'N/A',
            amount: payload?.payment?.entity?.amount || 0
        });

        switch (event.event) {
            case 'payment.captured':
                const paymentId = payload.payment.entity.id;
                const orderId = payload.payment.entity.order_id;

                await db('payments')
                    .where({ razorpay_order_id: orderId })
                    .update({
                        razorpay_payment_id: paymentId,
                        status: 'paid',
                        updated_at: new Date()
                    });

                console.log(`✅ Payment captured: ${paymentId}`);
                break;

            case 'payment.failed':
                await db('payments')
                    .where({ razorpay_order_id: payload.payment.entity.order_id })
                    .update({
                        status: 'failed',
                        updated_at: new Date()
                    });

                console.warn(`❌ Payment failed: ${payload.payment.entity.id}`);
                break;

            case 'refund.processed':
                // Optional: add refund table or update status here
                console.log(`💸 Refund processed for: ${payload.refund.entity.payment_id}`);
                break;

            default:
                console.log('ℹ️ Unhandled webhook:', event.event);
        }

        res.status(200).send('Webhook processed');
    } catch (err) {
        console.error('❌ Webhook processing failed:', err.message);
        res.status(500).send('Webhook error');
    }
};

exports.getWebhookLogs = async (req, res) => {
    const logs = await db('webhook_logs').orderBy('created_at', 'desc').limit(50);
    res.json(logs);
};
