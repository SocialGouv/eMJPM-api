const data = `
Tribunal d'Instance de Calais;62103;CALAIS CEDEX;+33 3 21 36 37 69;ti-calais@justice.fr;;
Tribunal d'Instance d'Ivry-sur-Seine;94205; IVRY SUR SEINE CEDEX;;;;
Tribunal d'Instance de Pantin;93692 ;PANTIN CEDEX;;;;
Tribunal d'Instance de Vanves;92170; VANVES;;;;
Tribunal d'Instance de Saint-Ouen;93582; ST OUEN CEDEX;;;;
Tribunal d'Instance de Charenton-le-Pont;94220; CHARENTON LE PONT;;;;
Tribunal d'Instance d'Aubervilliers;93306 ;AUBERVILLIERS CEDEX;;;;
Tribunal d'Instance de Montreuil;93100; MONTREUIL;;;;
Tribunal d'Instance de Villejuif;94808; VILLEJUIF CEDEX;;;;
Tribunal d'Instance de Courbevoie;92400; COURBEVOIE;;;;
Tribunal d'Instance de Boulogne-Billancourt;92104; BOULOGNE BILLANCOURT CEDEX;;;;
Tribunal d'Instance de Saint-Denis;93200; ST DENIS;;;;
Tribunal d'Instance de Puteaux;92801; PUTEAUX CEDEX;;;;
Tribunal d'Instance de Bobigny;93009; BOBIGNY CEDEX;;;;
Tribunal d'Instance d'Asnières-sur-Seine;92600; ASNIERES SUR SEINE;;;;
Tribunal d'Instance de Nogent-sur-Marne;94735; NOGENT SUR MARNE CEDEX;;;;
Tribunal d'Instance de Colombes;92700; COLOMBES;;;;
Tribunal d'Instance de Saint-Maur-des-Fossés;94100; ST MAUR DES FOSSES;;;;
Tribunal d'Instance d'Antony;92160; ANTONY;;;;
Tribunal d'Instance du Raincy;93340; LE RAINCY;;;;
Tribunal d'Instance d'Aulnay-sous-Bois;93600; AULNAY SOUS BOIS;;;;
Tribunal d'Instance de Sannois;95110; SANNOIS;;;;
Tribunal d'Instance de Montmorency;95160; MONTMORENCY;;;;
Tribunal d'instance de Sucy en Brie;94370; SUCY EN BRIE;;;;
Tribunal d'Instance de Gonesse;95501; GONESSE CEDEX;;;;
Tribunal d'Instance de Versailles;78011; VERSAILLES CEDEX;;;;
Tribunal d'Instance de Palaiseau;91120 ;PALAISEAU;;;;
Tribunal d'Instance de Longjumeau;91162 ;LONGJUMEAU CEDEX;;;;
Tribunal d'Instance de Juvisy-sur-Orge;91265; JUVISY SUR ORGE CEDEX;;;;
Tribunal d'Instance de Saint-Germain-en-Laye;78105; ST GERMAIN EN LAYE CEDEX;;;;
Tribunal d'Instance de Poissy;78308; POISSY CEDEX;;;;
Tribunal d'Instance d'Evry;91011; EVRY CEDEX;;;;
Tribunal d'Instance de Lagny-sur-Marne;77405; LAGNY SUR MARNE CEDEX;;;;
Tribunal d'Instance de Pontoise;95302; CERGY PONTOISE CEDEX;;;;
Tribunal d'Instance de Meaux;77109; MEAUX CEDEX;;;;
Tribunal d'Instance de Melun;77008; MELUN CEDEX;;;;
Tribunal d'Instance de Rambouillet;78514; RAMBOUILLET CEDEX;;;;
Tribunal d'Instance de Mantes-la-Jolie;78200; MANTES LA JOLIE;;;;
Tribunal d'Instance d'Etampes;91152; ETAMPES CEDEX;;;;
Tribunal d'Instance de Fontainebleau;77300; FONTAINEBLEAU;;;;`;

const cols = ["etablissement", "code_postal", "ville", "telephone", "email"];

const splitRow = row =>
  row
    .split(";")
    .filter((r, i) => i < cols.length)
    .reduce((a, c, i) => ({ ...a, [cols[i]]: c }), {
      latitude: 0,
      longitude: 0
    });

const rows = data
  .split("\n")
  .filter(Boolean)
  .map(splitRow);

exports.seed = (knex, Promise) => knex.batchInsert("tis", rows);