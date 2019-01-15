exports.seed = function(knex, Promise) {
  return knex("users_tis")
    .del() // Deletes ALL existing entries
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 2,
        user_id: 5
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 1,
        user_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 1,
        user_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 2,
        user_id: 1
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 2,
        user_id: 2
      });
    })
    .then(function() {
      // Inserts seed entries one by one in series
      return knex("users_tis").insert({
        ti_id: 1,
        user_id: 32
      });
    });
};
