const express = require("express");
const app = express();
//later
const bodyParser = require("body-parser");
const port=8081;
const jugementRoute = require("./routes/jugement.routes");
const verifieRoute = require("./routes/verifie.routes");
const signalementRoute = require("./routes/signalement.routes");
const tweetRoute = require("./routes/tweet.routes");


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



//enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.json());
app.use("/jugement",jugementRoute);
app.use("/verifie",verifieRoute);
app.use("/signalement",signalementRoute);
app.use("/tweet",tweetRoute);

// SWAGGER START
const swaggerOption = {
    swaggerDefinition : (swaggerJsdoc.Options={
        info:{
            title: "TP5 MYSQL EXPRESS REST",
            description: "API Documentation",
            contact: {
                name:"Antoine JEAN",
            },
            servers:["http://localhost:8081"],
        }
    }),
    apis: ["index.js","./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));

// SWAGGER END

app.listen(port,()=>{
    console.log(`Le serveur ecoute sur le port ${port}`);
    console.log(`http://localhost:${port}`);
});
