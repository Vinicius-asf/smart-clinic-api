exports.up = function (knex) {
    return knex.schema.createTable('professional_speciality', table => {
        table.string('credential').notNull();
        table.foreign('credential').references('healthcare_professional.credential').onDelete('RESTRICT');
        table.integer('speciality_id').notNull();
        table.foreign('speciality_id').references('speciality.speciality_id').onDelete('RESTRICT');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('professional_speciality');
};