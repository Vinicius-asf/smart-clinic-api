
exports.up = function(knex) {
    return knex.schema.table('appointment', table => {
        table.integer('speciality_id');
    });
};

exports.down = function(knex) {
    return knex.schema.table('appointment', table => {
        table.dropColumn('speciality_id');
    });
};
