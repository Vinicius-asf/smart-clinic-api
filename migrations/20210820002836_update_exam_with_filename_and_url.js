
exports.up = function(knex) {
    return knex.schema.table('exam', table => {
        table.string('file_name').notNull();
        table.string('url').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.table('exam', table => {
        table.dropColumn('file_name');
        table.dropColumn('url');
    });
};
