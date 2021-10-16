const express = require ('express');
const app = express();
const PORT = 8081;
let array = [["https://twitter.com/adamwathan/status/1449372741505798151",1],["zeojf",2]];

app.use(express.static('.'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());



app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

function respondStatus(url){
    let lastIntUrl = url.slice(-1);
    lastIntUrl = parseInt(lastIntUrl);
    if (lastIntUrl % 2 === 0) return "Vrai";
    else if (lastIntUrl % 3 === 0) return "Tendancieux";
    else return "Faux";
}

function getReportLevel(urlRechercher){
    for (let i = 0; i < array.length; i++) {
        // console.log(array[i])
        if (array[i][0].localeCompare(urlRechercher) === 0) return array[i][1]
    }
    // if (signalement[0].localeCompare(urlRechercher) === 0) return signalement[1]

    console.log("n'est pas passé dans ")
    return 0
}

function augmenteLvlSignalement(urlImpacter){
    let storedIndex = null

    // recherche dans l'url dans la liste si présent augment son niveau de signalement
    for (let i = 0; i < array.length; i++) {
        // console.log(array[i])
        if (array[i][0].localeCompare(urlImpacter) === 0) {
            if (array[i][1] < 2)array[i][1]++
            storedIndex = i
            return array[storedIndex];
        }
    }

    array.push([urlImpacter.toString(),1]) // si url pas trouvé alors ajouté à la liste
    return null
}

// --------------------------- //
//          requète            //
// --------------------------- //

app.post("/tweet/signalement/level",(req, res) => {
    const { url } = req.body;
    // console.log(url);
    if (!url){
        res.status(413).send({data:"no url"});
    }

    console.table(array)

    let niveauSignalementTweet = getReportLevel(url);
    // console.log("getReportLevel(url) : "+getReportLevel(url) )

    res.status(200);
    res.send({
        message: `pour l'url : ${url} | son niveau de signalement est ${niveauSignalementTweet}`,
        reportLvl: `${niveauSignalementTweet}`,
    })
})

app.post("/tweet/signalement/augmente",(req, res) => {
    const { url } = req.body;
    // console.log(url);
    if (!url){
        res.status(413).send({data:"no url"});
    }

    console.table(array)

    let etatRetourFonction = augmenteLvlSignalement(url);
    let niveauSignalementTweet = getReportLevel(url);

    res.status(200);
    if (etatRetourFonction === null){
        res.send({
            message: `le tweet a été ajouté à la base de données | son niveau de signalement est ${niveauSignalementTweet}`,
        })
    } else {
        res.send({
            message: `le niveau de signalement à augmenté, il est maintenant de ${niveauSignalementTweet}`,
        })
    }

})

app.post('/tweetStatus',(req, res) => {
    console.log("start");

    const { url } = req.body;
    // console.log(url);
    if (!url){
        res.status(413).send({data:"no url"});
    }
    // attention si pas d'url, fait crash l'api
    let etat = respondStatus(url);

    res.status(200);
    res.send({
        message: `pour l'url : ${url} | son état est ${etat}`,
        tweetStatus: `${etat}`,
    })
})


