const IsThisAnEmail = (S) => {
  let index_found_at, index_found_dot;
  //check if the string exists
  if (S !== "undefined") {
    index_found_at = S.search("@");

    // Find the "@"
    if (index_found_at > -1) {
      //Check if there is only one "@" and if there is a "." after 3 char after "@"
      if (S.includes("@", index_found_at + 1) !== true && S.includes(".", S.indexOf("@") + 3) === true) {
        index_found_dot = S.indexOf(".", index_found_at);
        //Check if there is only 1 "." after "@" and if the given string doesn't start or end with "@" and/or "."
        if (S.includes(".", index_found_dot + 1) !== true && (S.startsWith(".") || S.startsWith("@") || S.endsWith(".") || S.endsWith("@")) !== true) return true;
      }
    }
  }
  return false;
};
const email = document.getElementById("email");
const password = document.getElementById("password");
const emaildiv = email.parentNode;

const validateEmail = () => {
  if (!IsThisAnEmail(email.value)) {
    email.classList.add("haserrorborder");
    emaildiv.classList.add("haserror");
    return false;
  } else {
    email.classList.remove("haserrorborder");
    emaildiv.classList.remove("haserror");
    return true;
  }
};
const user = ["vanebrunocattabiani@gmail.com"];
const given_password = ["strive123"];
user.push(localStorage.getItem("email"));
given_password.push(localStorage.getItem("password"));
const checkEmail = () => {
  for (i = 0; i < user.length; i++) {
    if (email.value === user[i] && given_password[i] === password.value) return true;
  }
};

const logIn = (e) => {
  e.preventDefault();
  if (validateEmail() && checkEmail()) {
    window.open("../home.html");
  } else {
    email.classList.add("haserrorborder");
    password.classList.add("haserrorborder");
    emaildiv.classList.add("haserror");
  }
};
