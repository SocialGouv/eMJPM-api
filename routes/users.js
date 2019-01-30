const express = require("express");
const router = express.Router();
//const queries = require("../db/queries");

const authHelpers = require("../auth/_helpers");
const { typeRequired } = require("../auth/_helpers");

const { deleteUserTI } = require("../db/queries/users");

const { deleteUserTI } = require("../db/queries/users");

// router.get("/index_users", function(req, res, next) {
//   queries
//     .getAllUsers()
//     .then(function(mandataires) {
//       res.status(200).json(mandataires);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.get("/user", authHelpers.loginRequired, (req, res, next) => {
  return handleResponse(res, 200, "success");
});

// router.get("/admin", authHelpers.adminRequired, (req, res, next) => {
//   return handleResponse(res, 200, "success");
// });

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

router.delete("/:userId", typeRequired("admin"), async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  deleteUserTI(userId)
    .then(function() {
      return getMandataires(req.params.body);
    })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(error) {
      next(error);
    });
});

module.exports = router;
