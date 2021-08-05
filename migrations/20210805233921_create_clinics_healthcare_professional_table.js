exports.up = function (knex) {
    return knex.schema.createTable('clinics_healthcare_professional', table => {
        table.integer('clinic_id').notNull();
        table.foreign('clinic_id').references('clinic.clinic_id').onDelete('RESTRICT');
        table.string('credential').notNull();
        table.foreign('credential').references('healthcare_professional.credential').onDelete('RESTRICT');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('clinics_healthcare_professional');
};