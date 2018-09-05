const knex = require("../knex.js");
//const whitelist = require("./whitelist");

//const ALLOWED_FILTERS = ["users.active", "users.type"];

// nombre de mesures pour le mandataire
const Mandataires = () => knex("mandataires");

const getCountMesures = (id, filters = { status: "Mesure en cours" }) =>
  knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(id),
      ...filters
    })
    .first()
    .then(r => r.count);

// update mandataire data
const updateMandataire = (id, data) =>
  knex("mandataires")
    .where({ id })
    .update(data);

// todo move to trigger/view
const updateCountMesures = id =>
  getCountMesures(id).then(count =>
    knex("mandataires")
      .where({ id })
      .update({
        mesures_en_cours: count
      })
  );

// todo move to trigger/view
const updateDateMesureUpdate = id =>
  knex("mandataires")
    .where({ id })
    .update({
      date_mesure_update: new Date()
    });

const getMandataire = filters =>
  knex("mandataires")
    .select(
      "mandataires.*",
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .leftOuterJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .where(filters)
    .first();

const getMandataireById = id => getMandataire({ "mandataires.id": id });

const getMandataireByUserId = user_id =>
  getMandataire({ "mandataires.user_id": parseInt(user_id) });

const getMesuresMap = mandataireId =>
  knex("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee || '')"
      ),
      "mesures.code_postal",
      knex.raw("COALESCE(geolocalisation_code_postal.latitude, 0) as latitude"),
      knex.raw(
        "COALESCE(geolocalisation_code_postal.longitude, 0) as longitude"
      )
    )
    .leftOuterJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .where({
      mandataire_id: parseInt(mandataireId),
      status: "Mesure en cours"
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    );

const getAllByMandatairesFilter = (
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) =>
  knex
    .from("mandataires")
    .whereBetween("geolocalisation_code_postal.latitude", [
      latsouthWest,
      latnorthEast
    ])
    .whereBetween("geolocalisation_code_postal.longitude", [
      longSouthWest,
      longNorthEast
    ])
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mandataires.code_postal"
    )
    .groupByRaw(
      "mandataires.id,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    )
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .select(
      knex.raw(
        "distinct ON(mandataires.id) mandataires.id,mandataires.*,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
      )
    );

const getAllMandataires = ti_id =>
  knex
    .from("mandataire_tis")
    .where("ti_id", parseInt(ti_id))
    .innerJoin("mandataires", "mandataire_tis.mandataire_id", "mandataires.id");

const getAllServicesByTis = ti_id =>
  knex
    .from("mandataire_tis")
    .innerJoin("mandataires", "mandataire_tis.mandataire_id", "mandataires.id")
    .where({ ti_id: parseInt(ti_id), type: "Service" });

const mesureEnAttente = mandataireID =>
  knex("mesures")
    .count("*")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en attente"
    });

const update = (mandataireID, updates) =>
  Mandataires()
    .where("id", parseInt(mandataireID))
    .update(updates);

const getCoordonneByPosteCode = userId =>
  knex
    .from("geolocalisation_code_postal")
    .where("code_postal", userId)
    .first();



module.exports = {
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
<<<<<<< HEAD
  getMesuresMap
=======
  mesureEnAttente,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  update,
  getCoordonneByPosteCode
>>>>>>> refactor: Refactor queries
};
