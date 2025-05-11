const express = require('express');
const router = express.Router();
const controller = require('../controllers/translationController');
const auth = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /translations:
 *   get:
 *     summary: Get all translations
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema: { type: string }
 *       - in: query
 *         name: type
 *         schema: { type: string }
 *     responses:
 *       200: { description: Translations retrieved }
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /translations:
 *   post:
 *     summary: Bulk upload translations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required: [type, key, lang, value]
 *               properties:
 *                 type: { type: string }
 *                 key: { type: string }
 *                 lang: { type: string }
 *                 value: { type: object }
 *     responses:
 *       201: { description: Translations created }
 */
router.post('/', auth, controller.createBulk);

/**
 * @swagger
 * /translations/{id}:
 *   delete:
 *     summary: Soft delete translation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */
router.delete('/:id', auth, controller.softDelete);

module.exports = router;
