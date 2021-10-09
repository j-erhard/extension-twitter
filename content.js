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
    affichageTweets();
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
function affichageTweets(){
    // récupère tous les articles (tweets)
    const articles = document.body.getElementsByTagName('article');
    // boucles sur tous les articles (tweets)
    for (const article of articles) {
        // récupère l'url
        const url_tweet = getUrl(article.innerHTML);

        // Change l'aspect visuel de tweets
        // distance x - distance y - dégradé - taille - (couleur r,g,b, transparence) - inset ou non
        article.style.boxShadow = "none";
        article.style.borderRadius = "10px";
        const X = Math.floor(Math.random() * 6);
        if (X===0)
            article.style.boxShadow = "0px 0px 10px 10px rgba(240, 25, 25, 0.8) inset";
        else if (X===1)
            article.style.boxShadow = "0px 0px 10px 10px rgba(240, 240, 25, 0.8) inset";
        else if (X===2)
            article.style.boxShadow = "0px 0px 10px 10px rgba(150, 150, 150, 0.8) inset";

        // Ajout d'un bouton
        ajoutBouton(article, url_tweet);
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
    console.log(url);

    return url;
}

/**
 * Ajout d'un bouton signaler
 * @param article
 * @param url_tweet
 */
function ajoutBouton(article, url_tweet) {
    //ajout d'un bouton
    var groupBoutons = article.getElementsByClassName('css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws');
    for (const groupBouton of groupBoutons) {
        groupBouton.parentElement.style.display = "inline-block";
        groupBouton.style.width = "70%";
        groupBouton.style.float = "left";
        groupBouton.style.marginRight = "6%";
        if (groupBouton.parentElement.childElementCount <= 1) {
            var input = document.createElement("div");
            input.setAttribute("role", "button");
            input.setAttribute("tabindex", "0");
            input.setAttribute("class", "css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr");
            input.style.marginTop = "12px";
            input.style.backgroundColor="#0093f5";
            input.style.width = "20%";
            input.style.height = "0px";
            input.style.borderRadius = "10px";
            input.style.textAlign = "center";
            input.innerHTML = "signaler";
            input.addEventListener("click", function() {
                alert("You just clicked me: " + url_tweet);
            });
            groupBouton.parentElement.appendChild(input);
        }
    }
}


/***************************************************************
 *                   Écouteurs de la page web                  *
 ***************************************************************/
document.addEventListener('readystatechange', () => firstLoadTweet());

// S'enclenche dès que l'on scroll (pb: s'enclenche plusieurs fois pour un crant de la molette!!)
var ticking = false;
window.addEventListener('scroll', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        affichageTweets();
        ticking = false;
      });
    }
    ticking = true;
});

/***************************************************************
 *                   Récupération de données                   *
 ***************************************************************/
