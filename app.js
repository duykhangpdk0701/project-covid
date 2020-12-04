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

    //when the loading page finish remove all loading page to improve performers
    loadingPage.addEventListener("transitionend", () => {
      loadingPage.remove();
    });
  });
};

const navSlide = () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const nav = document.querySelector(".nav__ul");
  const navLinks = document.querySelectorAll(".nav__ul li");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-ul-active");

    navLinks.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    hamburger.classList.toggle("toggle");
  });
  //when you click any  ul li it will screen before click hamburger
  navLinks.forEach((item) => {
    item.addEventListener("click", () => {
      nav.classList.remove("nav-ul-active");
      hamburger.classList.remove("toggle");
      navLinks.forEach((item2) => {
        if (item2.style.animation) {
          item2.style.animation = "";
        }
      });
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
  const spearCard = document.querySelectorAll(".spear__card");
  let delay = 0;
  //fade in title
  if (spearTitle.getBoundingClientRect().top < screenPosition) {
    spearTitle.classList.add("spear__title-fade-in");
  }
  //fade in description
  if (spearDescription.getBoundingClientRect().top < screenPosition) {
    spearDescription.classList.add("spear__description-fade-in");
  }
  //fade in each of card
  spearCard.forEach((item) => {
    if (item.getBoundingClientRect().top < screenPosition) {
      item.style.transitionDelay = `${(delay += 0.1)}s`;
      item.classList.add("spear-card-fade-in");
    }
  });
};

const fadeInSolution = () => {
  const screenPosition = window.innerHeight / 1.2;
  const solutionTitle = document.querySelector(".solution__title");
  const solutionDescription = document.querySelector(".solution__description");
  const solutionCard = document.querySelectorAll(".solution__card");
  let delay = 0;

  //fade in title
  if (solutionTitle.getBoundingClientRect().top < screenPosition) {
    solutionTitle.classList.add("solution-fade-in");
  }
  //fade in description
  if (solutionDescription.getBoundingClientRect().top < screenPosition) {
    solutionDescription.classList.add("solution-fade-in");
  }
  //fade in each of card
  solutionCard.forEach((item) => {
    if (item.getBoundingClientRect().top < screenPosition) {
      item.style.transitionDelay = `${(delay += 0.1)}s`;
      item.classList.add("solution-fade-in");
    }
  });
};

const renderCovidGlobal = (data) => {
  const globalCases = document.querySelector(".global-cases");
  const globalDead = document.querySelector(".global-dead");
  const globalRecover = document.querySelector(".global-recover");

  globalCases.textContent = data.TotalConfirmed;
  globalDead.textContent = data.TotalDeaths;
  globalRecover.textContent = data.TotalRecovered;
};

const renderCovidCountryFirstTime = (data) => {
  const iconFlag = document.querySelector(".tracker-icon-flag");
  const countryName = document.querySelector(".tracker-country-name");
  const countryCases = document.querySelector(".country-cases");
  const countryDead = document.querySelector(".country-dead");
  const countryRecover = document.querySelector(".country-recover");

  data.forEach((item) => {
    if (item.Country === "Viet Nam") {
      iconFlag.setAttribute(
        "src",
        `https://www.countryflags.io/${item.CountryCode.toLowerCase()}/flat/64.png`
      );
      countryName.textContent = "Việt Nam";
      countryCases.textContent = item.TotalConfirmed.toLocaleString();
      countryDead.textContent = item.TotalDeaths.toLocaleString();
      countryRecover.textContent = item.TotalRecovered.toLocaleString();
    }
  });
};

const sortData = (data) => {
  data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
};

const formatDataCountries = (data) => {
  data.forEach((item) => {
    item.TotalConfirmed = item.TotalConfirmed.toLocaleString();
    item.TotalDeaths = item.TotalDeaths.toLocaleString();
    item.TotalRecovered = item.TotalRecovered.toLocaleString();
  });
};

const formatDataGlobal = (data) => {
  data.TotalConfirmed = data.TotalConfirmed.toLocaleString();
  data.TotalDeaths = data.TotalDeaths.toLocaleString();
  data.TotalRecovered = data.TotalRecovered.toLocaleString();
};

const renderCovidTable = (data) => {
  const cardLine = document.querySelector(".tracker-board-content-table tbody");
  sortData(data);
  formatDataCountries(data);

  data.forEach((item, index) => {
    cardLine.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td><img class="flag-icon" src="https://www.countryflags.io/${
        item.CountryCode
      }/flat/64.png">${item.Country}</td>
      <td>${item.TotalConfirmed}</td>
      <td>${item.TotalDeaths}</td>
      <td>${item.TotalRecovered}</td>
    </tr>`;
  });
};

const getData = () => {
  fetch("https://api.covid19api.com/summary")
    .then((res) => res.json())
    .then((data) => {
      formatDataGlobal(data.Global);
      renderCovidGlobal(data.Global);
      renderCovidCountryFirstTime(data.Countries);
      renderCovidTable(data.Countries);
    });
};

const windowScrollEvent = () => {
  window.addEventListener("scroll", () => {
    stickyHeader();
    fadeInSpear();
    fadeInSolution();
  });
};

const app = () => {
  preLoading();
  navSlide();
  windowScrollEvent();

  getData();
};

app();
