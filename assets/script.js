// 
// Components of the search bar and button 
// 
var searchButton = document.querySelector(".searchBtn");
let queryEL = document.querySelector(".searchbar");

searchButton.addEventListener('click', function () {
    //    query will be user's input
    let query = queryEL.value;
    let encodedQuery = encodeURIComponent(query);
    encodeURIComponent(query);

    fetch(`https://genius.p.rapidapi.com/search?q=${encodedQuery}`, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "b657a2984emshe35c30735463f15p1b37d6jsn49a10961e667", // your key here
            "x-rapidapi-host": "genius.p.rapidapi.com",
        },
    })

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            console.log(data);
            let trackID = data.response.hits[0].result.id;
            console.log(trackID);
            fetch(`https://genius.p.rapidapi.com/songs/${trackID}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "b657a2984emshe35c30735463f15p1b37d6jsn49a10961e667",
                    "x-rapidapi-host": "genius.p.rapidapi.com",
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let embedSong = data.response.song.embed_content;
                    console.log(embedSong);
                })

                .catch((err) => {
                    console.error(err);
                })
        }).catch ((err) => {
            console.error(err);
        })

    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}music&relevanceLanguage=EN&type=video&videoEmbeddable=true&key=AIzaSyDxHe7erjL3l3-1U4vqNT4-xeaQBm4eMrY`)
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let videoID = data.items[0].id["videoId"];
            var iframeVid = document.querySelector("iframe")
            iframeVid.src = `https://www.youtube.com/embed/${videoID}`
        })
        .catch((err) => {
            console.error(err);
        })
        
});




// Components for the modal search.
const checkbox = document.querySelector(".form-check-input");
const closeBtn1 = document.querySelector(".close");
const closeBtn2 = document.querySelector(".btn-secondary");

checkbox.addEventListener("change", function () {
    $("#advancedSearch").modal("show");
});

closeBtn1.addEventListener("click", function () {
    $("#advancedSearch").modal("hide");
});

closeBtn2.addEventListener("click", function () {
    $("#advancedSearch").modal("hide");
});
