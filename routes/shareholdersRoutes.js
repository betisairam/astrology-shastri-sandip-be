const express = require('express');
const router = express.Router();
const controller = require('../controllers/shareholdersController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/shareholders:
 *   get:
 *     summary: Get all shareholders
 *     tags: [Shareholders]
 */
router.get('/', auth, controller.getAll);

/**
 * @swagger
 * /api/shareholders/{id}:
 *   get:
 *     summary: Get shareholder by ID
 *     tags: [Shareholders]
 */
router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /api/shareholders:
 *   post:
 *     summary: Create shareholder
 *     tags: [Shareholders]
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/shareholders/{id}:
 *   patch:
 *     summary: Update shareholder
 *     tags: [Shareholders]
 */
router.patch('/:id', auth, controller.update);

/**
 * @swagger
 * /api/shareholders/{id}:
 *   delete:
 *     summary: Delete shareholder
 *     tags: [Shareholders]
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
