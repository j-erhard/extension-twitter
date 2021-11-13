var DataTypes = require("sequelize").DataTypes;
var _bannissements = require("./bannissements");
var _jugements = require("./jugements");
var _signalements = require("./signalements");
var _tweets = require("./tweets");
var _utilisateurs = require("./utilisateurs");

function initModels(sequelize) {
  var bannissements = _bannissements(sequelize, DataTypes);
  var jugements = _jugements(sequelize, DataTypes);
  var signalements = _signalements(sequelize, DataTypes);
  var tweets = _tweets(sequelize, DataTypes);
  var utilisateurs = _utilisateurs(sequelize, DataTypes);

  signalements.belongsTo(tweets, { as: "idTweet_tweet", foreignKey: "idTweet"});
  tweets.hasMany(signalements, { as: "signalements", foreignKey: "idTweet"});
  bannissements.belongsTo(utilisateurs, { as: "idUtilisateur_utilisateur", foreignKey: "idUtilisateur"});
  utilisateurs.hasMany(bannissements, { as: "bannissements", foreignKey: "idUtilisateur"});

  return {
    bannissements,
    jugements,
    signalements,
    tweets,
    utilisateurs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
