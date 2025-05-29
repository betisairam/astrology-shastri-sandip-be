const express = require('express');
const router = express.Router();
const controller = require('../controllers/countryController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all active countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: List of countries
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/countries/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country object
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/countries:
 *   post:
 *     summary: Create a country (super_admin only)
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/countries/{id}:
 *   put:
 *     summary: Update a country (super_admin only)
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', auth, controller.update);

/**
 * @swagger
 * /api/countries/{id}:
 *   delete:
 *     summary: Soft delete a country (super_admin only)
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', auth, controller.remove);

/**
 * @swagger
 * /api/countries/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted country (super_admin only)
 *     tags: [Countries]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id/restore', auth, controller.restore);

module.exports = router;
