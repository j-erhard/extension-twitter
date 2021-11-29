const authController = require('../controllers/authcontroller.js');
var mailer = require('express-mailer');



module.exports = function(app,passport){
    app.get('/contact', isNotLoggedIn, function(req, res){
        res.render('contact');


        mailer.extend(app, {
            from: req.body.email,
            host: 'smtp.gmail.com',
            secureConnection: true,
            port: 465,
            transportMethod: 'SMTP',
            auth: {
                user: 'kleinguillaume005@gmail.com',
                pass: ''
            }
        });
    });

    app.post('/contact', function(req, res, next){
        app.mailer.send('contact', {
            to: 'kleinguillaume005@gmail.com',
            subject: req.body.subject,
            message : req.body.message
        }, function(err){
            if(err){
                console.log(err);return;
            }
            res.send('Email envoye');
        });
        //res.send("done")
    });

    app.get('/signup', isLoggedIn, authController.signup);
    app.get('/signin', isLoggedIn, authController.signin);

    app.get('/', isLoggedIn, authController.signin);

    app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/home',
        failureRedirect: '/signup'} ));

    app.get('/home',isNotLoggedIn, authController.home);
    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin', { successRedirect: '/home',
        failureRedirect: '/signin'} ));

    app.get('/tableDesQuetes', isNotLoggedIn, authController.quetes);

    app.get('/contact', isNotLoggedIn, authController.contact);

    app.get('/verifie', isNotLoggedIn, authController.verifie);

    app.get('/admin', isAdmin, authController.admin);

    function isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/signin');
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) res.redirect('/home');
        else return next();
    }

    function isAdmin(req,res,next){
        if (req.isAuthenticated() && req.user.type === "admin"){
            return next();
        } else {
            return res.redirect("/home");
        }
    }
}


