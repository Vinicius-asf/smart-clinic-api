
exports.up = function(knex) {
    return knex.schema.table('patient', table => {
        table.timestamp('birth_date');
        table.string('weight');
        table.string('height');
    });
};

exports.down = function(knex) {
    return knex.schema.table('patient', table => {
        table.dropColumn('birth_date');
        table.dropColumn('weight');
        table.dropColumn('height');
    });
};
