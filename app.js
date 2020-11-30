const preLoading = () => {
  window.addEventListener("load", () => {
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.classList.add("loading-page-finish");
  });
};

const stickyHeader = () => {
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("nav-sticky", window.scrollY > 0);
  });
};

const app = () => {
  preLoading();
  stickyHeader();
};

app();
