const knex = require("../knex.js");
const whitelist = require("./whitelist");

const ALLOWED_FILTERS = ["users.active", "users.type"];

const getMandataires = ({ filters = {}, offset = 0, limit = 50 } = {}) =>
  knex("mandataires")
    //.debug()
    .select(
      "users.id",
      "users.nom",
      "users.prenom",
      "code_postal",
      "users.type",
      "users.active",
      "users.created_at",
      "users.last_login"
    )
    .join("users", { "mandataires.user_id": "users.id" })
    .where(whitelist(filters, ALLOWED_FILTERS))
    .offset(offset)
    .limit(limit);

const deleteUser = (userId ,mandataireId)  => {
  knex("commentaires")
    .where("mandataire_id", mandataireId)
    .del();
  knex("mesures")
    .where("mandataire_id", mandataireId)
    .del();
  knex("user_tis")
    .where("user_id", userId)
    .del();
  knex("mandataires")
    .where("user_id", userId)
    .del();
  knex("users")
    .where("user_id", userId)
    .del();
};

const getTis = ({ filters = {}, offset = 0, limit = 50 } = {}) =>
  knex("users")
    .select(
      "users.id",
      "users.type",
      "users.cabinet",
      "users.email",
      "users.nom",
      "users.prenom",
      "users.active",
      "users.created_at",
      "users.last_login"
    )
    .join("user_tis", { "user_tis.user_id": "users.id" })
    .where({ "users.type": "ti" })
    .where(whitelist(filters, ALLOWED_FILTERS))
    .orderBy("id")
    .offset(offset)
    .limit(limit);

const updateUser = ({ id, active }) => {
  if (typeof active === "undefined") {
    // skip if no data to update
    return Promise.resolve();
  }
  return knex("users")
    .where({ id })
    .update({ active });
};

module.exports = {
  getMandataires,
  updateUser,
  getTis,
  deleteUser
};
