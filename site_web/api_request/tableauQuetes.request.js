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