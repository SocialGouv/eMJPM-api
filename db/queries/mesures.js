const knex = require("../knex.js");

const getAllMesuresByMandataires = ti_id =>
  knex
    .from("mesures")
    .where("status", "Mesure en cours")
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mesures.code_postal"
    )
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .select(
      "mesures.id",
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude",
      "mandataires.nom",
      "mandataires.prenom",
      "mandataires.type",
      "mesures.date_ouverture",
      "mesures.ville"
    );

const getAllMesuresByMandatairesFilter = (
  ti_id,
  latnorthEast,
  latsouthWest,
  longNorthEast,
  longSouthWest
) =>
  knex
    .from("mesures")
    .select(
      knex.raw(
        "distinct ON(mandataires.id) mandataires.id,mandataires.*,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
      )
    )
    .where("status", "Mesure en cours")
    .whereBetween("geolocalisation_code_postal.latitude", [
      latsouthWest,
      latnorthEast
    ])
    .whereBetween("geolocalisation_code_postal.longitude", [
      longSouthWest,
      longNorthEast
    ])
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "geolocalisation_code_postal.code_postal",
      "mesures.code_postal"
    )
    .groupByRaw(
      "geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude,mandataires.id"
    )
    .where("mandataire_tis.ti_id", parseInt(ti_id))
    .union(function() {
      this.select(
        "mandataires.id",
        "mandataires.*",
        "geolocalisation_code_postal.latitude",
        "geolocalisation_code_postal.longitude"
      )
        .from("mandataires")
        .where("type", "Service")
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
        .where("mandataire_tis.ti_id", parseInt(ti_id));
    });

const getAllMesuresByPopUp = (ti_id, type) => {
  const where = {
    "mandataire_tis.ti_id": parseInt(ti_id),
    status: "Mesure en cours"
  };
  if (type) {
    where["mandataires.type"] = type;
  }
  return knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal),array_agg(distinct mesures.mandataire_id) as mandataire_ids,array_agg(distinct mandataires.type) as types"
      ),
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .where(where)
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.longitude,geolocalisation_code_postal.latitude"
    );
};

const getAllMesuresByTis = ti_id =>
  knex
    .from("mesures")
    .select("mesures.*", knex.raw("mandataires.etablissement as manda"))
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .where({
      "mandataire_tis.ti_id": parseInt(ti_id)
    });

const getAllMesuresByPopUpForMandataire = ti_id =>
  knex
    .from("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee ||'')"
      ),
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .innerJoin("mandataires", "mandataires.id", "mesures.mandataire_id")
    .innerJoin(
      "mandataire_tis",
      "mandataire_tis.mandataire_id",
      "mandataires.id"
    )
    .where({
      "mandataire_tis.ti_id": parseInt(ti_id),
      status: "Mesure en cours"
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.longitude,geolocalisation_code_postal.latitude,geolocalisation_code_postal.code_postal"
    );

const updateMesure = (where, updates) =>
  knex("mesures")
    .where(where)
    .update(updates);

const addMesure = data => knex("mesures").insert(data);

const getAllMesures = mandataireID =>
  knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Mesure en cours"
  });

const getAllMesuresByMandatairesForMaps = mandataireID =>
  knex("mesures")
    .select(
      knex.raw(
        "COUNT(mesures.code_postal), array_agg('' || mesures.type || ' ' || mesures.annee ||'')"
      ),
      "mesures.code_postal",
      "geolocalisation_code_postal.latitude",
      "geolocalisation_code_postal.longitude"
    )
    .innerJoin(
      "geolocalisation_code_postal",
      "mesures.code_postal",
      "geolocalisation_code_postal.code_postal"
    )
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en cours"
    })
    .groupByRaw(
      "mesures.code_postal,geolocalisation_code_postal.latitude,geolocalisation_code_postal.longitude"
    );

const getAllMesuresAttente = mandataireID =>
  knex("mesures")
    .select("mesures.*", "tis.etablissement")
    .leftOuterJoin("tis", "mesures.ti_id", "tis.id")
    .where({
      mandataire_id: parseInt(mandataireID),
      status: "Mesure en attente"
    });

const getAllMesuresEteinte = mandataireID =>
  knex("mesures").where({
    mandataire_id: parseInt(mandataireID),
    status: "Eteindre mesure"
  });

const getPostecode = (codePostal, lat, lng) =>
  knex("geolocalisation_code_postal").insert({
    code_postal: codePostal,
    latitude: lat,
    longitude: lng
  });

module.exports = {
  getAllMesuresByMandataires,
  getAllMesuresByMandatairesFilter,
  getAllMesuresByPopUp,
  getAllMesuresByTis,
  getAllMesuresByPopUpForMandataire,
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getAllMesuresByMandatairesForMaps,
  getAllMesures,
  addMesure,
  getPostecode
};
