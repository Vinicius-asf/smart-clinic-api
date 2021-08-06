exports.up = function (knex) {
    return knex.schema.createTable('exam', table => {
        table.increments('exam_id');
        table.string('patient_email').notNull();
        table.foreign('patient_email').references('patient.email').onDelete('RESTRICT');
        table.integer('appointment_id').notNull();
        table.foreign('appointment_id').references('appointment.appointment_id').onDelete('RESTRICT');
        table.string('type');
        table.string('exam_notes', 3000);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('exam');
};