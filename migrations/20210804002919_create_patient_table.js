
exports.up = function (knex) {
    return knex.schema.createTable('patient', table => {
        table.string('email').primary();
        table.string('password').notNull();
        table.string('name').notNull();
        table.string('address');
        table.string('postal_code');
        table.string('city');
        table.string('state');
        table.string('country');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('patient');
};