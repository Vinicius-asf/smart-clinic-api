
exports.up = function(knex) {
    return knex.schema.table('appointment', table => {
        table.timestamp('appointment_date').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.table('appointment', table => {
        table.dropColumn('appointment_date');
    });
};
