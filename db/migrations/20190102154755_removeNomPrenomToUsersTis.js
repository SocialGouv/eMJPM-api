
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users_tis", function(table) {
    table.dropColumn("prenom");
    table.dropColumn("nom");
    table.dropColumn("email");
    table.dropColumn("cabinet");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
