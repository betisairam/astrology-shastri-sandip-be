const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Testimonials
 *     description: Testimonial API with multi-language support
 */

/**
 * @swagger
 * /api/testimonials/all:
 *   get:
 *     summary: Get all active, non-deleted testimonials
 *     tags:
 *       - Testimonials
 *     responses:
 *       200:
 *         description: List of testimonial objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: object
 *                     properties:
 *                       en:
 *                         type: string
 *                       hi:
 *                         type: string
 *                   message:
 *                     type: object
 *                     properties:
 *                       en:
 *                         type: string
 *                       hi:
 *                         type: string
 *                   designation:
 *                     type: object
 *                     properties:
 *                       en:
 *                         type: string
 *                       hi:
 *                         type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       en:
 *                         type: string
 *                       hi:
 *                         type: string
 *                   rating:
 *                     type: integer
 *                   category:
 *                     type: string
 *                   featured:
 *                     type: boolean
 *                   image:
 *                     type: string
 *                   is_active:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get('/all', testimonialController.getAllPaginated);

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all active testimonials
 *     tags:
 *       - Testimonials
 *     parameters:
 *       - name: lang
 *         in: query
 *         description: Language code (e.g. 'en', 'hi')
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of localized testimonials
 */
router.get('/', testimonialController.getAllByLang);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   get:
 *     summary: Get testimonial by ID
 *     tags:
 *       - Testimonials
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Full testimonial object
 *       404:
 *         description: Not found
 */
router.get('/:id', testimonialController.getById);

/**
 * @swagger
 * /api/testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - message
 *             properties:
 *               name:
 *                 type: object
 *                 example: { "en": "John", "hi": "जॉन" }
 *               message:
 *                 type: object
 *                 example: { "en": "This is great", "hi": "बहुत अच्छा" }
 *               designation:
 *                 type: object
 *                 example: { "en": "CEO", "hi": "सीईओ" }
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testimonial created
 */
router.post('/', testimonialController.create);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   patch:
 *     summary: Update testimonial
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: object
 *                 example: { "en": "Updated", "hi": "अपडेटेड" }
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 */
router.patch('/:id', auth, testimonialController.update);

/**
 * @swagger
 * /api/testimonials/{id}:
 *   delete:
 *     summary: Soft delete testimonial
 *     tags:
 *       - Testimonials
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Soft deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/:id', auth, testimonialController.softDelete);


module.exports = router;