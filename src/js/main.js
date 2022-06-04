window.onload = function () {
  const body = document.querySelector("body");

  // TODO: Toggle dark mode
  const modeToggle = document.querySelector(".dark-light-mode");

  let getMode = localStorage.getItem("mode");
  if (getMode && getMode === "dark-mode") {
    body.classList.add("dark");
  }

  // js code to toggle dark and light mode
  modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // js code to keep user selected mode even page refresh or file reopen
    if (body.classList.contains("dark")) {
      localStorage.setItem("mode", "dark-mode");
    } else {
      localStorage.setItem("mode", "light-mode");
    }
  });
};

window.onscroll = function () {
  const nav = document.querySelector(".nav");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    nav.classList.add("navbar-transparent");
  } else {
    nav.classList.remove("navbar-transparent");
  }
};
