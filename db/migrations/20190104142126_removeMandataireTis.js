exports.up = function(knex, Promise) {
  return knex.schema.dropTable("mandataire_tis");
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable("mandataire_tis", function(table) {
    table.increments("id").primary();
    table
      .integer("ti_id")
      .references("id")
      .inTable("tis");
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");
    table.dateTime("created_at");
  });
};
