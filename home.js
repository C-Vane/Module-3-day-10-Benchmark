let movies, categories;
const url = "https://striveschool-api.herokuapp.com/api/movies/";
geners = document.getElementById("genres");
window.onload = async () => {
  let response = {};
  try {
    response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",
      },
    });
    categories = await response.json();
    // console.log(categories);
  } catch (err) {
    console.log(err);
  }

  if (categories.length > 0) {
    categories.forEach((catagory) => {
      //console.log(catagory);
      let option = document.createElement("option");
      option.value = catagory;
      option.innerText = catagory;
      geners.appendChild(option);
    });
  }

  loadMovies();
};
const loadMovies = async () => {
  let url_endp = geners.value;
  let response = {};
  let destination = [document.getElementById("trending"), document.getElementById("watchagain"), document.getElementById("newreleses")];
  let carosel = [];
  destination.forEach((dest) => {
    carosel.push(dest.querySelectorAll(".carousel-item .row"));
  });

  for (let i = 0; i < carosel.length; i++) {
    for (let j = 0; j < carosel[i].length; j++) {
      carosel[i][j].innerHTML = ``;
    }
  }
  //console.log(carosel);

  try {
    response = await fetch(url + url_endp, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",
      },
    });
    movies = await response.json();
  } catch (err) {
    console.log(err);
  }
  let m, n;
  movies.forEach((movie, i) => {
    if (i < 54) {
      j = movies.length < 54 ? Math.floor(movies.length / 3) : 18;
      if (i < j || i < 18) {
        if (i < j / 3 || i < 6) {
          //console.log(movies);
          m = 0;
          n = 0;
        } else if (i < (2 * j) / 3 || i < 12) {
          n = 1;
        } else {
          n = 2;
        }
      } else if (i < j * 2 || i < 36) {
        if (i < (j * 4) / 3 || i < 24) {
          m = 1;
          n = 0;
        } else if (i < (j * 5) / 3 || i < 30) {
          n = 1;
        } else {
          n = 2;
        }
      } else {
        if (i < (j * 7) / 3 || i < 42) {
          m = 2;
          n = 0;
        } else if (i < (j * 8) / 3 || i < 48) {
          n = 1;
        } else {
          n = 2;
        }
      }
      carosel[m][n].innerHTML += `
    
    <div class="col-sm-12 col-md-6 col-lg-2 mx-auto text-center">
    <a href="./detail.html?id=${movie._id}">
        <img src="${movie.imageUrl}" class="img-fluid"
        role="button">
    </a>
    <div class="details text-left">
    <p class="title m-0">${movie.name}</p>
    <p class="text-muted m-0">${movie.category}</p>
    <p class="text-truncate m-0 ">${movie.description}</p>
    </div>
     </div>`;
    }
  });
  carosel.forEach((carosel2) => {
    carosel2.forEach((car) => {
      let div = car.querySelectorAll(".row div");
      //console.log(div);
      Array.from(div).forEach((card, i) => {
        console.log(card);
        if (i === 0) i++;
        else if (i === 1) card.classList.add("tablet");
        else card.classList.add("desktop");
      });
      // console.log(div);
    });
  });
};
