const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { contactSchema } = require('../utils/validateInput');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Customer contact form submissions
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Submit contact form
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact submitted successfully
 */
router.post('/', auth, validate(contactSchema), contactController.createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact submissions
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts
 *       403:
 *         description: Forbidden
 */
router.get('/', auth, contactController.getAllContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Soft delete a contact (admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact soft-deleted
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;
