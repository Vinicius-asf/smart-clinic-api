
exports.up = function (knex) {
    return knex.schema.alterTable("exam", (table) => {
        table.string("url", 3000).alter();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("exam", (table) => {
        table.string("url").alter();
    });
};
