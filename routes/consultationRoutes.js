const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultationController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { consultationSchema } = require('../utils/validateInput');

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
router.post('/', validate(consultationSchema), controller.createConsultation);

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

module.exports = router;
