
exports.up = function(knex) {
    return knex.schema.table('appointment', table => {
        table.date('appointment_date').notNull();
        table.time('appointment_time').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.table('appointment', table => {
        table.dropColumn('appointment_date');
        table.dropColumn('appointment_time');
    });
};
