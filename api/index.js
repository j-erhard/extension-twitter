const express = require ('express');
const app = express();
const PORT = 8081;

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

app.post('/tweetStatus',(req, res) => {
    console.log("start");

    const { url } = req.body;
    console.log(url);
    if (!url){
        res.status(413).send({data:"bad request"});
    }
    // attention si pas d'url, fait crash l'api
    let etat = respondStatus(url);

    res.status(200);
    res.send({
        message: `pour l'url : ${url} | son état est ${etat}`,
        tweetStatus: `${etat}`,
    })
})


app.post('/signalementTweet',(req, res) => {
    const { url } = req.body;

    if (!url){
        res.status(413).send({message:"bad url/request"});
    }

    res.send({
        message:"url has been stored"
    })
})