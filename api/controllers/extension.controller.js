const {tweets, signalements} = require("../models");
const {Op, where} = require("sequelize");
const {body} = require("express-validator");
var idTweet;

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

exports.signaleTweet = async (req,res) =>{
    tweets.findAll({
        where:{url:req.body.url},
    }).then( async tweet => {
        // console.log(tweet)
        // test qui retourne vrai si aucun tweet trouvé
        if (tweet && Object.keys(tweet).length === 0) {
            // cas où le tweet n'est pas dans la base de données
            let url = req.body.url;
            let etat = "signalement";
            const tweet = await tweets.create({
                url,
                etat
            });
            let idTweet = tweet.id;
            let sujet = req.body.sujet;
            let description = req.body.description;
            const signalement = await signalements.create({
                idTweet,
                sujet,
                description
            });
            return res.status(200).send({
                success: 1,
                tweet: tweet, signalement
            });
        } else {
            // cas où le tweet existe déjà
            let idTweet = tweet[0].id;
            let sujet = req.body.sujet;
            let description = req.body.description;
            const signalement = await signalements.create({
                idTweet,
                sujet,
                description
            });
            return res.status(200).send({
                success: 1,
                signalement: signalement
            });
        }

    }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });
}


exports.signalementLevel = (req,res) =>{
    tweets.findAll({
        where:{url:req.body.url},
        attributes:['niveau_signalement']
    }).then(result => {
        // console.log(result)
        if (result && Object.keys(result).length === 0) result = [{"niveau_signalement":"0"}]
            return res.status(200).send({
                success:1,
                result
            });
        }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });
}

exports.addInformationToSignlement = (req,res) => {
    signalements.belongsTo(tweets, {  foreignKey: "idTweet"});
    tweets.hasMany(signalements, {  foreignKey: "idTweet"});
    signalements.findAll({
        where : {
            description: {
                [Op.eq]: null
            },
        },
        include: [{
            attributes: [],
            model: tweets,
            where : {
                url: req.body.url,
            },
        }],
        limit:1,
    }).then(signalement => {
        // console.log(signalement)
        signalements.destroy({
            where : {
                id : signalement[0].id
            }
        });
        tweets.findAll({
            where:{url:req.body.url},
        }).then( async tweet => {
            let idTweet = tweet[0].id;
            let sujet = req.body.sujet;
            let description = req.body.description;
            const signalement = await signalements.create({
                idTweet,
                sujet,
                description
            });
            return res.status(200).send({
                success: 1,
                signalement: signalement
            });
            }
        ).catch(err => {
            console.log(err);
            return res.status(400).send({success:0,data:"Bad request"});
        });
    }).catch(err => {
        console.log(err);
        return res.status(400).send({success:0,data:"Bad request"});
    });
}