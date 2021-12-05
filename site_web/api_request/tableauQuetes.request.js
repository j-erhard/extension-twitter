exports.findAllSignaledTweetOrderedByNbRequesDESC = async () =>{
    let url = "http://localhost:8081/siteWeb/findAllSignaledTweetOrderedByNbRequesDESC"
    let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            return data;
        });

    return (response)
}



 async function nouveauJugement (url_tweet,idUtilisateur,decision,description){
    let url = "http://localhost:8081/jugement/nouveauJugement"
    let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: JSON.stringify({
                url:url_tweet,
                idUtilisateur: idUtilisateur,
                decision: decision,
                description: description
            })
        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            return data;
        });

    return (response)
}