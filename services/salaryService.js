const db = require('../db/knex');
const dayjs = require('dayjs');
const logger = require('../utils/logger');

exports.calculateAndStoreMonthlySalaries = async (monthDate) => {
    const month = dayjs(monthDate).startOf('month').format('YYYY-MM-DD');

    const trx = await db.transaction();

    try {
        // 1. Get all eligible employees
        const roleIds = await trx('roles')
            .whereIn('name', ['super_admin', 'admin', 'employee'])
            .pluck('id');

        const employees = await trx('users')
            .whereIn('role_id', roleIds)
            .select('*');


        // 2. Total income (for now we mock it or sum payments table if exists)
        const totalIncome = 1000000; // Replace with real income calc if needed

        // 3. Total expenses for the month
        const expenses = await trx('expenses')
            .whereRaw(`date_trunc('month', created_at) = ?`, [month]);
        const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

        const availableProfit = totalIncome - totalExpenses;

        logger.info(`💰 Available profit for ${month}: ₹${availableProfit}`);

        const equityShares = await trx('equity_shares');

        // 4. Build salary records
        const salaries = employees.map(emp => {
            let finalSalary = 0;
            let baseSalary = 0;
            let equityAdj = 0;

            if (emp.salary_type === 'fixed') {
                finalSalary = baseSalary = parseFloat(emp.fixed_salary || 0);
            } else if (emp.salary_type === 'equity') {
                const equity = equityShares.find(e => e.user_id === emp.id);
                if (equity) {
                    equityAdj = (availableProfit * parseFloat(equity.percentage || 0)) / 100;
                    finalSalary = equityAdj;
                }
            }

            return {
                user_id: emp.id,
                base_salary: baseSalary,
                equity_adjustment: equityAdj,
                final_salary: finalSalary,
                month,
                status: 'pending',
                created_at: new Date(),
                updated_at: new Date(),
            };
        });

        // 5. Insert salaries
        await trx('salaries').insert(salaries);
        await trx.commit();

        logger.info(`✅ Salary records created for ${salaries.length} employees`);
        return salaries;

    } catch (err) {
        await trx.rollback();
        logger.error('❌ Salary calculation failed', err);
        throw err;
    }
};

exports.approveSalary = async (salaryId, adminId) => {
    return await db('salaries')
        .where({ id: salaryId, status: 'pending' })
        .update({
            status: 'approved',
            approved_by: adminId,
            approved_at: new Date()
        });
};

exports.getAll = () => db('salaries').select('*');

exports.getById = id => db('salaries').where({ id }).first();

exports.create = data => db('salaries').insert(data).returning('*').then(rows => rows[0]);

exports.update = (id, data) => db('salaries').where({ id }).update(data).returning('*').then(rows => rows[0]);

exports.remove = id => db('salaries').where({ id }).del();
