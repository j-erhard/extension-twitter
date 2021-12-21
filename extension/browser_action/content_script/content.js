/***************************************************************
 *                   Récupération de données                   *
 ***************************************************************/

async function trouveEtatTweetParUrl (url_tweet)  {
    let url_api_request = "http://localhost:8081/extension/findEtatTweetByUrl"
    // console.log(url_tweet);
    let etatTweet = await fetch(url_api_request, {
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
            // console.log(data);
            return data["data"][0].etat;
        });

    return (etatTweet)
}

async function signalTweet (url_tweet,sujet_signalement,description_signalement){
    let url_api_request = "http://localhost:8081/extension/signaleTweet"

    // console.log(url_tweet)
    // console.log(sujet_signalement)
    // console.log(description_signalement)
    let response = await fetch(url_api_request, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: JSON.stringify({
                url:url_tweet,
                sujet:sujet_signalement,
                description:description_signalement,
            })

        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            return data;
        });
    // console.log(response);

    return (response)
}

/***************************************************************
 *                  Méthode pour l'extension                   *
 ***************************************************************/

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
        // récupère l'url    !!!!! FONCTIONNE AUSSI SUR LES ADDs DE TWITTER !!!
        const url_tweet = getUrl(article.innerHTML);

        // Change l'aspect visuel des tweets
        article.style.borderRadius = "10px";

        // récupère le status du tweet: "Vrai", "Faux", "Tendancieux", "No information"
        let statusTweet = await trouveEtatTweetParUrl(url_tweet);

        switch (statusTweet) {
            case "vrai":
                // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
                article.style.boxShadow = "0px 0px 10px 10px rgba(25, 240, 25, 0.8) inset";
                break;
            case "faux":
                // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
                article.style.boxShadow = "0px 0px 10px 10px rgba(240, 25, 25, 0.8) inset";
                break;
            case "tendancieux":
                // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
                article.style.boxShadow = "0px 0px 10px 10px rgba(255, 160, 0, 0.8) inset";
                break;
            case "signalement":
                // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
                article.style.boxShadow = "0px 0px 10px 10px rgba(150, 150, 150, 0.8) inset";
                ajoutBouton(article, url_tweet);
                break;
            default:
                ajoutBouton(article, url_tweet);
                break;
        }
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

/**
 * Ajout des 3 types du bouton signalé + merci
 * @param article
 * @param url_tweet
 * @returns {Promise<void>}
 */
async function ajoutBouton(article, url_tweet) {
    try {
        // récupération du status du  tweet par rapport à l'utilisateur
        var statusUserTweet = 0;
        // parseInt(await getUserStatusTweet(url_tweet));
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
            input.onclick = function () {
                signalTweet(url_tweet, null, null);
                statusUserTweet++;
            };
            groupBouton.parentElement.appendChild(input);
        }
        // récupération du bouton de notre extension
        var bouton_report = article.getElementsByClassName('css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr bouton_extension')[0];

        switch (statusUserTweet) {
            case 0:
                bouton_report.innerHTML = "signaler";
                bouton_report.style.backgroundColor = "#0093f5";
                console.log("est passé dans le case 0");

                bouton_report.onclick = function () {
                    bouton_report.innerHTML = "Merci !";
                    bouton_report.style.backgroundColor = "#f56e00";
                    if (statusUserTweet === 0) {
                        console.log(statusUserTweet)
                        signalTweet(url_tweet, null, null);
                    }
                    statusUserTweet++;
                };
                break;
            case 1:
                bouton_report.innerHTML = "Merci !";
                bouton_report.style.backgroundColor = "#3541ff";
                break;
            default:
                console.log("ERREUR dans l'ajout du bouton !");
                break;
        }
    }catch (e){}
}

/***************************************************************
 *                   Écouteurs de la page web                  *
 ***************************************************************/
document.addEventListener('readystatechange', () => firstLoadTweet());

/**
 * Sert à actualiser les tweets lorsque l'utilisateur scroll
 */
let the_timer;
window.addEventListener('scroll', function(){
    clearTimeout(the_timer);
    the_timer = setTimeout(async function () {
        await affichageTweets();
    }, 100);
});