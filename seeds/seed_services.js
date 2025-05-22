const { rawServices } = require('./initial-services-data.js'); // adjust path

const services = rawServices.en.services;
const serviceEntries = Object.entries(services).filter(([key]) =>
  !['title', 'subtitle', 'all', 'filter', 'viewAll', 'bookNow', 'categories'].includes(key)
);

exports.seed = async function (knex) {
  await knex('services').del();

  const records = serviceEntries.map(([key, data]) => ({
    key,
    title: data.title,
    content: data.content,
    price: data.price,
    actual_price: data.actualPrice,
    cta: data.cta,
    delivery_days: data.deliveryDays,
    delivery_time: data.deliveryTime,
    format: data.format,
    best_for: data.bestFor,
    type: data.type,
    features: data.features,
    created_at: new Date(),
    updated_at: new Date()
  }));

  return knex('services').insert(records);
};
