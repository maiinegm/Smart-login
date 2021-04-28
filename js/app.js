var signInForm = document.getElementById("signInForm");
var signUpForm = document.getElementById("signUpForm");
var signUpLink = document.getElementById("signup");
var signInLink = document.getElementById("signin");
var emailSignIn = document.getElementById("email-signin");
var passwordSignIn = document.getElementById("password-signin");
var nameSignUp = document.getElementById("username-signup");
var emailSignUp = document.getElementById("email-signup");
var passwordSignUp = document.getElementById("password-signup");
var loginButton = document.getElementById("loginButton");
var signUpButton = document.getElementById("signUpButton");
var signInRequired = document.querySelector(".required");
var signUpRequired = document.getElementById("uprequired");
var inputs = document.getElementsByClassName("form-control");

var data;
if (localStorage.getItem("users") == null) {
  data = [];
} else {
  data = JSON.parse(localStorage.getItem("users"));
}

//save sign up data;
function getData() {
  var userData = {
    name: nameSignUp.value,
    email: emailSignUp.value,
    password: passwordSignUp.value,
  };
  data.push(userData);
  localStorage.setItem("users", JSON.stringify(data));
  window.location.replace("home.html");
}

//check if sign in data exists;
function checkData() {
  for (i = 0; i < data.length; i++) {
    if (
      emailSignIn.value == data[i].email &&
      passwordSignIn.value == data[i].password
    ) {
      localStorage.setItem("loggedUser", data[i].name);
      window.location.replace("home.html");
      return;
    }
  }
  signInRequired.innerText = "incorrect email or password";
}

function checkUserExist() {
  for (i = 0; i < data.length; i++) {
    if (emailSignUp.value == data[i].email) {
      return true;
    }
  }
  return false;
}

// switch to sign up and switch to sign in links;
signUpLink.addEventListener("click", (toSignUp) => {
  toSignUp.preventDefault();
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});
signInLink.addEventListener("click", (toSignIn) => {
  toSignIn.preventDefault();
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
});

// validation and requirements errors;
loginButton.addEventListener("click", function () {
  if (emailSignIn.value.length == 0 || passwordSignIn.value.length == 0) {
    signInRequired.innerText = "Email and password are required";
  } else if (
    emailSignIn.value.length !== 0 &&
    passwordSignIn.value.length !== 0 &&
    data.length == 0
  ) {
    signInRequired.innerText = "Please sign up first";
  } else {
    checkData();
  }
});

signUpButton.addEventListener("click", function () {
  var re = /\S+@\S+\.\S+/;
  var passRe = /(?=.*?[0-9])/;
  if (
    nameSignUp.value.length == 0 ||
    emailSignUp.value.length == 0 ||
    passwordSignUp.value.length == 0
  ) {
    signUpRequired.innerText = "All inputs are required";
  } else if (re.test(emailSignUp.value) == false) {
    signUpRequired.innerText = "Enter a valid email";
  } else if (passwordSignUp.value.length < 8) {
    signUpRequired.innerText = "be at least 8 characters";
  } else if (passRe.test(passwordSignUp.value) == false) {
    signUpRequired.innerText = "password must contain at least one digit";
  } else if (checkUserExist()) {
    signUpRequired.innerText = "User already exists";
  } else {
    getData();
  }
});

// clear errors with keypress;
for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", function () {
    signInRequired.innerText = "";
    signUpRequired.innerText = "";
  });
}
