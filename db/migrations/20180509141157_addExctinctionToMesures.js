exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.date("extinction");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
