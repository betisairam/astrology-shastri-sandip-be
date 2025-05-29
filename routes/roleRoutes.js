const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const auth = require('../middlewares/authMiddleware');

// Swagger tags: Roles

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all active roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get('/', auth, roleController.getAll);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created
 */
router.post('/', auth, roleController.create);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated
 */
router.put('/:id', auth, roleController.update);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Soft delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Role soft deleted
 */
router.delete('/:id', auth, roleController.remove);

/**
 * @swagger
 * /api/roles/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Role restored
 */
router.patch('/:id/restore', auth, roleController.restore);

module.exports = router;
