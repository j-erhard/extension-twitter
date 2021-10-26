// à mettre dans le manifest
//"matches": ["<all_urls>"],

/**
 * Fonction qui affiche les tweets vérifiée dès leurs chargements
 * @returns {Promise<void>}
 */
async function firstLoadTweet() {
    var nbArticle = 0;
    for (let i = 0; i < 100; i++) {
        if (nbArticle <= 5) {
            nbArticle = countArticle();
            var x = await resolveXAndAfterX(100);
        } else break;
    }
    await affichageTweets();
}

/**
 * Function de mise en attente pendant X seconde
 * @param x
 * @returns {Promise<unknown>}
 */
function resolveXAndAfterX(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, x);
    });
}

/**
 * Affichage complémentaire pour chaques tweets -> boutons + couleur
 */
async function affichageTweets(){
    // récupère tous les articles (tweets)
    const articles = document.body.getElementsByTagName('article');
    // boucles sur tous les articles (tweets)
    for (const article of articles) {
        // récupère l'url    !!!!! NE FONCTIONNE PAS SUR LES ADDs DE TWITTER !!!
        const url_tweet = getUrl(article.innerHTML);
        // Change l'aspect visuel des tweets
        // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
        // article.style.boxShadow = "none"; fait bugger
        article.style.borderRadius = "10px";
        // status tweet: "Vrai", "Faux", "Tendancieux", "En cours de signalemnt", "Non_singalé", "signalé", "signalé_plus"
        let statusTweet = await getTypeTweet(url_tweet)
        // console.log(JSON.stringify(statusTweet))
        switch (statusTweet) {
            case "Vrai":
                article.style.boxShadow = "0px 0px 10px 10px rgba(25, 240, 25, 0.8) inset";
                break;
            case "Faux":
                article.style.boxShadow = "0px 0px 10px 10px rgba(240, 25, 25, 0.8) inset";
                break;
            case "Tendancieux":
                article.style.boxShadow = "0px 0px 10px 10px rgba(150, 150, 150, 0.8) inset";
                break;
        }
        // Ajout bouton
        ajoutBouton(article, url_tweet, statusTweet);
    }
}

/**
 * compte les articles (tweets)
 * @returns {number}
 */
function countArticle(){
    const articles = document.body.getElementsByTagName('article');
    return articles.length;
}

/**
 * récupère l'url d'un tweet
 * @param article
 * @returns {string}
 */
function getUrl(article) {
    var url = "https://twitter.com";
    const INDEX_STATUS = article.indexOf("/status/");
    article = article.substring(INDEX_STATUS-30, INDEX_STATUS+50);
    const INDEX1 = article.indexOf("href=\"/");
    article = article.substring(INDEX1 + 6, INDEX1 + 100);
    const INDEX2 = article.indexOf("\"");
    article = article.substring(0,INDEX2);
    url = url + article;
    // Affichage en console
    // console.log(url);
    return url;
}

/***************************************************************
 *                 Ajout des 3 types de boutons                *
 ***************************************************************/
async function ajoutBouton(article, url_tweet, statusTweet) {
    // récupération du status du  tweet par rapport à l'utilisateur
    var statusUserTweet = parseInt(await getUserStatusTweet(url_tweet));
    //ajout d'un bouton
    // console.log("statut du tweet: " + statusUserTweet);
    var groupBouton = article.getElementsByClassName('css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws')[0];
    groupBouton.parentElement.style.display = "inline-block";
    groupBouton.style.width = "70%";
    groupBouton.style.float = "left";
    groupBouton.style.marginRight = "6%";
    if (groupBouton.parentElement.childElementCount <= 1) {
        var input = document.createElement("div");
        input.setAttribute("role", "button");
        input.setAttribute("tabindex", "0");
        input.setAttribute("class", "css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr bouton_extension");
        input.style.marginTop = "12px";
        input.style.width = "20%";
        input.style.height = "0px";
        input.style.borderRadius = "10px";
        input.style.textAlign = "center";
        groupBouton.parentElement.appendChild(input);
    }
    var bouton_report = article.getElementsByClassName('css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr bouton_extension')[0];
    switch (statusUserTweet) {
        case 0:
            bouton_report.innerHTML = "signaler";
            bouton_report.style.backgroundColor = "#0093f5";
            bouton_report.onclick = function () {
                upgradeUserStatusTweet(url_tweet);
                bouton_report.innerHTML = "ajouter info";
                bouton_report.style.backgroundColor = "#f56e00";
                bouton_report.onclick = function () {
                    upgradeUserStatusTweet(url_tweet);
                    ajoutBouton(article, url_tweet, statusTweet);
                    showModal();
                };
            };
            break;
        case 1:
            bouton_report.innerHTML = "ajouter info";
            bouton_report.style.backgroundColor = "#f56e00";
            bouton_report.onclick = function () {
                upgradeUserStatusTweet(url_tweet);
                bouton_report.innerHTML = "+ d'info";
                bouton_report.style.backgroundColor = "#3541ff";
                bouton_report.onclick = function () {
                    upgradeUserStatusTweet(url_tweet);
                };
            };
            break;
        case 2:
            bouton_report.innerHTML = "+ d'info";
            bouton_report.style.backgroundColor = "#3541ff";
            bouton_report.onclick = function () {
                upgradeUserStatusTweet(url_tweet);
            };
            break;
        default:
            console.log("ERREUR dans l'ajout du bouton !");
            break;
    }
}

