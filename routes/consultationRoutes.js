const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultationController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { consultationSchema, consultationStatusUpdateSchema } = require('../utils/validateInput');
const consultationController = require('../controllers/consultationController');

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
 *     summary: Get all consultations
 *     tags: [Consultations]
 *     security: [ bearerAuth: [] ]
 *     responses:
 *       200:
 *         description: Success
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
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the consultation
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
 *                 enum:
 *                   - pending
 *                   - responded
 *                   - not_picking_up
 *                   - meeting_scheduled
 *                   - scam_user
 *                   - rejected
 *     responses:
 *       200:
 *         description: Status updated
 */
router.put(
    '/:id/status',
    auth,
    validate(consultationStatusUpdateSchema),
    consultationController.updateStatus
);


module.exports = router;
