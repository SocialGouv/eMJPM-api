const knex = require("../knex.js");

function Commentaires() {
  return knex("commentaires");
}

const getAllCommentaires = (mandataire_id, ti_id) =>
  Commentaires().where({
    mandataire_id: parseInt(mandataire_id),
    ti_id: parseInt(ti_id)
  });

const addCommentaire = data => Commentaires().insert(data);

const deleteCommentaire = ({ id, ti_id }) =>
  Commentaires()
    .where({
      id: parseInt(id),
      ti_id
    })
    .del();

const isMandataireInTi = (mandataire_id, ti_id) =>
  knex
    .from("user_tis")
    .select(
      "mandataires.id",
      "mandataires.user_id",
      "user_tis.user_id",
      "user_tis.ti_id"
    )
    .innerJoin("mandataires", "mandataires.user_id", "user_tis.user_id")
    .where({
      "mandataires.id": mandataire_id,
      ti_id
    })
    .then(res => res.length > 0);

module.exports = {
  getAllCommentaires,
  addCommentaire,
  deleteCommentaire,
  isMandataireInTi
};
