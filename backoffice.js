let movie;
const url = "https://striveschool-api.herokuapp.com/api/movies";
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
    movie = await response.json();
    console.log(movie);
    if (movie.length > 0) {
      movie.forEach((movie) => {
        let prod = document.createElement("tr");
        const id = movie._id;
        prod.innerHTML = `
            <th scope="row">${movie._id}</th>
            <td>${movie.name}</td>
            <td>${movie.catagory}</td>
            <td>${movie.description}</td>
            <td><button class="btn btn-outline-danger remove" id="${id}">
            Cancel</button></td>
            <td><button class="btn btn-outline-warning edit" id="${id}">
            Edit</button> </td>
        `;
        current_movie.appendChild(prod);
      });
      const removebtn = document.querySelectorAll(".remove");
      removebtn.forEach((btn) => btn.addEventListener("click", removemovie));
      const editBtn = document.querySelectorAll(".edit");
      editBtn.forEach((btn) => btn.addEventListener("click", editmovie));
    }
  } catch (err) {
    console.log(err);
  }
};
const removemovie = async (event) => {
  let id = event.target.id;
  let spinner = event.target.querySelector(".d-none");
  console.log(spinner);
  spinner.classList.toggle(".d-none");
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
      spinner.classList.add(".d-none");
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
  h1.innerText = "Edit movie For sale";
  const button = document.querySelector("form button");
  //button.innerText = "Edit movie";
  id = event.target.id;
  let edit_movie = movie.filter((prod) => prod._id === id)[0];
  document.getElementById("name").value = edit_movie.name;
  document.getElementById("description").value = edit_movie.description;
  document.getElementById("catagory").value = edit_movie.catagory;
  document.getElementById("image").value = edit_movie.imageUrl;
};

const handelSubmit = async (e) => {
  e.preventDefault();

  console.log(e);

  let myEvent = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("catagory").value,
    imageUrl: document.getElementById("image").value,
  };
  let response = {};
  console.log(myEvent);
  if (id) {
    try {
      respose = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(myEvent),
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
        body: JSON.stringify(myEvent),
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
    alert(`"movie ${id ? "Edited" : "Added"}!!!"`);
    spinner.classList.toggle(".d-none");
    id = undefined;
    // location.reload();
    //window.location.assign("index.html");
  } else alert("There is an error");
};
