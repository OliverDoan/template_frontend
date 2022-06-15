const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// // Change Form Login, Form Register, Form Forgot Password
// const tabs = $$(".button-box .toggle-btn");
// const tabActive = $(".button-box .toggle-btn.active");
// const panes = $$(".form-box .tab-pane");
// const line = $(".button-box .line");

// line.style.left = tabActive.offsetLeft + "px";

// tabs.forEach((tab, index) => {
//   const pane = panes[index];
//   tab.onclick = function () {
//     $(".button-box .toggle-btn.active").classList.remove("active");
//     $(".tab-pane.active").classList.remove("active");

//     line.style.left = this.offsetLeft + "px";

//     this.classList.add("active");
//     pane.classList.add("active");
//   };
// });
// ************************************************************************************************
// Multi Step in form register
const prevBtns = $$(".btn-prev");
const nextBtns = $$(".btn-next");
const progress = $("#progress");
const formSteps = $$(".form-step");
const progressSteps = $$(".step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  // find class form-step-active and remove it.
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, index) => {
    if (index < formStepsNum + 1) {
      progressStep.classList.add("step-active");
    } else {
      progressStep.classList.remove("step-active");
    }
  });
}
// Validate Step 1 in form register
const formStep1 = $(".form-step-1");

function showIconRemove() {
  displayIconRemove();
  removeValue();
  changeBorder();
  disabledButton();
}
function displayIconRemove() {
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  if (valuePhone.length <= 0) {
    document
      .getElementsByClassName("input-group")[0]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[0]
      .classList.add("active-icon");
  }

  if (valueUsername.length <= 0) {
    document
      .getElementsByClassName("input-group")[1]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[1]
      .classList.add("active-icon");
  }

  if (valueEmail.length <= 0) {
    document
      .getElementsByClassName("input-group")[2]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[2]
      .classList.add("active-icon");
  }
}

function removeValue() {
  const removePhone = $("#phone + .remove");
  const removeUsername = $("#username + .remove");
  const removeEmail = $("#email + .remove");
  removePhone.addEventListener("click", () => {
    document.querySelector("#phone").value = "";
    document
      .getElementsByClassName("input-group")[0]
      .classList.remove("active-icon");
    $("#phone").style.border = "1px solid #eaf0fd";
  });

  removeUsername.addEventListener("click", () => {
    $("#username").value = "";
    document
      .getElementsByClassName("input-group")[1]
      .classList.remove("active-icon");
    $("#username").style.border = "1px solid #eaf0fd";
  });

  removeEmail.addEventListener("click", () => {
    document.querySelector("#email").value = "";
    document
      .getElementsByClassName("input-group")[2]
      .classList.remove("active-icon");
    $("#email").style.border = "1px solid #eaf0fd";
  });
}

function changeBorder() {
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  $("#phone").style.border = valuePhone
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#username").style.border = valueUsername
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#email").style.border = valueEmail
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
}

function disabledButton() {
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  // let password = $("#password").value.trim();
  // let passwordConfirm = $("#password-confirm").value.trim();
  let btnSubmitStep1 = $("#btn-submit-step1");
  // let btnSubmitStep2 = $(".form-step-3 #btn");
  let booleanCheckbox = $("#policy").checked;
  if (
    valuePhone !== "" &&
    valueUsername !== "" &&
    valueEmail !== "" &&
    booleanCheckbox === true
  ) {
    btnSubmitStep1.removeAttribute("disabled");
  } else {
    btnSubmitStep1.setAttribute("disabled", true);
  }
}

formStep1.addEventListener("submit", (e) => {
  e.preventDefault();
  checkValidate();
});
let booleanCheckValidatePhone = false;
let booleanCheckValidateUsername = false;
let booleanCheckValidateEmail = false;
function checkValidate() {
  validatePhoneNumber();
  validateUsername();
  validateEmail();

  if (
    booleanCheckValidatePhone &&
    booleanCheckValidateUsername &&
    booleanCheckValidateEmail
  ) {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  }
}

