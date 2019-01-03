var express = require("express");
var router = express.Router();

const { typeRequired } = require("../auth/_helpers");

const { getCodePostaux } = require("../db/queries/codePostaux");

const { getTiByUserId } = require("../db/queries/tis");

/** @swagger
 * /mandataires/1/commentaires:
 *   get:
 *     tags:
 *       - commentaire
 *     description: get all commentaires for a specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all commentaires of one mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/",
  typeRequired("individuel"),
  async (req, res, next) => {
    getCodePostaux
      .then(function(codePostaux) {
        res.status(200).json(codePostaux);
      })
      .catch(function(error) {
        next(error);
      });
  }
);

module.exports = router;