/***************************************************************
 *                   Écouteurs de la page web                  *
 ***************************************************************/
document.addEventListener('readystatechange', () => firstLoadTweet());

let the_timer;
window.addEventListener('scroll', function(){
    clearTimeout(the_timer);
    the_timer = setTimeout(async function () {
        await affichageTweets();
    }, 100);
});
/***************************************************************
 *                   Récupération de données                   *
 ***************************************************************/

// return un objet Json | si tu le mets dans une variable tu peut enssuite
// récupérer l'url en faisant un res.body.tweetStatus ou un truc du genre
// res = signaleTweet(url)
// res.body.tweetStatus
async function getTypeTweet(url_tweet){
    let url = "http://localhost:8081/tweetStatus"

    let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: JSON.stringify({
                url:url_tweet
            })

        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            // console.log(data.tweetStatus);
            return data;
        });
    // if HTTP-status is 200-299
    // get the response body
    // console.log(JSON.stringify(response.tweetStatus))
    // console.log((response.tweetStatus))
    return (response.tweetStatus)

}


async function getUserStatusTweet(url_tweet){
    // /tweet/signalement/level
    let url = "http://localhost:8081/tweet/signalement/level"

    let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: JSON.stringify({
                url:url_tweet
            })

        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            // console.log(data.tweetStatus);
            return data;
        });
    // if HTTP-status is 200-299
    // get the response body
    // console.log(JSON.stringify(response.tweetStatus))
    // console.log((response.tweetStatus))
    return (response.reportLvl)
}

async function upgradeUserStatusTweet(url_tweet){
    let url = "http://localhost:8081/tweet/signalement/augmente"
    let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: JSON.stringify({
                url:url_tweet
            })

        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            // console.log(data.tweetStatus);
            return data;
        });

    return (response.message)
}


const showModal =()=>{
    const modal = document.createElement('dialog');
    modal.setAttribute(
        "style",`
height:400px;
border-top: solid 10px #0062a7;
border-bottom: solid 10px #0062a7;
border-left: none;
border-right: none;
top:1O0px;
border-radius:10px;
position: fixed;
background-color: white;
`

    );

    modal.innerHTML = `<div id="popup-content"; style="height:100%; width: 300px; background-color: white; border-radius: 10px"></div>
    <div style="position:absolute; top:0px; left:5px;">
    <button style=" padding:5px; color: black;border: #0062a7 1px solid; border-radius: 10px; background-color: white; position: absolute; left: 95px; top: 350px ">Annuler</button>
   
    <h1 style="
    position: absolute;
    text-align: center;
    left: 35px;
    color: #004f85;
    top: 10px;
    font-size: 22px;
    width: 250px;">Signalement du tweet </h1>
   
    
    <h3 style="
    font-size: 14px;
    text-align: center;
    position: absolute;
    width: 290px;
    top: 38px;
    left: 16px;
    color: #0062a7;
     "> Veuillez préciser la nature de votre signalement</h3>
    
    <label style="
    color: #0062a7;
    position: absolute;
    left: 33px;
    font-weight: bold;
    top: 123px">Catégorie</label>
    <br>
    <select name="categories" id="categorie-select"
    style="
    margin-top: 5px;
    border: #0062a7 solid 1px;
    border-radius: 10px;
    position: absolute;
    top: 140px;
    left: 30px">
        <option value="politique">Politique</option>
        <option value="sante">Santé</option>
        <option value="environnement">Environnement</option>
        <option value="education">Education</option>
    </select>    
    
    <textarea style="
    background-color: #ffffff;
    position: absolute;
    top: 200px;
    left: 30px;
    height: 100px;
    width: 255px;
    border-radius: 10px;
    border: 1px solid #0062a7;
    resize : none;" placeholder="Commentaires"></textarea>
    
    <button class="oui" style="
    position: absolute;
    border-radius: 10px;
    background-color: #0062a7;
    color: white;
    text-align: center;
    border: #0062a7 1px solid;
    left: 165px;
    padding:5px;
    top: 350px"> Envoyer </button>
    
    </div>`;

    document.body.appendChild(modal);

    const dialog = document.querySelector("dialog");
    dialog.showModal();

    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
    document.getElementsByClassName("oui").item(0)
        .addEventListener("click", () => {
        dialog.close();
    });
    dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
    });
}