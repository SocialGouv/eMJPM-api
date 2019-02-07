const knex = require("../knex.js");

// update users last login
const updateLastLogin = id =>
  knex("users")
    .where({ id })
    .update({
      last_login: new Date().toISOString()
    });

const updateUser = (id, data) =>
  knex("users")
    .where({ id })
    .update(data);

const user = id =>
  knex("users")
    .innerJoin("mandataires", "mandataires.user_id", "users.id")
    .where({ "users.id": id })
    .first();

const getSpecificUser = data => knex.from("users").where(data);

const getCountByEmail = email =>
  knex("users")
    .count("id")
    .where("email", email)
    .first();

module.exports = {
  updateLastLogin,
  updateUser,
  user,
  getSpecificUser,
  getCountByEmail
};
