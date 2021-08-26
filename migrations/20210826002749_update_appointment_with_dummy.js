exports.up = function(knex) {
    return knex.schema.table('appointment', table => {
        table.bool('real_appointment').defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('appointment', table => {
        table.dropColumn('real_appointment');
    });
};
