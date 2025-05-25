exports.up = async function (knex) {
    await knex.schema
        .createTable('faq_categories', (table) => {
            table.increments('id').primary();
            table.string('slug').notNullable().unique(); // e.g., "general"
        })
        .createTable('faq_questions', (table) => {
            table.increments('id').primary();
            table.integer('category_id').unsigned().references('id').inTable('faq_categories').onDelete('CASCADE');
            table.string('slug').notNullable().unique(); // e.g., "whatIsVedic"
        })
        .createTable('faq_translations', (table) => {
            table.increments('id').primary();
            table.integer('question_id').unsigned().references('id').inTable('faq_questions').onDelete('CASCADE');
            table.integer('category_id').unsigned().references('id').inTable('faq_categories').onDelete('CASCADE');
            table.string('locale', 10).notNullable(); // e.g., 'en', 'hi'
            table.string('category_title');
            table.string('question');
            table.text('answer');
            table.unique(['locale', 'question_id']);
        })
        .createTable('faq_meta', (table) => {
            table.increments('id').primary();
            table.string('locale', 10).notNullable().unique();
            table.string('title');
            table.string('subtitle');
            table.string('search_placeholder');
            table.string('search_aria_label');
            table.string('table_of_contents');
            table.string('no_results');
            table.string('clear_search');
            table.string('still_have_questions');
            table.text('contact_prompt');
            table.string('was_this_helpful');
            table.string('thank_you_feedback');
            table.string('need_more_help');
            table.string('related_questions');
            table.string('copy_link');
            table.string('copied');
        })
        .createTable('faq_feedback', (table) => {
            table.increments('id').primary();
            table.integer('question_id').unsigned().notNullable()
                .references('id').inTable('faq_questions')
                .onDelete('CASCADE');
            table.string('user_identifier'); // could be IP, UUID, session ID, etc.
            table.enum('feedback', ['like', 'dislike']).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.unique(['question_id', 'user_identifier']);
        });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('faq_meta')
        .dropTableIfExists('faq_translations')
        .dropTableIfExists('faq_questions')
        .dropTableIfExists('faq_categories')
        .dropTableIfExists('faq_feedback');
};
