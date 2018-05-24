const express = require("express");

const router = express.Router();
const queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");

/*
 - modifier la table user avec type
 - quid indexes
 - qui a le droit de modifier/lire un mandataire ?
 lui-meme uniquement == user connecté ?
 - quid disponibilite/capacité
*/

// récupère les données d'un mandataire
// droits : ?
router.get("/:mandataireId", loginRequired, async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  if (
    !mandataire ||
    parseInt(req.params.mandataireId) !== parseInt(mandataire.id)
  ) {
    return next(new Error(401));
  }
  queries
    .getSingle(mandataire.id)
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

// met à jour les données d'un mandataire
// droits : ?
router.put("/:mandataireId", loginRequired, async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  if (
    !mandataire ||
    parseInt(req.params.mandataireId) !== parseInt(mandataire.id)
  ) {
    return next(new Error(401));
  }
  queries
    .update(mandataire.id, req.body)
    .then(() => queries.getSingle(mandataire.id))
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

// récupère une liste de mandataires pour le user en question
// TODO : le user doit être un TI
// droits : ?
router.get("/", loginRequired, async (req, res, next) => {
  const ti = await queries.getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  queries
    .getAllMandataires(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

// ?
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : ?
//
router.put("/:mandataireId/capacite", async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  // récupères le nb de mesure attribuées pour ce mandataire
  const capaciteMandataire = queries.CapaciteMandataire(mandataire.id);
  queries
    .update(mandataire.id, { disponibilite: capaciteMandataire })
    .then(() => queries.getSingle(mandataire.id))
    .then(mandataire => res.status(200).json(mandataire))
    .catch(error => next(error));
});

// ?
router.put("/:mandataireId/capaciteEteinte", async (req, res, next) => {
  const ti = await queries.getMandataireByUserId(req.user.id);
  const capaciteMandataire = queries.CapaciteEteinteMandataire(ti.id);
  queries
    .CapaciteMandataire(ti.id)
    .then(() => queries.CapaciteMandataire(ti.id))
    .then(mandataire => res.status(200).json(queries.CapaciteMandataire(ti.id)))
    .catch(error => next(error));
});

// router.post("/", function(req, res, next) {
//   queries
//     .add(req.body)
//     .then(function(mandataireID) {
//       return queries.getSingle(mandataireID);
//     })
//     .then(function(mandataire) {
//       res.status(200).json(mandataire);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./etablissementPreposes"));
module.exports = router;
