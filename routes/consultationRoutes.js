const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultationController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { consultationSchema, consultationStatusUpdateSchema } = require('../utils/validateInput');
const consultationController = require('../controllers/consultationController');
const rateLimiter = require('../middlewares/rateLimiter');


/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: Customer consultation form
 */

/**
 * @swagger
 * /api/consultations:
 *   post:
 *     summary: Submit consultation form
 *     tags: [Consultations]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consultation'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', rateLimiter, validate(consultationSchema), controller.createConsultation);

/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: Manage consultation requests
 * /api/consultations:
 *   get:
 *     summary: Get all consultations (admin only)
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search consultations by name, email, subject or notes (case-insensitive)
 *     responses:
 *       200:
 *         description: List of consultation records with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 201
 *                       name:
 *                         type: string
 *                         example: Alice Smith
 *                       email:
 *                         type: string
 *                         example: alice@example.com
 *                       subject:
 *                         type: string
 *                         example: Business strategy
 *                       notes:
 *                         type: string
 *                         example: Looking to scale operations in Q3
 *                       status:
 *                         type: string
 *                         example: pending
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *       403:
 *         description: Forbidden - only admins may access this route
 *       500:
 *         description: Server error
 */
router.get('/', auth, controller.getAllConsultations);

/**
 * @swagger
 * /api/consultations/{id}:
 *   delete:
 *     summary: Soft delete consultation
 *     tags: [Consultations]
 *     security: [ bearerAuth: [] ]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', auth, controller.deleteConsultation);

/**
 * @swagger
 * /api/consultations/{id}/status:
 *   put:
 *     summary: Update consultation status
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Consultation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, responded, not_picking_up, meeting_scheduled, scam_user, rejected]
 *     responses:
 *       200:
 *         description: Consultation status updated
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Only admins allowed
 *       404:
 *         description: Consultation not found
 *       500:
 *         description: Server error
 */
router.put(
    '/:id/status',
    auth,
    validate(consultationStatusUpdateSchema),
    consultationController.updateStatus
);


module.exports = router;
