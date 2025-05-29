const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { blogSchema } = require('../utils/validateInput');

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog post management
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: List blogs with filters
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [draft, published, scheduled] }
 *       - in: query
 *         name: tag
 *         schema: { type: string }
 *       - in: query
 *         name: author
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Blog list
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Blog post }
 */
router.get('/:slug', controller.getBySlug);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Blog' }
 *     responses:
 *       201: { description: Created }
 */
router.post('/', auth, validate(blogSchema), controller.create);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Blog' }
 *     responses:
 *       200: { description: Updated }
 */
router.put('/:id', auth, validate(blogSchema), controller.update);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Soft delete blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
