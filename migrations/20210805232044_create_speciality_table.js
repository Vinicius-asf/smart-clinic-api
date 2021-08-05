
exports.up = function (knex) {
    return knex.schema.createTable('speciality', table => {
        table.increments('speciality_id');
        table.string('speciality').notNull();
        table.string('profession').notNull();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('speciality');
};