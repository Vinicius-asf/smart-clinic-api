exports.up = function (knex) {
    return knex.schema.createTable('appointment', table => {
        table.increments('appointment_id');
        table.string('patient_email').notNull();
        table.foreign('patient_email').references('patient.email').onDelete('RESTRICT');
        table.integer('clinic_id').notNull();
        table.foreign('clinic_id').references('clinic.clinic_id').onDelete('RESTRICT');
        table.string('credential').notNull();
        table.foreign('credential').references('healthcare_professional.credential').onDelete('RESTRICT');
        table.string('notes', 3000);
        table.string('appointment_notes', 3000);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('appointment');
};