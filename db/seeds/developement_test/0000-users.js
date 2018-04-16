const bcrypt = require("bcryptjs");

exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("testti", salt);
      return Promise.join(
        knex("users").insert({
          username: "ti",
          password: hash,
            admin: false,
            mandataire: false,
            service: true
        })
      );
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("testservice", salt);
      return Promise.join(
        knex("users").insert({
          username: "service",
          password: hash,
            admin: false,
            mandataire: true,
            service: true
        })
      );
    })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("testmanda", salt);
          return Promise.join(
              knex("users").insert({
                  username: "mandataire",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })

      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("hkhfbxb9", salt);
          return Promise.join(
              knex("users").insert({
                  username: "TI ARRAS",
                  password: hash,
                  admin: false,
                  mandataire: false,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("22x675sh", salt);
          return Promise.join(
              knex("users").insert({
                  username: "AVESNES SUR HELPE",
                  password: hash,
                  admin: false,
                  mandataire: false,
                  service: false
              })
          );
      })
.then(() => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync("p1i88dy3", salt);
        return Promise.join(
            knex("users").insert({
                username: "AGSS UDAF LILLE",
                password: hash,
                admin: false,
                mandataire: true,
                service: true
            })
        );
    })
.then(() => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync("i5b9ukup", salt);
        return Promise.join(
            knex("users").insert({
                username: "ARIANE MONS",
                password: hash,
                admin: false,
                mandataire: true,
                service: true
            })
        );
    })
.then(() => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync("80brmkwz", salt);
        return Promise.join(
            knex("users").insert({
                username: "ATINORD LILLE",
                password: hash,
                admin: false,
                mandataire: true,
                service: true
            })
        );
    })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("6pgecsij", salt);
          return Promise.join(
              knex("users").insert({
                  username: "SIP",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: true
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("5l7n1nf7", salt);
          return Promise.join(
              knex("users").insert({
                  username: "ADAE",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: true
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("j7nmefod", salt);
          return Promise.join(
              knex("users").insert({
                  username: "STP ASRL",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: true
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("t4we2bp9", salt);
          return Promise.join(
              knex("users").insert({
                  username: "ATPC",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: true
              })
          );
      })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("nnm6mtzq", salt);
            return Promise.join(
                knex("users").insert({
                    username: "LA VIE ACTIVE",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: true
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("hp4zwg4n", salt);
            return Promise.join(
                knex("users").insert({
                    username: "UDAPEI 62",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: true
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("58jrc2af", salt);
            return Promise.join(
                knex("users").insert({
                    username: "CARACOTTE JOEL",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("q02x0fv5", salt);
            return Promise.join(
                knex("users").insert({
                    username: "DE REU JACQUES",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("tqyx22qx", salt);
            return Promise.join(
                knex("users").insert({
                    username: "DEGELDER NATHALIE",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("k50apusk", salt);
            return Promise.join(
                knex("users").insert({
                    username: "DUHAIN ANNIE",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("4r276k3a", salt);
            return Promise.join(
                knex("users").insert({
                    username: "FOUCART CHRISTELLE",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("0jar8qpd", salt);
            return Promise.join(
                knex("users").insert({
                    username: "LAFFRA VINCENT",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("0ws20hbp", salt);
            return Promise.join(
                knex("users").insert({
                    username: "LEMOINE MURIEL",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync("6qzuoulh", salt);
            return Promise.join(
                knex("users").insert({
                    username: "LOINTIER GERARD",
                    password: hash,
                    admin: false,
                    mandataire: true,
                    service: false
                })
            );
        })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("nxb1q7v0", salt);
          return Promise.join(
              knex("users").insert({
                  username: "LOYER LAURENT",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("jmn6jayv", salt);
          return Promise.join(
              knex("users").insert({
                  username: "MAREL DOMINIQUE",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("s7qd0l8h", salt);
          return Promise.join(
              knex("users").insert({
                  username: "PROVOST DOMINIQUE",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("7tbcvd6r", salt);
          return Promise.join(
              knex("users").insert({
                  username: "TIRMARCHE CLAUDY",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("pv9iu56n", salt);
          return Promise.join(
              knex("users").insert({
                  username: "TIRMARCHE JOSIANE",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
      .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync("ttbav2x8", salt);
          return Promise.join(
              knex("users").insert({
                      username: "DAMMAN JOELLE",
                  password: hash,
                  admin: false,
                  mandataire: true,
                  service: false
              })
          );
      })
};
