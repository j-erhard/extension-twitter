


export async function trouveEtatTweetParUrl (url_tweet)  {
    let url_api_request = "http://localhost:8081/tweet/find/etat/tweet/by/url"

    let response = await fetch(url_api_request, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            query: JSON.stringify({
                url:url_tweet
            })

        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            return data;
        });

    return (response)
}

export async function signalTweet (url_tweet,sujet_signalement,description_signalement){
    let url_api_request = "http://localhost:8081/tweet/signale/tweet"

    let response = await fetch(url_api_request, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: ({
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

    return (response)
}