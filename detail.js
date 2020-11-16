let movies = [];
const url = "https://striveschool-api.herokuapp.com/api/movies/";
window.onload = async () => {
  let location = document.location.href;
  let id = location.split("id=")[1];
  let response = {};
  try {
    response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",
      },
    });
    let categorys = await response.json();
    if (categorys.length > 0) {
      categorys.forEach(async (category) => {
        let responsemovies = {};
        try {
          responsemovies = await fetch(url + category, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",
            },
          });
          movie = await responsemovies.json();

          movie.forEach((m) => {
            if (m._id === id) {
              console.log(m);
              let main_part = document.createElement("div");
              main_part.classList.add("row", "mb-4", "size");
              main_part.innerHTML = `
              <img src="${m.imageUrl}" class="rounded size">
              <div id="details">
                <h1>${m.name}</h1>
                <p>${m.description}</p>
              <div class="row justify-content-around mt-4">
                <button type="button" class="btn btn-outline-light"> View Trailer</button>
                <button type="button" class="btn btn-danger red"> PLAY </button>
              </div>
            </div>`;
              document.getElementById("mainpart").appendChild(main_part);
            }
            movies.push(m);
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
