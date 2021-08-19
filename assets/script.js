var searchButton = document.querySelector(".searchBtn");
let queryEL = document.querySelector(".searchbar");

//new lyric fetch data

searchButton.addEventListener("click", function () {
  let query = "Gotye";
  let encodedQuery = encodeURIComponent(query);
  encodeURIComponent(query);

  document.querySelector(".card-body").setAttribute("visibility: visible");

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
          let embedSong = data.response.song.embed_content;
          console.log(embedSong);
        })

        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

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
