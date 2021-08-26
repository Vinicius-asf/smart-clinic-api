
exports.up = function(knex) {
    return knex.schema.table('exam', table => {
        table.date('file_name').notNull();
        table.time('url').notNull();
    });
};

exports.down = function(knex) {
    return knex.schema.table('exam', table => {
        table.dropColumn('file_name');
        table.dropColumn('url');
    });
};
