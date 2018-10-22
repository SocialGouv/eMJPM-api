exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_mandataires", function(table) {
    table.increments("id").primary();
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table.dateTime("creates_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users_mandataires");
};