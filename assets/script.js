var searchButton = document.querySelector(".searchBtn")
searchButton.addEventListener('click',getMusicAPI)

function getMusicAPI(){
    var requestUrl = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433&apikey=e075b7af2b41f9ecf20c40cb1fc42a40';

    fetch(requestUrl, {headers:{"Access-Control-Allow-Origin":"*"}})
        .then(function (response){
            return response.text();
        })
        .then(function(data){
            console.log(data)

        })
}

const checkbox = document.querySelector(".form-check-input");
const closeBtn1 = document.querySelector(".close");
const closeBtn2 = document.querySelector(".btn-secondary");

checkbox.addEventListener("change", function() {
    $('#advancedSearch').modal('show');
});

closeBtn1.addEventListener("click", function() {
    $('#advancedSearch').modal('hide');
});

closeBtn2.addEventListener("click", function() {
    $('#advancedSearch').modal('hide');
});

