const { rawServices } = require('../mock-data/new-initial-services-data'); // adjust path

// Prepare English and Hindi service entries
const enServices = Object.entries(rawServices.en.services).filter(([key]) =>
  !['title', 'subtitle', 'all', 'filter', 'viewAll', 'bookNow', 'categories'].includes(key)
);
const hiServices = Object.entries(rawServices.hi.services).filter(([key]) =>
  !['title', 'subtitle', 'all', 'filter', 'viewAll', 'bookNow', 'categories'].includes(key)
);

// Create a map of Hindi services for lookup
const hiServiceMap = new Map(hiServices.map(([key, data]) => [key, data]));

exports.seed = async function (knex) {
  // Clear existing data
  await knex('service_prices').del();
  await knex('services').del();

  // Fetch countries and map code to ID
  const countries = await knex('countries').select('id', 'code');
  const countryCodeToIdMap = new Map(countries.map(({ code, id }) => [code.toUpperCase(), id]));

  const serviceRecords = [];
  const priceRecords = [];

  for (const [key, enData] of enServices) {
    const hiData = hiServiceMap.get(key);

    const title = { en: enData.title };
    const content = { en: enData.content };
    const cta = { en: enData.cta };
    const features = { en: enData.features };

    if (hiData) {
      title.hi = hiData.title;
      content.hi = hiData.content;
      cta.hi = hiData.cta;
      features.hi = hiData.features;
    }

    const serviceRecord = {
      key,
      title: JSON.stringify(title),
      content: JSON.stringify(content),
      cta: JSON.stringify(cta),
      features: JSON.stringify(features),
      delivery_days: enData.deliveryDays,
      delivery_time: enData.deliveryTime,
      format: enData.format,
      best_for: enData.bestFor,
      type: hiData && key === 'money-leakage' ? hiData.type : enData.type,
      is_active: true,
      recommended: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    serviceRecords.push(serviceRecord);

    // Generate service price records per country
    Object.entries(enData.pricing).forEach(([country_code, pricing]) => {
      const code = country_code === 'default' ? 'DF' : country_code.toUpperCase();
      const country_id = countryCodeToIdMap.get(code);
      if (!country_id) {
        console.warn(`Skipping price for unknown country code: ${code}`);
        return;
      }

      priceRecords.push({
        service_key: key,
        country_id,
        price: parsePrice(pricing.price),
        actual_price: parsePrice(pricing.actualPrice),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  }

  // Insert services and get their IDs
  const insertedServices = await knex('services')
    .insert(serviceRecords)
    .returning(['id', 'key']);

  const serviceIdMap = new Map(insertedServices.map(({ id, key }) => [key, id]));

  // Finalize price records with service IDs
  const finalPriceRecords = priceRecords.map((record) => ({
    service_id: serviceIdMap.get(record.service_key),
    country_id: record.country_id,
    price: record.price,
    actual_price: record.actual_price,
    is_active: record.is_active,
    created_at: record.created_at,
    updated_at: record.updated_at,
  }));

  // Insert price records
  await knex('service_prices').insert(finalPriceRecords);
};

// Helper function to infer currency
function inferCurrency(priceString) {
  if (priceString.includes('₹')) return 'INR';
  if (priceString.includes('$') && priceString.includes('CAD')) return 'CAD';
  if (priceString.includes('$')) return 'USD';
  if (priceString.includes('£')) return 'GBP';
  if (priceString.includes('AED')) return 'AED';
  return 'INR';
}

// Helper function to parse price
function parsePrice(priceString) {
  const numericValue = parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
  return Number(numericValue.toFixed(2));
}
