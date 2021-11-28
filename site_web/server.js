let bodyParser =  require('body-parser');
let logger = require('logger');
var express = require('express'),
    swig = require('swig'),
    mailer = require('express-mailer'),
    path = require('path'),
    app = express();

const passport = require('passport');
const session = require('express-session');


//DOTENV
const dotenv = require("dotenv");
dotenv.config();

//HBS
const exphbs = require('express-handlebars')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({ secret: 'td8',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//VIEW HBS
app.engine('.hbs', swig.renderFile, exphbs({
    extname: '.hbs',
    defaultLayout: ''
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    res.render('signin');
});


app.post('/contact', function(req, res, next){
    mailer.extend(app, {
        from: req.body.email,
        host: 'smtp.gmail.com',
        secureConnection: false,
        port: 25,
        transportMethod: 'SMTP',

    });
    app.mailer.send('email', {
        to: 'kleinguillaume005@gmail.com',
        subject: req.body.subject,
        message: req.body.message
    }, function(err){
        if(err){
            console.log('On a une erreur !');return;
        }
        res.send('Email envoye');
    });
});



//MODELS
const models = require("./models");
const {signup, home} = require("./controllers/authcontroller");

//ROUTES
const authRoute = require('./routes/auth.js')(app,passport);

require('./config/passport/passport.js')(passport,models.user);

//Sync Database
models.sequelize.sync().then(function() {
console.log('La BDD fonctionne correctement') }).catch(function(err) {
    console.log(err, "Problème avec la MAJ de la BDD")
});

// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
}



const port = 3000;
app.listen(port,function(err){
    if (!err){
        console.log(`Le serveur ecoute sur le port ${port}`);
        console.log(`http://localhost:${port}`)
    }

    else
        console.log(err);
});

