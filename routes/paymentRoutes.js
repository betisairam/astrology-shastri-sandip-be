const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/payment:
 *   get:
 *     summary: Get all payments of the logged-in user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   razorpay_order_id:
 *                     type: string
 *                   razorpay_payment_id:
 *                     type: string
 *                   amount:
 *                     type: integer
 *                     example: 49900
 *                   status:
 *                     type: string
 *                     enum: [created, paid, failed]
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, paymentController.getMyPayments);

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create Razorpay order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 499
 *     responses:
 *       200:
 *         description: Razorpay order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: order_9A33XWu170gUtm
 *                 amount:
 *                   type: integer
 *                   example: 49900
 *                 currency:
 *                   type: string
 *                   example: INR
 *                 receipt:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/create-order', auth, paymentController.createOrder);

/**
 * @swagger
 * /api/payment/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [razorpay_order_id, razorpay_payment_id, razorpay_signature]
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Payment verified ✅
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Server error
 */
router.post('/verify', paymentController.verifyPayment);

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Razorpay webhook endpoint
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Webhook event payload from Razorpay
 *     responses:
 *       200:
 *         description: Webhook processed
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Server error
 */
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.razorpayWebhook);

/**
 * @swagger
 * /api/payment/webhook/logs:
 *   get:
 *     summary: View recent Razorpay webhook logs
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of webhook logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   event_type:
 *                     type: string
 *                   razorpay_order_id:
 *                     type: string
 *                   razorpay_payment_id:
 *                     type: string
 *                   payload:
 *                     type: object
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get('/webhook/logs', auth, paymentController.getWebhookLogs);

module.exports = router;
