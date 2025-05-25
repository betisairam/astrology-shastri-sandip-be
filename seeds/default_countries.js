exports.seed = async function (knex) {
  await knex('countries').del();

  await knex('countries').insert([
    { name: 'India', code: 'IN', currency_symbol: '₹', is_default: false },
    { name: 'United States', code: 'US', currency_symbol: '$', is_default: true }, // 👑 Default
    { name: 'United Kingdom', code: 'UK', currency_symbol: '£', is_default: false },
    { name: 'Canada', code: 'CA', currency_symbol: 'CA$', is_default: false },
    { name: 'United Arab Emirates', code: 'AE', currency_symbol: 'AED', is_default: false },
  ]);
};
