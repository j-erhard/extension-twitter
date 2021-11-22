const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

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
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: ''
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));


app.get('/',function(req,res) {
    res.render('signin.hbs');
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

