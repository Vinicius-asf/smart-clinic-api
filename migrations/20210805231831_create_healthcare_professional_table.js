exports.up = function (knex) {
    return knex.schema.createTable('healthcare_professional', table => {
        table.string('credential').primary();
        table.string('name').notNull();
        table.string('email').notNull().unique();
        table.string('password').notNull();
        table.string('profession').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
        table.timestamp('deleted_at');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('healthcare_professional');
};