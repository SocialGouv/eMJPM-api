const knex = require("../knex.js");

const getCodePostaux = () => {
  return knex("geolocalisation_code_postal").select("geolocalisation_code_postal.code_postal");
};

module.exports = {
  getCodePostaux
};
