/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management APIs
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, controller.getAll);

/**
 * @swagger
 * /api/services/all-countries:
 *   get:
 *     summary: Get all services with all country pricing (super_admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services with global country prices
 */
router.get('/global', auth, controller.getAllGlobal);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a single service by ID with price details
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Service ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single service object
 */
router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service (super_admin only)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               title:
 *                 type: object
 *                 example: { "en": "Love Problem" }
 *               content:
 *                 type: object
 *                 example: { "en": "Solve all love related issues..." }
 *               features:
 *                 type: object
 *                 example: { "en": ["Puja", "Astrology", "Consultation"] }
 *               prices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     country_id:
 *                       type: integer
 *                     price:
 *                       type: number
 *                     actual_price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Service created
 */
router.post('/', auth, controller.create);

router.patch('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);
router.patch('/:id/restore', auth, controller.restore);

module.exports = router;
