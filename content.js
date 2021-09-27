// à mettre dans le manifest
//"matches": ["<all_urls>"],

// supprime tout
// document.body.textContent = "";

// test de code
/*
var header = document.createElement('h1');
header.textContent = "This page has been eaten";
document.body.appendChild(header);*/

// met le background en rouge
/*
document.body.style.backgroundColor = "red";
console.log("azerty");
*/
//miseEnAttente();

function wait() {
    console.log("...");
}

function miseEnAttente(){
    // var nbArticle = 0;
    // for (let i = 0; i < 10; i++) {
    //     if (nbArticle <= 6) {
    //         nbArticle = changeColor();
    //         setTimeout(wait, 10000); // on attend
    //     }
    // }
    console.log("wesh les belges !");
}

// change la couleur de tous les background des articles en rouge
function changeColor(){
    const articles = document.body.getElementsByTagName('article');

    //console.log(articles[0].style);
    for (const article of articles) {
        const url_tweet = getUrl(article.innerHTML);
        //article.style = none;
        article.style.background = "red";
        article.style.background = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        //console.log(article.innerHTML);
        // span -> titre: id__wx7rpi4m65

        ajoutBouton()
    };
    return articles.length;
}

function getUrl(article) {
    var url = "https://twitter.com";
    // match ne fonctionne pas
    const model = "href=\"/TeamVitality/status/1440613329047678983\"";
    var match = "href=\"";
    var indexStatus = article.indexOf("/status/");
    article = article.substring(indexStatus-25, indexStatus+50);
    var index1 = article.indexOf("href=\"/");
    article = article.substring(index1 + 6, index1 + 100);
    var index2 = article.indexOf("\"");
    article = article.substring(0,index2);
    url = url + article;
    console.log(url);

    return url;
}

// nul
function ajoutBouton() {
    //ajout d'un bouton (pas à la bonne place)
    if (!document.getElementsByClassName("bouton_report")) {
        var input = document.createElement("input");
        input.setAttribute("name", "report");
        input.setAttribute("value", "value_input");
        input.setAttribute("class", "bouton_report");
        input.setAttribute("type", "button");
        article.appendChild(input);
    }
}

document.addEventListener('readystatechange', () => miseEnAttente());


// S'enclenche dès que l'on scroll
var ticking = false;
window.addEventListener('scroll', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        var nbArticle = changeColor();
        ticking = false;
      });
    }
    ticking = true;
  });

