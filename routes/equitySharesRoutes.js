const express = require('express');
const router = express.Router();
const controller = require('../controllers/equitySharesController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/equity-shares:
 *   get:
 *     summary: Get all equity shares
 *     tags: [Equity Shares]
 */
router.get('/', auth, controller.getAll);

/**
 * @swagger
 * /api/equity-shares/{id}:
 *   get:
 *     summary: Get equity share by ID
 *     tags: [Equity Shares]
 */
router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /api/equity-shares:
 *   post:
 *     summary: Create equity share
 *     tags: [Equity Shares]
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /api/equity-shares/{id}:
 *   patch:
 *     summary: Update equity share
 *     tags: [Equity Shares]
 */
router.patch('/:id', auth, controller.update);

/**
 * @swagger
 * /api/equity-shares/{id}:
 *   delete:
 *     summary: Delete equity share
 *     tags: [Equity Shares]
 */
router.delete('/:id', auth, controller.remove);

module.exports = router;
