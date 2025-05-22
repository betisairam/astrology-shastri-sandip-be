const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const auth = require('../middlewares/authMiddleware'); // Optional for admin-only access

/**
 * @swagger
 * tags:
 *   - name: Services
 *     description: Service-related endpoints
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated list of services
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service object
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [key, title]
 *             properties:
 *               key:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: string
 *               actual_price:
 *                 type: string
 *               cta:
 *                 type: string
 *               delivery_days:
 *                 type: number
 *               delivery_time:
 *                 type: string
 *               format:
 *                 type: string
 *               best_for:
 *                 type: string
 *               type:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Service created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/services/{id}:
 *   patch:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Not found
 */
router.patch('/:id', auth, controller.update);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
