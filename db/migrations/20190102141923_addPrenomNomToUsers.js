
exports.up = function(knex, Promise) {
  const userTisAll = knex("users_tis");
  const mandataires = knex("mandataires");
  const mandataireTis = knex("mandataire_tis").innerJoin(
    "mandataires",
    "mandataire_tis.mandataire_id",
    "mandataires.id"
  );

  return knex.schema
    .alterTable("users", function(table) {
      table.string("nom");
      table.string("prenom");
      table.string("cabinet");
      table.string("email");
    })
    .then(() =>
      mandataires.then(mandataires =>
        mandataires.map(mandataire => {
          knex("users")
            .where("users.id", mandataire.user_id)
            .update({
              prenom: mandataire.prenom,
              nom: mandataire.nom,
              email: mandataire.email
            })
            .then(() => console.log("hello"));
        })
      )
    )
    .then(() =>
      userTisAll.then(userTis =>
        userTis.map(userTi => {
          return knex("users")
            .where("users.id", userTi.user_id)
            .update({
              prenom: userTi.prenom,
              nom: userTi.nom,
              email: userTi.email,
              cabinet: userTi.cabinet
            })
            .then(() => console.log("hello"));
        })
      )
    )
    .then(() =>
      mandataireTis.then(mandatairesTis =>
        mandatairesTis.map(mandatairesTi => {
          return knex("users_tis")
            .insert({
              ti_id: mandatairesTi.ti_id,
              user_id: mandatairesTi.user_id
            })
            .then(() => console.log("hello"));
        })
      )
    );
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.dropColumn("nom");
    table.dropColumn("prenom");
    table.string("cabinet");
    table.string("email");
  });
};
