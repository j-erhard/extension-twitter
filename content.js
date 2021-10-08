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

// Mets une couleur aléatoire sur les tweet
function affichageTweets(){
    const articles = document.body.getElementsByTagName('article');

    //console.log(articles[0].style);
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
        ajoutBouton(article);
    }

    return articles.length;
}

function countArticle(){
    const articles = document.body.getElementsByTagName('article');
    return articles.length;
}

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
 */
function ajoutBouton(article) {
    //ajout d'un bouton
    var groupBoutons = article.getElementsByClassName('css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws');
    for (const groupBouton of groupBoutons) {
        // groupBouton.style.backgroundColor = "red";
        console.log(groupBouton.childElementCount);
        if (groupBouton.childElementCount <= 5) {
            var input = document.createElement("bouton");
            input.setAttribute("name", "bouton_report123");
            input.setAttribute("value", "value_input");
            input.setAttribute("class", "bouton_report");
            input.setAttribute("type", "button");
            input.style.backgroundColor="#5050ff";
            input.style.borderRadius = "10px";
            input.style.padding = "0 5px";
            input.innerHTML = "signaler";
            input.addEventListener("click", function() {
                alert("You just clicked me!");
            });
            groupBouton.appendChild(input);


        }
    }

    /*if (groupBouton.getElementsByClassName('css-1dbjc4n r-18u37iz r-1h0z5md bouton-report')){
        console.log("wesh alors les belges!!!")
        var input = document.createElement("bouton");
        input.setAttribute("name", "bouton_report123");
        input.setAttribute("value", "value_input");
        input.setAttribute("class", "bouton_report");
        input.setAttribute("type", "button");
        article.appendChild(input);
        console.log(document.getElementsByClassName("bouton_report123"));
        console.log(article.innerHTML);
    }*/
}

document.addEventListener('readystatechange', () => firstLoadTweet());


// S'enclenche dès que l'on scroll (pb: s'enclenche plusieurs fois pour un crant de la molette!!)
var ticking = false;
window.addEventListener('scroll', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        var nbArticle = affichageTweets();
        ticking = false;
      });
    }
    ticking = true;
});

