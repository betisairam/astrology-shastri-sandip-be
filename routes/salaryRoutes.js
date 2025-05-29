const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const salaryService = require('../services/salaryService');
const salaryController = require('../controllers/salaryController');
const logger = require('../utils/logger');

/**
 * @swagger
 * /api/salaries/generate:
 *   post:
 *     summary: Generate monthly salaries
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Target month for salary computation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - month
 *             properties:
 *               month:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-01"
 *     responses:
 *       200:
 *         description: Salary records created
 */
router.post('/generate', async (req, res) => {
    try {
        const { month } = req.body;

        if (!month) {
            return res.status(400).json({ error: 'Month is required (format: YYYY-MM-DD)' });
        }

        const results = await salaryService.calculateAndStoreMonthlySalaries(month);
        res.json({ message: `Salaries generated for ${month}`, data: results });
    } catch (err) {
        logger.error('❌ Salary generation failed', err);
        res.status(500).json({ error: 'Failed to generate salaries' });
    }
});


/**
 * @swagger
 * /api/salaries/{id}/approve:
 *   patch:
 *     summary: Approve a salary record
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Salary record ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Salary approved
 */
router.patch('/:id/approve', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const approverId = req.user.id;

        const updated = await salaryService.approveSalary(id, approverId);

        if (!updated) return res.status(404).json({ error: 'Salary not found or already approved' });

        res.json({ message: 'Salary approved' });
    } catch (err) {
        logger.error('❌ Salary approval failed', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/salaries/{salaryId}/mark-paid:
 *   post:
 *     summary: Mark salary as paid and send slip
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: salaryId
 *         in: path
 *         required: true
 *         description: ID of the salary to mark as paid
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Salary marked as paid and email sent
 *       403:
 *         description: Forbidden - only admin or super_admin can perform this action
 *       404:
 *         description: Salary not found
 *       500:
 *         description: Internal server error
 */
router.post('/:salaryId/mark-paid',    /* auth, requireRole('admin', 'super_admin'), */    salaryController.markAsPaid);

/**
 * @swagger
 * /api/salaries:
 *   get:
 *     summary: Get all salaries
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of salary records
 */
router.get('/', auth, salaryController.getAll);

/**
 * @swagger
 * /api/salaries/{id}:
 *   get:
 *     summary: Get salary by ID
 *     tags: [Salaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Salary detail }
 */
router.get('/:id', auth, salaryController.getById);

/**
 * @swagger
 * /api/salaries:
 *   post:
 *     summary: Create salary
 *     tags: [Salaries]
 */
router.post('/', auth, salaryController.create);

/**
 * @swagger
 * /api/salaries/{id}:
 *   patch:
 *     summary: Update salary
 *     tags: [Salaries]
 */
router.patch('/:id', auth, salaryController.update);

/**
 * @swagger
 * /api/salaries/{id}:
 *   delete:
 *     summary: Delete salary
 *     tags: [Salaries]
 */
router.delete('/:id', auth, salaryController.remove);

module.exports = router;
