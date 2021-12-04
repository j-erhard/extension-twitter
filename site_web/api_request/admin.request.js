export async function getVerificationOfVerificatorById (url_tweet){
    let url_api_request = "http://localhost:8081/verifie/getVerificationOfVerificatorById"

    let response = await fetch(url_api_request, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //Origin: origin
            },
            body: ({
                url:url_tweet,
            })
        },
        {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
            return data;
        });

    return (response)
}