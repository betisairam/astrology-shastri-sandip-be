const express = require('express');
const router = express.Router();
const controller = require('../controllers/salarySettingsController');
const auth = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validateMiddleware');
const { salarySettingsSchema } = require('../utils/validateInput');

/**
 * @swagger
 * tags:
 *   name: SalarySettings
 *   description: Manage salary calculation settings
 */

/**
 * @swagger
 * /api/salary-settings:
 *   get:
 *     summary: Get all salary settings
 *     tags: [SalarySettings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of salary settings
 */

/**
 * @swagger
 * /api/salary-settings:
 *   post:
 *     summary: Create new salary setting
 *     tags: [SalarySettings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               equity_salary_enabled:
 *                 type: boolean
 *               profit_threshold:
 *                 type: number
 *               base_multiplier:
 *                 type: number
 *             required:
 *               - equity_salary_enabled
 *               - profit_threshold
 *               - base_multiplier
 *           example:
 *             equity_salary_enabled: true
 *             profit_threshold: 10000.00
 *             base_multiplier: 1.25
 *     responses:
 *       201:
 *         description: Salary setting created
 */

/**
 * @swagger
 * /api/salary-settings/{id}:
 *   patch:
 *     summary: Update salary setting
 *     tags: [SalarySettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               equity_salary_enabled:
 *                 type: boolean
 *               profit_threshold:
 *                 type: number
 *               base_multiplier:
 *                 type: number
 *     responses:
 *       200:
 *         description: Salary setting updated
 */

/**
 * @swagger
 * /api/salary-settings/{id}:
 *   delete:
 *     summary: Delete a salary setting
 *     tags: [SalarySettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Salary setting deleted
 */
router.get('/', auth, controller.getAll);
router.post('/', auth, validate(salarySettingsSchema), controller.create);
router.patch('/:id', auth, validate(salarySettingsSchema), controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;
