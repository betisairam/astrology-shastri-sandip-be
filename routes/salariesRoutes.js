const express = require('express');
const router = express.Router();
const controller = require('../controllers/salaryController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/salaries:
 *   get:
 *     summary: Get all salary records
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, controller.getAll);

/**
 * @swagger
 * /api/salaries/{id}:
 *   get:
 *     summary: Get salary by ID
 *     tags: [Salaries]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /api/salaries:
 *   post:
 *     summary: Create salary
 *     tags: [Salaries]
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/salaries/{id}:
 *   put:
 *     summary: Update salary
 *     tags: [Salaries]
 */
router.put('/:id', auth, controller.update);

/**
 * @swagger
 * /api/salaries/{id}:
 *   delete:
 *     summary: Delete salary
 *     tags: [Salaries]
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
