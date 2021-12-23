const {tweets, signalements} = require("../models");
const {Op} = require("sequelize");
const sequelize = require("sequelize");



exports.findAllSignaledTweetOrderedByNbRequesDESC = (req,res) =>{
    signalements.belongsTo(tweets, {  foreignKey: "idTweet"});
    tweets.hasMany(signalements, {  foreignKey: "idTweet"});
    tweets.findAll({
        where: {
            [Op.and]:{
                url: {[Op.notLike]: '%https://twitter.comclass='},
                etat: {[Op.like]: '%signalement'}
            }
        },
        attributes: [
            'id',
            'url',
            'etat',
            'niveau_signalement',
            [sequelize.fn('count', sequelize.col('signalements.idTweet')),'nbSignalement']
        ],
        include: [{
            attributes: [],
            model: signalements,
        }],
        group: ["tweets.id"],
        order: [
            [sequelize.fn('count', sequelize.col('signalements.idTweet')), 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
        ],
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

exports.findEtatTweetByUrl = (req,res) =>{
    console.log(req.body.url);
    tweets.findAll({
        where:{url:req.body.url},
        attributes:['etat']
    })
        .then(result => {
            // console.log(result);
            if (result.length === 0) {
                result = [{}]
                result[0].etat = "";
            }
            // console.log(result)
            // console.log(result.length)
            return res.status(200).send({
                success:1,
                data:result
            });
        }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });
}