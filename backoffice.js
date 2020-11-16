let movies = [];
const url = "https://striveschool-api.herokuapp.com/api/movies/";
window.onload = async () => {
  let current_movie = document.getElementsByTagName("tbody")[0];
  let response = {};
  try {
    response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",
      },
    });
    categorys = await response.json();
    console.log(categorys);
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
          console.log(movie);
          movie.forEach((movie) => {
            let prod = document.createElement("tr");
            const id = movie._id;
            movies.push(movie);
            prod.innerHTML = `
            <th scope="row">${movie._id}</th>
            <td>${movie.name}</td>
            <td>${movie.category}</td>
            <td>${movie.description}</td>
            <td><button class="btn btn-outline-danger remove"  data-toggle="modal" data-target="#modal" id="${id}">
            Cancel</button></td>
            <td><button class="btn btn-outline-warning edit" id="${movie._id}">
            Edit</button> </td>
        `;
            current_movie.appendChild(prod);
          });
          console.log(movies);
          const removebtn = document.querySelectorAll(".remove");
          removebtn.forEach((btn) => btn.addEventListener("click", modalRemove));
          const editBtn = document.querySelectorAll(".edit");
          editBtn.forEach((btn) => btn.addEventListener("click", editmovie));
        } catch (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const modalRemove = (events) => {
  let id = events.target.id;
  let title = movies.filter((prod) => prod._id === id)[0].name;
  const modal = document.getElementById("modal");
  modal.innerHTML = `
  <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Delete Movie</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete ${title}?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-outline-primary" data-dismiss="modal"> Yes</button>
    </div>
  </div>
</div>`;
  let button = modal.querySelector(".btn-outline-primary");
  button.addEventListener("click", () => {
    removemovie(id, events);
  });
};
const removemovie = async (id, event) => {
  try {
    let respose = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzViNzRiY2RlMTAwMTc2MTZhODkiLCJpYXQiOjE2MDUxMDIzMjAsImV4cCI6MTYwNjMxMTkyMH0.h3FKiwW98JXPE0Ot2gKvKuBP0LN-YSOF0SfMLPbZQU0",

        "content-type": "application/json",
      },
    });
    if (respose.ok) {
      alert("movie deleted!!!");
      window.location.reload();
    } else alert("There is an error");
  } catch (error) {
    console.log(error);
  }
};
let id;
const editmovie = async (event) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const h1 = document.getElementsByTagName("h1")[0];
  h1.innerText = "Edit Movie";
  const button = document.querySelector("form button");
  button.classList.add("btn-warning");
  button.classList.remove("btn-primary");
  button.innerText = "Edit movie";
  id = event.target.id;
  let edit_movie = movies.filter((prod) => prod._id === id)[0];
  console.log(edit_movie);
  document.getElementById("name").value = edit_movie.name;
  document.getElementById("description").value = edit_movie.description;
  document.getElementById("category").value = edit_movie.category;
  document.getElementById("image").value = edit_movie.imageUrl;
};

const handelSubmit = async (e) => {
  e.preventDefault();

  console.log(e);

  let myMovie = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    imageUrl: document.getElementById("image").value,
  };
  let response = {};
  console.log(myMovie);
  if (id) {
    try {
      respose = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(myMovie),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",

          "content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      respose = await fetch(url, {
        method: "POST",
        body: JSON.stringify(myMovie),
        headers: new Headers({
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",

          "content-type": "application/json",
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (respose.ok) {
    alert(`"Movie ${id ? "Edited" : "Added"}!!!"`);
    id = undefined;
    location.reload();
    //window.location.assign("index.html");
  } else alert("There is an error");
};

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
/*
readTextFile("./movielist.json", async (text) => {
  let data = await JSON.parse(text);
  const addMovies = () => {
    data.forEach(async (movie) => {
      myMovie = {
        name: movie.Title,
        description: movie.Plot,
        category: movie.Genre.split(",")[0],
        imageUrl: movie.Images[1],
      };
      try {
        respose = await fetch(url, {
          method: "POST",
          body: JSON.stringify(myMovie),
          headers: new Headers({
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFlNWNlNjQxNjJkMzAwMTdjMGI0YWYiLCJpYXQiOjE2MDUyNjI1NjcsImV4cCI6MTYwNjQ3MjE2N30.yMA58AK5cA9NQI3_vVMO33xz8C5tm9KM_CqF7yosgSo",

            "content-type": "application/json",
          }),
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  addMovies();
});*/
