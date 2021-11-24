function getReportedTweet() {
    fetch("http://localhost:8081/getTypeTweet", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": "{\"url\":\"https://twitter.com/matthew_d_green/status/1446888859464257539\"}"
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
}