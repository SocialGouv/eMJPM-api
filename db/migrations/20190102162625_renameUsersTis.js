exports.up = function(knex, Promise) {
  return knex.schema.renameTable("users_tis", "user_tis");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("user_tis", "users_tis");
};
