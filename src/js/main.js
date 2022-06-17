const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// -------------------------------------Change Form Login, Form Register, Form Forgot Password
const tabs = $$(".button-box .toggle-btn");
const tabActive = $(".button-box .toggle-btn.active");
const panes = $$(".form-box .tab-pane");
const line = $(".button-box .line");

line.style.left = tabActive.offsetLeft + "px";

tabs.forEach((tab, index) => {
  const pane = panes[index];
  tab.onclick = function () {
    $(".button-box .toggle-btn.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";

    this.classList.add("active");
    pane.classList.add("active");
  };
});

// -------------------------------------Change Step in form register
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
// -------------------------------------Validate Step 1 in form register
const formStep1 = $(".form-step-1");
const formStep2 = $(".form-step-2");
const formStep3 = $(".form-step-3");
// feature check value input when typing
function showIcon() {
  displayIconRemove();
  removeValue();
  changeBorder();
  disabledButton();
}
function displayIconRemove() {
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  const valueOTP = $("#number-otp").value.trim();
  const valuePassword = $("#password").value.trim();
  const valuePasswordConfirm = $("#password-confirm").value.trim();

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

  if (valueOTP.length <= 0) {
    document
      .getElementsByClassName("input-group")[3]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[3]
      .classList.add("active-icon");
  }

  if (valuePassword.length <= 0) {
    document
      .getElementsByClassName("input-group")[4]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[4]
      .classList.add("active-icon");
  }

  if (valuePasswordConfirm.length <= 0) {
    document
      .getElementsByClassName("input-group")[5]
      .classList.remove("active-icon");
  } else {
    document
      .getElementsByClassName("input-group")[5]
      .classList.add("active-icon");
  }
}

function removeValue() {
  const removePhone = $("#phone + .remove");
  const removeUsername = $("#username + .remove");
  const removeEmail = $("#email + .remove");
  const removeOTP = $("#number-otp + .remove");

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

  removeOTP.addEventListener("click", () => {
    document.querySelector("#number-otp").value = "";
    document
      .getElementsByClassName("input-group")[3]
      .classList.remove("active-icon");
    $("#number-otp").style.border = "1px solid #eaf0fd";
  });
}

function changeBorder() {
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  const valueOTP = $("#number-otp").value.trim();
  const valuePassword = $("#password").value.trim();
  const valuePasswordConfirm = $("#password-confirm").value.trim();
  $("#phone").style.border = valuePhone
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#username").style.border = valueUsername
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#email").style.border = valueEmail
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#number-otp").style.border = valueOTP
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#password").style.border = valuePassword
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
  $("#password-confirm").style.border = valuePasswordConfirm
    ? "1px solid #0979fd"
    : "1px solid #eaf0fd";
}

// oncopy="return false"
// oncut="return false"
// onpaste="return false"
// check validate input when submit

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
  // console.log(input);
  const inputGroup = input.parentElement.parentElement;
  const small = inputGroup.querySelector("small");
  inputGroup.classList.add("error");
  small.innerText = message;
}

function setSuccessFor(input) {
  const inputGroup = input.parentElement.parentElement;
  inputGroup.classList.add("success");
  inputGroup.classList.contains("error") &&
    inputGroup.classList.remove("error");
}
// Submit Step 1
formStep1.addEventListener("submit", (e) => {
  e.preventDefault();
  checkValidate();
});
// Submit Step 2
formStep2.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueOTP = $("#number-otp").value.trim();
  if (valueOTP.length > 0) {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  }
});
// Submit Step 3
formStep3.addEventListener("submit", (e) => {
  e.preventDefault();
  const valuePassword = $("#password").value.trim();
  const valuePasswordConfirm = $("#password-confirm").value.trim();
  const passwordConfirm = $("#password-confirm");

  if (valuePasswordConfirm !== valuePassword) {
    setErrorFor(passwordConfirm, "Mật khẩu không trùng nhau");
  } else {
    setSuccessFor(passwordConfirm);
    modelOpen();
    console.log("Thành công");
  }
});
// -------------------------------------Validate Step 3 in form register

