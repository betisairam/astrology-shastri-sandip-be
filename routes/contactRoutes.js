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
router.post('/', validate(contactSchema), contactController.createContact);

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Manage contact form submissions
 * /api/contacts:
 *   get:
 *     summary: Get all contact submissions (admin only)
 *     tags: [Contacts]
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
 *         description: Search contacts by name or email (case-insensitive)
 *     responses:
 *       200:
 *         description: List of contact records with pagination
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
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       mobileNumber:
 *                         type: string
 *                         example: 9876543210
 *                       description:
 *                         type: string
 *                         example: Looking for a consultation
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
 *                       example: 53
 *                     page:
 *                       type: integer
 *                       example: 2
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 6
 *       403:
 *         description: Forbidden - only admins may access this route
 *       500:
 *         description: Server error
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

const { contactStatusUpdateSchema } = require('../utils/validateInput');

/**
 * @swagger
 * /api/contacts/{id}/status:
 *   put:
 *     summary: Update contact status
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the contact
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
    validate(contactStatusUpdateSchema),
    contactController.updateStatus
);

module.exports = router;
