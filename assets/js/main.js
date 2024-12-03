"use strict";

// ===== change theme when 6:00pm =====
const refreshTime = function () {
  const now = new Date().getHours();
  // show light theme from 6 am to 6 pm
  if (now >= 6 && now <= 17) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};
setInterval(refreshTime, 0);

// ===== add event on multiple element =====
const addEventOnElements = function (elements, eventType, callback) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

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

// ===== fade content ====
const elementsArray = document.querySelectorAll("[data-ufade]");
const fadeIn = () => {
  for (let i = 0; i < elementsArray.length; i++) {
    let elem = elementsArray[i];
    let distInView =
      elem.getBoundingClientRect().top - window.innerHeight + 100;
    if (distInView < 0) {
      elem.classList.add("fadein");
    }
  }
};
window.addEventListener("scroll", fadeIn);
window.addEventListener("pageshow", fadeIn);

// ===== popup =====
const [popup, popupToggler, popupClose, headerContact] = [
  document.querySelectorAll("[data-popup]"),
  document.querySelectorAll("[data-popup-toggler]"),
  document.querySelectorAll("[data-popup-close]"),
  document.querySelector(".c-header_right"),
];

const closePopupAll = () => {
  stopVideo();
  headerContact.classList.remove("--hide");
  $(`[data-popup]`).fadeOut();
  $(`[data-popup-video]`).fadeOut();
  setTimeout(() => {
    $(`[data-popup-password]`).fadeIn();
  }, 500);
};

popupToggler.forEach((itemElement) => {
  const itemNumber = itemElement.getAttribute("data-popup-toggler");
  const itemHasAttribute = itemElement.hasAttribute("data-password");
  const popupElement = document.querySelector(`[data-popup="${itemNumber}"]`);

  itemElement.addEventListener("click", () => {
    closePopupAll();
    if (popupElement) {
      $(`[data-popup="${itemNumber}"]`).fadeIn();
      headerContact.classList.add("--hide");

      if (itemHasAttribute) {
        $(`[data-popup="${itemNumber}"] [data-popup-video]`).fadeOut();
      } else {
        $(`[data-popup="${itemNumber}"] [data-popup-video]`).fadeIn();
      }
    }
  });
});

popupClose.forEach((itemElement) => {
  itemElement.addEventListener("click", () => {
    closePopupAll();
    stopVideo();
  });
});

$(".detail_pass form button").on("click", function (e) {
  e.preventDefault();
  $(`[data-popup-password]`).fadeOut();
  setTimeout(() => {
    $(`[data-popup-video]`).fadeIn();
  }, 500);
});

const stopVideo = function () {
  const iframe = document.querySelectorAll(".detail_popup_video iframe");
  const video = document.querySelectorAll(".detail_popup_video video");
  // type iframe
  if (iframe.length) {
    iframe.forEach((item) => {
      const iframeSrc = item.src;
      item.src = iframeSrc;
    });
  }
  // type video
  if (video.length) {
    video.forEach((item) => {
      item.pause();
    });
  }
};

// ===== form =====
$("#js-checkbox").change(function () {
  let isCheck = this.checked;
  if (isCheck) {
    $(this).addClass("active");
    $(this).closest(".js-form").find(".js-send").addClass("active");
  } else {
    $(this).removeClass("active");
    $(this).closest(".js-form").find(".js-send").removeClass("active");
  }
});

$("#submit_btn").on("click", function (e) {
  e.preventDefault();
  $(".js-noti").fadeIn();
});

// ===== init =====
const init = () => {
  // #
  $("body").fadeIn("slow");
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
