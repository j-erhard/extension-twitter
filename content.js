// supprime tout
// document.body.textContent = "";

// test de code
/*
var header = document.createElement('h1');
header.textContent = "This page has been eaten";
document.body.appendChild(header);*/

// met le background en rouge
document.body.style.backgroundColor = "red";
console.log("azerty");
//miseEnAttente();


function miseEnAttente(){
 setTimeout(changeColor, 5000); //On attend 5 secondes avant d'exécuter la fonction
}

// change la couleur de tous les background des articles en rouge
function changeColor(){
    //document.body.getElementsByTagName('css-1dbjc4n').style.background = "red";
    const articles = document.body.getElementsByTagName('article');
    //console.log(articles[0].style);
    for (const article of articles) {
        //article.style = none;
        article.style.background = "red";
        console.log("azety");
    };
}

document.addEventListener('readystatechange', () => console.log(document.readyState));



var ticking = false;
window.addEventListener('scroll', function(e) {
  
    if (!ticking) {
      window.requestAnimationFrame(function() {
        changeColor();
        ticking = false;
      });
    }
  
    ticking = true;
  });
