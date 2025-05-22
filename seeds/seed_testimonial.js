const { testimonialData } = require('./testimonial-data.js'); // adjust path if needed

exports.seed = async function (knex) {
    // Clear existing data
    await knex('testimonials').del();

    // Map input data to DB format
    const records = testimonialData.map((data) => ({
        name: {
            en: data.name,
            hi: data.name, // Same name in both unless specified otherwise
        },
        message: {
            en: data.text,
            hi: data.textHi || null,
        },
        designation: {
            en: data.category || '',
            hi: data.category || '',
        },
        location: {
            en: data.location || '',
            hi: data.location || '',
        },
        rating: data.rating || null,
        category: data.category || null, // If you want to store separately as string
        featured: data.featured || false,
        image: null, // Placeholder, update if images are available
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    }));

    // Insert all records
    return knex('testimonials').insert(records);
};
