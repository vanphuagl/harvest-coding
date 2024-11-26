"use strict";

// ===== change theme when 6:00pm =====
function refreshTime() {
  const now = new Date().getHours();
  // show light theme from 6 am to 6 pm
  if (now >= 6 && now <= 17) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
setInterval(refreshTime, 1000);

// ===== appheight =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== lenis =====
let lenis;
const initLenis = () => {
  lenis = new Lenis({
    lerp: 0.05,
    smoothWheel: true,
  });
  lenis.on("scroll", (e) => {});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

// ===== scroll header =====
if (document.querySelector(".homepage")) {
  const header = document.querySelector(".c-header");
  "pageshow scroll".split(" ").forEach((evt) => {
    window.addEventListener(evt, () => {
      let scrollY = window.scrollY;
      let hSize =
        document.querySelector(".js-offset-top").getBoundingClientRect().top +
        scrollY;

      if (scrollY > hSize) {
        header.classList.remove("--hide");
      } else {
        header.classList.add("--hide");
      }
    });
  });
}

// ===== back to top =====
const backToTop = document.querySelector("[data-backtotop]");
backToTop.addEventListener("click", () => {
  lenis.stop();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  lenis.start();
});

// ===== init =====
const init = () => {
  // # app-height
  appHeight();
  // # lenis
  initLenis();
};

// ===== lazy loading =====
const ll = new LazyLoad({
  threshold: 0,
});

// ### ===== DOMCONTENTLOADED ===== ###
window.addEventListener("DOMContentLoaded", init);
