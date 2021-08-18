function getApi() {
  var requestURL =
    '"https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US"';

  fetch(requestURL)
    .then(function (response) {
      return response.json();
      console.log(response);
    })
    .then(function (data) {});

  console.log(response);
}
