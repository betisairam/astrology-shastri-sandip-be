// utils/lang.js

/**
 * Safely returns the value for the requested language,
 * or falls back to 'en', or an empty string.
 * @param {Object} field - JSONB field like name, message etc.
 * @param {string} lang - language code (e.g., 'en', 'hi')
 * @returns {string}
 */
function safeLang(field, lang = 'en') {
    return field?.[lang] || field?.en || '';
}

module.exports = { safeLang };
