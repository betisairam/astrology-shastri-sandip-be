exports.up = async function (knex) {
    // Add columns if they do not exist
    await knex.raw(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='services' AND column_name='is_active'
        ) THEN
          ALTER TABLE services ADD COLUMN is_active boolean DEFAULT true;
        END IF;
  
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='services' AND column_name='recommended'
        ) THEN
          ALTER TABLE services ADD COLUMN recommended boolean DEFAULT false;
        END IF;
  
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='services' AND column_name='deleted_at'
        ) THEN
          ALTER TABLE services ADD COLUMN deleted_at timestamptz NULL;
        END IF;
      END$$;
    `);
};

exports.down = async function (knex) {
    // You can safely drop these columns on rollback
    await knex.schema.table('services', table => {
        table.dropColumn('is_active');
        table.dropColumn('recommended');
        table.dropColumn('deleted_at');
    });
};
