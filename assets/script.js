var searchButton = document.querySelector(".searchBtn");
var advancedButton = document.querySelector(".btn-primary");
let queryEL = document.querySelector(".searchbar");
let advancedSong = document.querySelector("#song-title");
let advancedArtist = document.querySelector("#artist");
let advancedAlbum = document.querySelector("#album");
let advancedFeatured = document.querySelector("#featuring");

searchButton.addEventListener("click", () => {
  defineQuery();
  queryFetch();
});

advancedButton.addEventListener("click", () => {
  advancedQuery();
  queryFetch();
});

let query = "";
let encodedQuery = "";

function defineQuery() {
  query = queryEL.value;
  encodedQuery = encodeURIComponent(query);
}

function advancedQuery() {
  if (advancedSong.value != undefined) {
    query = query + " " + advancedSong.value;
  }
  if (advancedArtist.value != undefined) {
    query = query + " " + advancedArtist.value;
  }
  if (advancedAlbum.value != undefined) {
    query = query + " " + advancedAlbum.value;
  }
  if (advancedFeatured.value != undefined) {
    query = query + " " + advancedFeatured.value;
  }

  console.log(query);
  encodedQuery = encodeURIComponent(query);
}

function queryFetch() {
  //    query will be user's input
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
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let embedContent = data.response.song.embed_content;
          console.log(data.response.song);
          let parsedEmbedContent = embedContent.split("</div>");
          document.querySelector(".lyricLink").innerHTML = embedContent;
          let src = parsedEmbedContent[1].split("'")[1];
          //let scriptTag = parsedembedContent[1];
          fetch(src)
            .then((headers) => headers.text())
            .then((resp) => {
              let i = 0;
              let jsText = resp.replace(/document.write/g, function (match) {
                i++;
                return i === 2
                  ? `document.querySelector('.lyricLink').innerHTML =`
                  : "console.log";
              });
              console.log(jsText);
              eval(jsText);
            });

          fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodedQuery}music&relevanceLanguage=EN&type=video&videoEmbeddable=true&key=AIzaSyDxHe7erjL3l3-1U4vqNT4-xeaQBm4eMrY`
          )
            .then(function (response) {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              let videoID = data.items[0].id["videoId"];
              var iframeVid = document.querySelector("iframe");
              iframeVid.src = `https://www.youtube.com/embed/${videoID}`;
            })
            .catch((err) => {
              console.error(err);
            });
        });
    })
    .catch((err) => {
      console.error(err);
    });
}

// Components for the modal search.
const checkbox = document.querySelector(".form-check-input");
const closeBtn1 = document.querySelector(".close");
const closeBtn2 = document.querySelector(".btn-secondary");

checkbox.addEventListener("change", function () {
  $("#advancedSearch").modal("toggle");
});

closeBtn1.addEventListener("click", function () {
  $("#advancedSearch").modal("hide");
});

closeBtn2.addEventListener("click", function () {
  $("#advancedSearch").modal("hide");
});

advancedButton.addEventListener("click", function () {
  $("#advancedSearch").modal("toggle");
});
