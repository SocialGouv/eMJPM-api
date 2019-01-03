
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.dropColumn("prenom");
    table.dropColumn("nom");
    table.dropColumn("email");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
