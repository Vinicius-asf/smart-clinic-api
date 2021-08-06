exports.up = function (knex) {
    return knex.schema.createTable('professional_area', table => {
        table.string('credential').notNull();
        table.foreign('credential').references('healthcare_professional.credential').onDelete('RESTRICT');
        table.integer('area_id').notNull();
        table.foreign('area_id').references('area.area_id').onDelete('RESTRICT');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('professional_area');
};