const bCrypt = require('bcrypt');
const {Strategy: LocalStrategy} = require("passport-local");
module.exports = function(passport,user){
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user.id); });
    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if(user){
                done(null, user.get());
            } else{
                done(user.errors,null);
            }
        });
    });
    passport.use('local-signup', new LocalStrategy( {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done){
            let generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({where: {email:email}}).then(function(user){
                if(user) {
                    return done(null, false, {message : 'Cette email est déja pris'} ); }
                else
                {
                    let userPassword = generateHash(password);
                    let data = {email:email,
                        password:userPassword,
                        prenom: req.body.prenom,
                        nom: req.body.nom
                    };
                    User.create(data).then(function(newUser,created){ if(!newUser){
                        return done(null,false); }
                        if(newUser){
                            return done(null,newUser);
                        } });
                } });
        } ));
    passport.use('local-signin', new LocalStrategy( {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
            let User = user;
            let isValidPassword = function(userpass,password){
                return bCrypt.compareSync(password, userpass); }
            User.findOne({ where : { email: email}}).then(function (user) { if (!user) {
                return done(null, false, { message: 'L\'e-mail n\'existe pas' }); }
                if (!isValidPassword(user.password,password)) {
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }
                let userinfo = user.get(); return done(null,userinfo);
            }).catch(function(err){
                console.log("Error:",err);
                return done(null, false, { message: 'Une erreur s\'est produite lors de votre connexion' }); });
        } ));
}


