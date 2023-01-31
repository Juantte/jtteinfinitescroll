let sliderWrap = document.querySelector(".slider-wrap");
let slider = document.querySelector(".slider");
let imgDiv = document.querySelector(".img-div");
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;
let initialScrollPos;

let items = [...document.querySelectorAll(".slider-item")];

// images.forEach((image, idx) => {
//   image.style.backgroundImage = `url(./images/${idx + 1}.jpg`;
// });

items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  slider.appendChild(clone);
  clones.push(clone);
});

function getClonesWidth() {
  let width = 0;
  clones.forEach((clone) => {
    width += clone.offsetWidth;
  });
  return width;
}

function getScrollPos() {
  return window.scrollY;
}

function scrollUpdate() {
  scrollPos = getScrollPos();
  if (clonesWidth + scrollPos >= sliderWidth) {
    window.scrollTo({ top: 2 });
  } else if (scrollPos <= 1) {
    window.scrollTo({ top: sliderWidth - clonesWidth - 2 });
  }

  slider.style.transform = `translateX(${-window.scrollY}px)`;

  requestAnimationFrame(scrollUpdate);
}

function onLoad() {
  calculateDimensions();
  console.log(calculateDimensions());
  document.body.style.height = `${sliderWidth}px`;
  window.scrollTo({ top: 2 });
  scrollUpdate();
}

function calculateDimensions() {
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
  console.log(sliderWidth, clonesWidth);
}

window.onresize = function () {
  // location.reload();
  calculateDimensions();
};

window.addEventListener("load", onLoad);

// onLoad();
