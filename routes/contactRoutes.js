const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { contactSchema, contactStatusUpdateSchema, contactReplySchema } = require('../utils/validateInput');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Customer contact form submissions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - mobileNumber
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: Sairam Beti
 *         email:
 *           type: string
 *           format: email
 *           example: sairambeti@gmail.com
 *         mobileNumber:
 *           type: string
 *           example: "7405469689"
 *         description:
 *           type: string
 *           example: I’m interested in learning more about your services. Please get in touch with me at your earliest convenience.
 *         website:
 *           type: string
 *           example: ""
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

/**
 * @swagger
 * /api/contacts/{id}/reply:
 *   patch:
 *     summary: Send a reply email to the contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Re: Your Inquiry"
 *               message:
 *                 type: string
 *                 example: "Thanks for reaching out, we'll contact you shortly."
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.patch(
    '/:id/reply',
    auth,
    validate(contactReplySchema),
    contactController.replyToContact
);

module.exports = router;
