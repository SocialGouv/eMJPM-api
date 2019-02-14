const { sendEmail } = require(".");

const EMAIL_RELANCE_TEXT = url => `
Bonjour la super team emjpm :) ,

Nous avons reçu une nouvelle inscription.

Veuillez cliquer sur le lien suivant: ${url}

Bonne journée :)
`;

const EMAIL_RELANCE_HTML = (nom, prenom, email) => `
Bonjour la super team eMJPM :),<br />

Nous avons reçu une nouvelle inscription de ${prenom} / ${nom}  ${email} <br />
Merci de vérifier cette nouvelle demande et de la valider.
<br />
Bonne journée :)
`;

const inscriptionEmail = url =>
  sendEmail(
    "contact@emjpm.beta.gouv.fr",
    "Nouvelle inscription",
    EMAIL_RELANCE_TEXT(url),
    EMAIL_RELANCE_HTML(url)
  ).catch(e => {
    // todo: sentry
    console.log(e);
  });

module.exports = {
  inscriptionEmail
};
