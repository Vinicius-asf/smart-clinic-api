
exports.up = function (knex) {
    return knex.schema.createTable('area', table => {
        table.increments('area_id');
        table.string('area').notNull();
        table.string('profession').notNull();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('area');
};