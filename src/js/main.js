window.onload = function () {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  // ------- Change Form Login, Form Register, Form Forgot Password -------

  $(".button-box .line").style.left =
    $(".button-box .toggle-btn.active").offsetLeft + "px";

  $$(".button-box .toggle-btn").forEach((tab, index) => {
    const pane = $$(".form-box .tab-pane")[index];
    tab.onclick = function () {
      $(".button-box .toggle-btn.active").classList.remove("active");
      $(".tab-pane.active").classList.remove("active");

      $(".button-box .line").style.left = this.offsetLeft + "px";

      this.classList.add("active");
      pane.classList.add("active");
    };
  });

  // ------- Change Step in form register -------

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
      if (timing != 0) {
        clearInterval(myTimer);
        $("#number-otp").value = "";
        $("#number-otp").style.border = "1px solid #eaf0fd";
        $("#btn-submit-step2").setAttribute("disabled", true);
      }
      if (timingEmail != 0) {
        clearInterval(myTimerEmail);
        $("#number-otp-email").value = "";
        $("#number-otp-email").style.border = "1px solid #eaf0fd";
        $("#btn-submit-step3").setAttribute("disabled", true);
      }
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

  // ------- Handle Modal Form in the Form Register -------
  function modelOpen() {
    $(".custom-model-main").classList.add("model-open");
  }

  function modelClose() {
    $(".custom-model-main").classList.remove("model-open");
  }

  function handleReloadPage() {
    location.reload();
  }

  // ------- Handle Submit Step Events in the Form Register -------
  function handleSubmitStep1(event) {
    event.preventDefault();
    checkValidateStep1();
    hideLastPhoneNumber();
    countdown();
  }

  function handleSubmitStep2(event) {
    e.preventDefault();
    hideInformationEmail();
    countdownEmail();

    const valueOTP = $("#number-otp").value.trim();
    if (valueOTP.length > 0 && valueOTP.length === 6) {
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();
    }
  }

  function handleSubmitStep3(event) {
    e.preventDefault();

    const valueOTPEmail = $("#number-otp-email").value.trim();
    if (valueOTPEmail.length > 0 && valueOTPEmail.length === 6) {
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();
    }
  }

  function handleSubmitStep4(event) {
    e.preventDefault();
    const valuePassword = $("#password").value.trim();
    const valuePasswordConfirm = $("#password-confirm").value.trim();
    const passwordConfirm = $("#password-confirm");
    const password = $("#password");
    const valuePasswordMatch = valuePassword.match(
      /[a-zA-Z0-9,!,@,#,$,%,^,&,*,_,~,(,)]+/g
    );

    if (valuePassword !== String(valuePasswordMatch)) {
      setErrorFor(password, "Mật khẩu không được phép có dấu");
    } else if (valuePasswordConfirm !== valuePassword) {
      setSuccessFor(password);
      setErrorFor(passwordConfirm, "Mật khẩu không trùng nhau");
    } else {
      setSuccessFor(passwordConfirm);
      modelOpen();
    }
  }

  // ------- Handle Step 1 in the Form Register -------
  let booleanCheckValidatePhone = false;
  let booleanCheckValidateUsername = false;
  let booleanCheckValidateEmail = false;

  function handleInput() {
    displayIconRemove();
    removeValue();
    changeBorder();
    disabledButton();
  }

  function displayIconRemove() {
    const valuePhoneEmail = $("#phone-email").value.trim();
    const valuePasswordLogin = $("#password-login").value.trim();
    const valuePhone = $("#phone").value.trim();
    const valueUsername = $("#username").value.trim();
    const valueEmail = $("#email").value.trim();
    const valueOTP = $("#number-otp").value.trim();
    const valueOTPEmail = $("#number-otp-email").value.trim();
    const valuePassword = $("#password").value.trim();
    const valuePasswordConfirm = $("#password-confirm").value.trim();

    valuePhoneEmail.length <= 0
      ? document
          .getElementsByClassName("input-group")[0]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[0]
          .classList.add("active-icon");

    valuePasswordLogin.length <= 0
      ? document
          .getElementsByClassName("input-group")[1]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[1]
          .classList.add("active-icon");
    valuePhone.length <= 0
      ? document
          .getElementsByClassName("input-group")[2]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[2]
          .classList.add("active-icon");

    valueUsername.length <= 0
      ? document
          .getElementsByClassName("input-group")[3]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[3]
          .classList.add("active-icon");

    valueEmail.length <= 0
      ? document
          .getElementsByClassName("input-group")[4]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[4]
          .classList.add("active-icon");

    valueOTP.length <= 0
      ? document
          .getElementsByClassName("input-group")[5]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[5]
          .classList.add("active-icon");

    valueOTPEmail.length <= 0
      ? document
          .getElementsByClassName("input-group")[6]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[6]
          .classList.add("active-icon");

    valuePassword.length <= 0
      ? document
          .getElementsByClassName("input-group")[7]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[7]
          .classList.add("active-icon");

    valuePasswordConfirm.length <= 0
      ? document
          .getElementsByClassName("input-group")[7]
          .classList.remove("active-icon")
      : document
          .getElementsByClassName("input-group")[7]
          .classList.add("active-icon");
  }

  function removeValue() {
    const removePhoneEmail = $("#phone-email + .remove");
    const removePhone = $("#phone + .remove");
    const removeUsername = $("#username + .remove");
    const removeEmail = $("#email + .remove");
    const removeOTP = $("#number-otp + .remove");
    const removeOTPEmail = $("#number-otp-email + .remove");

    removePhoneEmail.addEventListener("click", () => {
      $("#phone-email").value = "";
      document
        .getElementsByClassName("input-group")[0]
        .classList.remove("active-icon");
      $("#phone-email").style.border = "1px solid #eaf0fd";
    });
    removePhone.addEventListener("click", () => {
      $("#phone").value = "";
      document
        .getElementsByClassName("input-group")[2]
        .classList.remove("active-icon");
      $("#phone").style.border = "1px solid #eaf0fd";
    });

    removeUsername.addEventListener("click", () => {
      $("#username").value = "";
      document
        .getElementsByClassName("input-group")[3]
        .classList.remove("active-icon");
      $("#username").style.border = "1px solid #eaf0fd";
    });

    removeEmail.addEventListener("click", () => {
      $("#email").value = "";
      document
        .getElementsByClassName("input-group")[4]
        .classList.remove("active-icon");
      $("#email").style.border = "1px solid #eaf0fd";
    });

    removeOTP.addEventListener("click", () => {
      $("#number-otp").value = "";
      document
        .getElementsByClassName("input-group")[5]
        .classList.remove("active-icon");
      $("#number-otp").style.border = "1px solid #eaf0fd";
    });
    removeOTPEmail.addEventListener("click", () => {
      $("#number-otp-email").value = "";
      document
        .getElementsByClassName("input-group")[6]
        .classList.remove("active-icon");
      $("#number-otp").style.border = "1px solid #eaf0fd";
    });
  }

  function changeBorder() {
    const valuePhoneEmail = $("#phone-email").value.trim();
    const valuePasswordLogin = $("#password-login").value.trim();
    const valuePhone = $("#phone").value.trim();
    const valueUsername = $("#username").value.trim();
    const valueEmail = $("#email").value.trim();
    const valueOTP = $("#number-otp").value.trim();
    const valueOTPEmail = $("#number-otp-email").value.trim();
    const valuePassword = $("#password").value.trim();
    const valuePasswordConfirm = $("#password-confirm").value.trim();
    $("#phone-email").style.border = valuePhoneEmail
      ? "1px solid #0979fd"
      : "1px solid #eaf0fd";
    $("#password-login").style.border = valuePasswordLogin
      ? "1px solid #0979fd"
      : "1px solid #eaf0fd";
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
    $("#number-otp-email").style.border = valueOTPEmail
      ? "1px solid #0979fd"
      : "1px solid #eaf0fd";
    $("#password").style.border = valuePassword
      ? "1px solid #0979fd"
      : "1px solid #eaf0fd";
    $("#password-confirm").style.border = valuePasswordConfirm
      ? "1px solid #0979fd"
      : "1px solid #eaf0fd";
  }

  function checkValidateStep1() {
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
    booleanCheckValidatePhone = false;

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
    const USERNAME_NUM_REG = /[0-9]/;
    const USERNAME_SPECIAL_CHAR_REG = /([!,@,#,$,%,^,&,*,_,~,(,)])/;
    booleanCheckValidateUsername = false;

    // Validate username
    if (valueUsername === "") {
      setErrorFor(username, "Vui lòng không bỏ trống");
    } else if (valueUsername.match(USERNAME_SPECIAL_CHAR_REG)) {
      setErrorFor(username, "Họ và tên không chứa ký tự đặc biệt");
    } else if (valueUsername.match(USERNAME_NUM_REG)) {
      setErrorFor(username, "Họ và tên không chứa số");
    } else {
      setSuccessFor(username);
      booleanCheckValidateUsername = true;
    }
    return booleanCheckValidateUsername;
  }

  function validateEmail() {
    const valueEmail = $("#email").value.trim();
    const EMAIL_REG = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    booleanCheckValidateEmail = false;

    // Validate email
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

  function validatePassword() {
    let valuePassword = password.value.trim();
    const PASS_REG = /[\uE000-\uF8FF]/g;
    booleanCheckValidatePassword = false;

    // Validate password
    if (valuePassword === "") {
      setErrorFor(password, "Vui lòng không bỏ trống");
    } else if (valueUsername.match(PASS_REG)) {
      setErrorFor(password, "Pass không chứa ký tự đặc biệt");
    } else {
      setSuccessFor(password);
      booleanCheckValidatePassword = true;
    }
    return booleanCheckValidatePassword;
  }

  function setErrorFor(input, message) {
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

  // ------- Handle Step 2 in the Form Register -------
  let myTimer, timing;
  let myTimerEmail, timingEmail;

  function countdown() {
    timing = String(60).padStart(2, "0");
    $("#timing").innerHTML = timing;
    $("#begin").setAttribute("disabled", true);
    $("#begin").style.color = "#8e9abb";
    $("#begin").style.cursor = "auto";
    myTimer = setInterval(function () {
      --timing;
      seconds = String(timing).padStart(2, "0");
      $("#timing").innerHTML = seconds;

      if (timing <= 0) {
        clearInterval(myTimer);
        $("#begin").removeAttribute("disabled");
        $("#begin").style.color = "#0979fd";
        $("#timing").innerHTML = 60;
        $("#begin").style.cursor = "pointer";
      }
    }, 100);

    return timing;
  }
  function countdownEmail() {
    timingEmail = String(60).padStart(2, "0");
    $("#timingEmail").innerHTML = timingEmail;
    $("#beginEmail").setAttribute("disabled", true);
    $("#beginEmail").style.color = "#8e9abb";
    $("#beginEmail").style.cursor = "auto";
    myTimerEmail = setInterval(function () {
      --timingEmail;
      seconds = String(timingEmail).padStart(2, "0");
      $("#timingEmail").innerHTML = seconds;

      if (timingEmail <= 0) {
        clearInterval(myTimerEmail);
        $("#beginEmail").removeAttribute("disabled");
        $("#beginEmail").style.color = "#0979fd";
        $("#timingEmail").innerHTML = 60;
        $("#beginEmail").style.cursor = "pointer";
      }
    }, 100);

    return timingEmail;
  }

  function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
    return true;
  }

  function hideLastPhoneNumber() {
    $(".last-four-number").innerHTML = $("#phone")
      .value.trim()
      .replace(/\d{7}(\d{3})/, "••••••$1");
  }

  // ------- Handle Step 3 in the Form Register -------
  function hideInformationEmail() {
    $(".information-email").innerHTML = $("#email")
      .value.trim()
      .replace(/(.{3})(.*)(?=@)/, function (gp1, gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
          gp2 += "*";
        }
        return gp2;
      });
  }

  // ------- Handle Step 4 in the Form Register -------
  let booleanLowerUpperCase = false;
  let booleanSpecialChar = false;
  let booleanEightChar = false;

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
  function showPassWordLogin() {
    let elementPassword = $(".input-group #password-login");
    let iconEye = $("#icon-eye-login");
    let iconEyeHidden = $("#icon-eye-hidden-login");

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
    const valuePhoneEmail = $("#phone-email").value.trim();
    const valuePasswordLogin = $("#password-login").value.trim();
    const valuePhone = $("#phone").value.trim();
    const valueUsername = $("#username").value.trim();
    const valueEmail = $("#email").value.trim();
    const valueOTP = $("#number-otp").value.trim();
    const valueOTPEmail = $("#number-otp-email").value.trim();

    const valuePassword = $("#password").value.trim();
    const valuePasswordConfirm = $("#password-confirm").value.trim();
    const btnSubmitLogin = $("#btn-submit-login");
    const btnSubmitStep1 = $("#btn-submit-step1");
    const btnSubmitStep2 = $("#btn-submit-step2");
    const btnSubmitStep3 = $("#btn-submit-step3");
    const btnSubmitStep4 = $("#btn-submit-step4");
    const booleanCheckbox = $("#policy").checked;
    const iconCheck = $(".checkbox-group");
    // Disable buttons submit login
    if (valuePhoneEmail !== "" && valuePasswordLogin !== "") {
      btnSubmitLogin.removeAttribute("disabled");
    } else {
      btnSubmitLogin.setAttribute("disabled", true);
    }

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
    // Disable buttons submit step 2
    if (valueOTP !== "" && valueOTP.length == 6) {
      btnSubmitStep2.removeAttribute("disabled");
    } else {
      btnSubmitStep2.setAttribute("disabled", true);
    }
    // Disable buttons submit step 3
    if (valueOTPEmail !== "" && valueOTPEmail.length == 6) {
      btnSubmitStep3.removeAttribute("disabled");
    } else {
      btnSubmitStep3.setAttribute("disabled", true);
    }
    // Disable buttons submit step 4
    if (
      valuePassword !== "" &&
      valuePasswordConfirm !== "" &&
      booleanLowerUpperCase === true &&
      booleanSpecialChar === true &&
      booleanEightChar === true
    ) {
      btnSubmitStep4.removeAttribute("disabled");
    } else {
      btnSubmitStep4.setAttribute("disabled", true);
    }
  }

  function handleValuePassword() {
    checkStrengthPass();
    disabledButton();
  }
};
