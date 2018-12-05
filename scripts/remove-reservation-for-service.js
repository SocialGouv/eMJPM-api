const {
  getAllMesuresEnAttenteByServices,
  updateMesure
} = require("../db/queries/mesures");

const knex = require("../db/knex");

const { isBefore, addMonths } = require("date-fns");

const removeMesureEnAttenteLateThanTwoMonths = () => {
  return getAllMesuresEnAttenteByServices()
    .then(mesures => {
      return (
        mesures &&
        mesures.map &&
        mesures.map(mesure => {
          if (isBefore(addMonths(new Date(mesure.created_at), 2), new Date())) {
            updateMesure(
              {
                id: mesure.id
              },
              {
                status: "Mesure notifiée au service"
              }
            );
          }
        })
      );
    })
    .catch(e => {
      console.log(e);
    });
};

if (require.main === module) {
  removeMesureEnAttenteLateThanTwoMonths().then(() => {
    knex.destroy();
  });
}
