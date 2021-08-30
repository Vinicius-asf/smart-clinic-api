
exports.up = function(knex) {
    return knex.schema.table('appointment', table => {
        table.integer('speciality_id');
        knex('appointment').update({speaciality_id: 1}).where('credential', 12345678);
        knex('appointment').update({speaciality_id: 6}).where('credential', 33033122);
    });
};

exports.down = function(knex) {
    return knex.schema.table('appointment', table => {
        table.dropColumn('speciality_id');
    });
};
