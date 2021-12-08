const {tweets,verifie, signalements,jugements} = require("../models");
const sequelize = require("sequelize");
const {Op} = require("sequelize");

exports.nouveauJugement = async (req,res) =>{

    let userId = req.body.idUtilisateur;
    let urlTweet = req.body.url;
    let decisionJugement = req.body.decision;
    let descriptionJugement  = req.body.description;

    const createdJugement = await jugements.create({
        decision: decisionJugement,
        description: descriptionJugement
    }).then(jugement => {
        // console.log(jugement);
        tweets.findOne({
            where:{
                url:urlTweet
            }
        }).then(async tweet => {
            tweet.etat = req.body.decision;
            await tweet.save();
            // console.log(tweet)
            // console.log(tweet.id)
            // console.log(createdJugement.json)
            const verifieCreated = await verifie.create({
                idTweet: tweet.id,
                idUtilisateur: userId,
                idJugement: jugement.id
            })
            return res.status(200).send({
                success:1,
                verifie:verifieCreated,
                jugement:jugement
            });

        }).catch(err => {
            console.log(err);
            return res.status(400).send({success:0,data:"Bad request"});
        });
    }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });


}