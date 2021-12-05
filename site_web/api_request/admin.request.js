export async function getVerificationOfVerificatorById (url_tweet){
    let url_api_request = "http://localhost:8081/verifie/getAllVerificationOfVerificator"

    let response = await fetch(url_api_request, {
            method: 'get',
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