// Show password field
function showPassWord() {
  let elementPassword = $(".input-group #password");
  let iconEye = $("#icon-eye");
  let iconEyeHidden = $("#icon-eye-hidden");

  if (elementPassword.type === "password") {
    elementPassword.type = "text";
    iconEye.style.display = "none";
    iconEyeHidden.style.display = "block";
  } else {
    elementPassword.type = "password";
    iconEye.style.display = "block";
    iconEyeHidden.style.display = "none";
  }
}
function showConfirmPassWord() {
  let elementPasswordConfirm = $(".input-group #password-confirm");
  let iconEye = $("#icon-eye2");
  let iconEyeHidden = $("#icon-eye-hidden2");

  if (elementPasswordConfirm.type === "password") {
    elementPasswordConfirm.type = "text";
    iconEye.style.display = "none";
    iconEyeHidden.style.display = "block";
  } else {
    elementPasswordConfirm.type = "password";
    iconEye.style.display = "block";
    iconEyeHidden.style.display = "none";
  }
}
function modelOpen() {
  $(".custom-model-main").classList.add("model-open");
}
function modelClose() {
  $(".custom-model-main").classList.remove("model-open");
}

let booleanCheckValidatePhone = false;
let booleanCheckValidateUsername = false;
let booleanCheckValidateEmail = false;
let booleanLowerUpperCase = false;
let booleanSpecialChar = false;
let booleanEightChar = false;
function checkStrengthPass() {
  let lowerUpperCase = $(".low-upper-case");
  let specialChar = $(".one-special-char");
  let eightChar = $(".eight-character");
  let password = $("#password");
  let valuePassword = password.value.trim();

  // If password contains lower and upper case character
  if (valuePassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    booleanLowerUpperCase = true;
    lowerUpperCase.style.backgroundColor = "#00CB51";
  } else {
    booleanLowerUpperCase = false;
    lowerUpperCase.style.backgroundColor = "#d6dff6";
  }

  // If password has one special character
  if (valuePassword.match(/([!,@,#,$,%,^,&,*,_,~,(,)])/)) {
    booleanSpecialChar = true;
    specialChar.style.backgroundColor = "#00CB51";
  } else {
    booleanSpecialChar = false;
    specialChar.style.backgroundColor = "#d6dff6";
  }

  // If password is more than 7
  if (valuePassword.length > 7) {
    booleanEightChar = true;
    eightChar.style.backgroundColor = "#00CB51";
  } else {
    booleanEightChar = false;
    eightChar.style.backgroundColor = "#d6dff6";
  }
}

function disabledButton() {
  // console.log(">>>Disable");
  const valuePhone = $("#phone").value.trim();
  const valueUsername = $("#username").value.trim();
  const valueEmail = $("#email").value.trim();
  const valueOTP = $("#number-otp").value.trim();

  const valuePassword = $("#password").value.trim();
  const valuePasswordConfirm = $("#password-confirm").value.trim();
  const btnSubmitStep1 = $("#btn-submit-step1");
  const btnSubmitStep2 = $("#btn-submit-step2");
  const btnSubmitStep3 = $("#btn-submit-step3");
  const booleanCheckbox = $("#policy").checked;
  const iconCheck = $(".checkbox-group");

  if (booleanCheckbox === true) {
    iconCheck.classList.add("active");
  } else {
    iconCheck.classList.remove("active");
  }
  // Disable buttons submit step 1
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
  // Disable buttons submit step 1
  if (valueOTP !== "") {
    btnSubmitStep2.removeAttribute("disabled");
  } else {
    btnSubmitStep2.setAttribute("disabled", true);
  }
  // Disable buttons submit step 3
  if (
    valuePassword !== "" &&
    valuePasswordConfirm !== "" &&
    booleanLowerUpperCase === true &&
    booleanSpecialChar === true &&
    booleanEightChar === true
  ) {
    btnSubmitStep3.removeAttribute("disabled");
  } else {
    btnSubmitStep3.setAttribute("disabled", true);
  }
}

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

function validateOTP() {
  var myTimer,
    timing = String(60).padStart(2, "0");
  $("#timing").innerHTML = timing;
  $("#begin").setAttribute("disabled", true);
  $("#begin").style.color = "#8e9abb";
  myTimer = setInterval(function () {
    --timing;
    seconds = String(timing).padStart(2, "0");
    $("#timing").innerHTML = seconds;

    if (timing === 0) {
      clearInterval(myTimer);
      $("#begin").removeAttribute("disabled");
      $("#begin").style.color = "#0979fd";
      // $("#timing").innerHTML = 60;
    }
  }, 100);
}
