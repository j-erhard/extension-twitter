const {tweets, verifie, utilisateurs, signalements, jugements} = require("../models");
const sequelize = require("sequelize");
const {Op} = require("sequelize");

exports.getVerificationOfVerificatorById = (req,res) =>{
    // tweets.hasMany(verifie, {  foreignKey: "idTweet"});
    // utilisateurs.hasMany(verifie, { foreignKey: "idUtilisateur"});
    // jugements.hasMany(verifie, { foreignKey: "idJugement"});
    //
    verifie.belongsTo(tweets, { foreignKey: "idTweet"});
    verifie.belongsTo(jugements, { foreignKey: "idJugement"});
    verifie.belongsTo(utilisateurs, { foreignKey: "idUtilisateur"});

    verifie.findAll({
        include: [
        {
            model: tweets,
            where:{
                url: req.body.url
            }
        },
        {
            model: utilisateurs,
        },
        {
            model: jugements,
        }
        ]
    }).then(result => {
        return res.status(200).send({
            success:1,
            data:result
        });
    }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });
}