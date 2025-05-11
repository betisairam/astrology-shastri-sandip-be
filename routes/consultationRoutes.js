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
 * /api/consultations:
 *   get:
 *     summary: Get all consultations (admin only)
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: List of consultations with pagination
 *       403:
 *         description: Forbidden
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
 *   patch:
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
