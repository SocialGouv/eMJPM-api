const express = require("express");
const router = express.Router();

const knex = require("../db/knex");
const queries = require("../db/queries/mesures");
/**
 ... express.js boilerplate
 routes, middlewares, helpers, loggers, etc
 **/

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
// express route where we receive files from the client
// passing multer middleware

router.post("/:mandataireId/files", async (req, res, next) => {
  req.body.map(datum => {
    datum["mandataire_id"] = req.user.id;
    datum["status"] = "Mesure en cours";
  });

  console.log("data", req.body);
  return queries.addMesure(req.body).then(() => {
    return res.json({ success: true });
  });

  // knex
  //   .transaction(trx =>
  //     // create user
  //     req.body.map(mesure => {
  //       return queries
  //         .addMesure({
  //           ...mesure,
  //           mandataire_id: req.user.id,
  //           status: "Mesure en cours"
  //         })
  //         .transacting(trx)
  //         .catch(trx.rollback);
  //     })
  //   )
  //   .then(() => {
  //     return res.json({ success: true });
  //   });
});

module.exports = router;
