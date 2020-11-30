const fadeInHome = () => {
  let delay = 0;
  const bigText1 = document.querySelector(".big-text-line-1");
  const bigText2 = document.querySelector(".big-text-line-2");
  const description = document.querySelector(
    ".home .container-page .text-container .description"
  );
  const homeSvg = document.querySelector(".svg-home");
  const arr = [bigText1, bigText2, description];
  homeSvg.classList.add("svg-fade-in");
  for (let item of arr) {
    item.style.transitionDelay = `${(delay += 0.2)}s`;
    item.classList.add("text-fade-in");
  }
};

const preLoading = () => {
  window.addEventListener("load", () => {
    const loadingPage = document.querySelector(".loading-page");
    const navbar = document.querySelector(".nav");
    loadingPage.classList.add("loading-page-finish");
    fadeInHome();
    navbar.classList.add("nav-active");

    navbar.addEventListener("transitionend", () => {
      navbar.style.transitionDelay = "0s";
    });
  });
};

const stickyHeader = () => {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("nav-sticky", window.scrollY > 0);
};

const fadeInSpear = () => {
  const screenPosition = window.innerHeight / 1.2;
  const spearTitle = document.querySelector(".spear__title");
  const spearDescription = document.querySelector(".spear__description");
  const arr = [
    document.querySelectorAll(".spear__card img"),
    document.querySelectorAll(".spear__card h1"),
    document.querySelectorAll(".spear__card p"),
  ];
  //fade in title
  if (spearTitle.getBoundingClientRect().top < screenPosition) {
    spearTitle.classList.add("spear__title-fade-in");
  }
  //fade in description
  if (spearDescription.getBoundingClientRect().top < screenPosition) {
    spearDescription.classList.add("spear__description-fade-in");
  }
  //fade in img , h1, p
  arr.forEach((item) => {
    if (item[0].getBoundingClientRect().top < screenPosition) {
      let delay = 0;
      item.forEach((item2) => {
        item2.style.transitionDelay = `${(delay += 0.1)}s`;
        item2.classList.add("child-card-fade-in");
      });
    }
  });
};

const fadeInSolution = () => {
  const screenPosition = window.innerHeight / 1.2;
  const solutionTitle = document.querySelector(".solution__title");
  const solutionDescription = document.querySelector(".solution__description");
  const arr = [
    document.querySelectorAll(".solution__card img"),
    document.querySelectorAll(".solution__card h1"),
    document.querySelectorAll(".solution__card p"),
  ];

  if (solutionTitle.getBoundingClientRect().top < screenPosition) {
    solutionTitle.classList.add("solution-fade-in");
  }

  if (solutionDescription.getBoundingClientRect().top < screenPosition) {
    solutionDescription.classList.add("solution-fade-in");
  }

  arr.forEach((item) => {
    if (item[0].getBoundingClientRect().top < screenPosition) {
      let delay = 0;
      item.forEach((item2) => {
        item2.style.transitionDelay = `${(delay += 0.1)}s`;
        item2.classList.add("solution-fade-in");
      });
    }
  });
};

const fletchAPI = () => {};

const windowScrollEvent = () => {
  window.addEventListener("scroll", () => {
    stickyHeader();
    fadeInSpear();
    fadeInSolution();
  });
};

const app = () => {
  preLoading();
  windowScrollEvent();
};

app();
