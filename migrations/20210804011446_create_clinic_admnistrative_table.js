exports.up = function (knex) {
    return knex.schema.createTable('administrative', table => {
        table.increments('adm_id');
        table.integer('clinic_id').notNull();
        table.foreign('clinic_id').references('clinic.clinic_id').onDelete('RESTRICT');
        table.string('username').notNull();
        table.string('password').notNull();
        table.string('function');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('administrative');
};