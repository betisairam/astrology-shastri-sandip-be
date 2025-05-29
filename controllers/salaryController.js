const { sendSalarySlip } = require('../services/salaryEmailService');
const salaryService = require('../services/salaryService');
const logger = require('../utils/logger');

exports.markAsPaid = async (req, res) => {
    const { salaryId } = req.params;

    try {
        await db('salaries')
            .where({ id: salaryId })
            .update({
                status: 'paid',
                paid_on: new Date(),
                updated_at: new Date()
            });

        // 💸 Send salary slip
        await sendSalarySlip(salaryId);

        res.json({ message: 'Salary marked as paid and slip sent ✅' });
    } catch (err) {
        logger.error('❌ Failed to mark salary as paid', err);
        res.status(500).json({ error: 'Could not update salary' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const salaries = await salaryService.getAll();
        res.json(salaries);
    } catch (err) {
        logger.error('❌ Failed to fetch salaries', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const salary = await salaryService.getById(req.params.id);
        if (!salary) return res.status(404).json({ error: 'Not found' });
        res.json(salary);
    } catch (err) {
        logger.error('❌ Failed to fetch salary', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        const created = await salaryService.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        logger.error('❌ Salary creation failed', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await salaryService.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        logger.error('❌ Salary update failed', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.remove = async (req, res) => {
    try {
        await salaryService.remove(req.params.id);
        res.status(204).send();
    } catch (err) {
        logger.error('❌ Salary deletion failed', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