function validatePhoneNumber() {
  const valuePhone = $("#phone").value.trim();

  // Validate phone number
  const PHONE_REG =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  if (valuePhone === "") {
    setErrorFor(phone, "Vui lòng không bỏ trống");
  } else if (/\D/.test(valuePhone)) {
    setErrorFor(phone, "Số điện thoại chỉ bao gồm ký tự 0 - 9");
  } else if (valuePhone.length > 10) {
    setErrorFor(phone, "Số điện thoại không vượt quá 10 số");
  } else if (!valuePhone.match(PHONE_REG)) {
    setErrorFor(phone, "Số điện thoại không đúng");
  } else {
    setSuccessFor(phone);
    booleanCheckValidatePhone = true;
  }
  return booleanCheckValidatePhone;
}

function validateUsername() {
  const valueUsername = $("#username").value.trim();

  // Validate username
  if (valueUsername === "") {
    setErrorFor(username, "Vui lòng không bỏ trống");
  } else {
    setSuccessFor(username);
    booleanCheckValidateUsername = true;
  }
  return booleanCheckValidateUsername;
}

function validateEmail() {
  const valueEmail = $("#email").value.trim();

  // Validate email
  const EMAIL_REG = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (valueEmail === "") {
    setErrorFor(email, "Vui lòng không bỏ trống");
  } else if (!valueEmail.match(EMAIL_REG)) {
    setErrorFor(email, "Email không đúng");
  } else {
    setSuccessFor(email);
    booleanCheckValidateEmail = true;
  }
  return booleanCheckValidateEmail;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement.parentElement; //.input-group
  const small = formControl.querySelector("small");
  formControl.classList.add("error");
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement.parentElement; //.input-group
  formControl.classList.add("success");
  formControl.classList.contains("error") &&
    formControl.classList.remove("error");
}

// // Show password field
// function showPassWord() {
//   let x = $(".input-group #password");
//   let y = $("#icon-eye");
//   let z = $("#icon-eye-active-icon");

//   if (x.type === "password") {
//     x.type = "text";
//     y.style.display = "none";
//     z.style.display = "block";
//   } else {
//     x.type = "password";

//     y.style.display = "block";
//     z.style.display = "none";
//   }
// }
// function showConfirmPassWord() {
//   let x = $(".input-group #password-confirm");
//   let y = $("#icon-eye2");
//   let z = $("#icon-eye-hidden2");
//   let z2 = document.querySelector("#icon-eye-hidden2");

//   if (x.type === "password") {
//     x.type = "text";
//     y.style.display = "none";
//     z.style.display = "block";
//   } else {
//     x.type = "password";

//     y.style.display = "block";
//     z.style.display = "none";
//   }
// }

// // Validate Step 3 in form register
// let lowerUpperCase = $(".low-upper-case");
// let specialChar = $(".one-special-char");
// let eightChar = $(".eight-character");
// let numberCondition = 0;
// password.addEventListener("keyup", function () {
//   let pass = password.value;
//   checkStrength(pass);
// });

// var booleanlowerUpperCase = false;
// var booleanspecialChar = false;
// var booleaneightChar = false;
// function checkStrength(password) {
//   // If password contains lower and upper case character
//   if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
//     booleanlowerUpperCase = true;
//     lowerUpperCase.style.backgroundColor = "#00CB51";
//   } else {
//     lowerUpperCase.style.backgroundColor = "#d6dff6";
//   }

//   // If password has one special character
//   if (password.match(/([!,@,#,$,%,^,&,*,_,~,(,)])/)) {
//     booleanspecialChar = true;
//     specialChar.style.backgroundColor = "#00CB51";
//   } else {
//     specialChar.style.backgroundColor = "#d6dff6";
//   }

//   // If password is more than 7
//   if (password.length > 7) {
//     booleaneightChar = true;
//     eightChar.style.backgroundColor = "#00CB51";
//   } else {
//     eightChar.style.backgroundColor = "#d6dff6";
//   }
// }
