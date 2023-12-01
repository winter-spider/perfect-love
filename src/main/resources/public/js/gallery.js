let galleryModal = document.getElementById("gallery-modal");
let galleryContainer = document.getElementById("gallery-container");

let soundModal = document.getElementById("sound-modal");

let throwBack = [
  "./images/gallery/throwback-1.jpg",
  "./images/gallery/throwback-2.jpg",
  "./images/gallery/throwback-3.jpg",
];
let going = [
  "./images/gallery/going-5.jpg",
  "./images/gallery/going-2.jpg",
  "./images/gallery/going-3.jpg",
  "./images/gallery/going-4.jpg",
  "./images/gallery/going-1.jpg",
  "./images/gallery/going-6.jpg",
];
let future = [
  "./images/A (13).jpg",
  "./images/A (9).jpg",
  "./images/A (8).jpg",
  "./images/A (6).jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
  "./images/5.jpg",
  "./images/6.jpg",
  "./images/7.jpg",
  "./images/8.jpg",
];
let proposal = [
  "./images/gallery/proposal-1.jpg",
  "./images/gallery/proposal-2.jpg",
  "./images/gallery/proposal-3.jpg",
];
let court = [
  "./images/gallery/court-1.jpg",
  "./images/gallery/court-2.jpg",
  "./images/gallery/court-3.jpg",
];

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;

  if (targetId == "throwback") {
    displayModal(throwBack, "How it started");
  } else if (targetId == "going") {
    displayModal(going, "How it's going");
  } else if (targetId == "future") {
    displayModal(future, "The future we see");
  } else if (targetId == "proposal") {
    displayModal(proposal, "The Proposal");
  } else if (targetId == "court") {
    displayModal(court, "The Court Wedding");
  } else if (targetId == "close-gallery") {
    galleryContainer.innerHTML = "";
    galleryModal.style.display = "none";
  } else if (targetId == "enable-audio") {
    showGallery();
  }
});

function displayModal(albums, albumName) {
  enableSwiper();
  albums.forEach(function (album) {
    galleryContainer.innerHTML += bindGallery(album);
  });
  galleryModal.style.display = "block";
  document.getElementById("album-name").textContent = albumName;
}

function begin() {
  ScrollReveal().reveal(".left-spc", {
    distance: "40px",
    origin: "left",
    opacity: 0,
  });
  ScrollReveal().reveal(".right-spc", {
    distance: "40px",
    origin: "right",
    opacity: 0,
  });
  ScrollReveal().reveal(".bottom-img", {
    distance: "40px",
    origin: "bottom",
    opacity: 0,
  });
  ScrollReveal().reveal(".top-img", {
    distance: "40px",
    origin: "top",
    opacity: 0,
  });
}

function enableSwiper() {
  let swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      speed: 1000,
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}

function showGallery() {
  anime({
    targets: "#audio-container",
    duration: 2000,
    easing: "easeOutExpo",
    opacity: [1, 0],
  });
  anime({
    duration: 1100,
    easing: "easeOutExpo",
    update: function (anim) {
      let calculatedRgba;

      calculatedRgba = (0.685 - (0.685 * anim.progress) / 100).toFixed(3);
      soundModal.style.backgroundColor = `rgba(0, 0, 0, ${calculatedRgba})`;
    },
  });
  anime({
    duration: 1000,
    easing: "easeOutExpo",

    update: function (anim) {
      let calculatedBackdrop;
      calculatedBackdrop = (4 - (4 * anim.progress) / 100).toFixed(1);
      soundModal.style.backdropFilter = `blur(${calculatedBackdrop}px)`;
    },
    complete: function (anim) {
      document.getElementById("audio").play();
      document.getElementById("sound-modal").style.display = "none";
    },
  });
}

function bindGallery(image) {
  return `<div class="swiper-slide">
    <img src="${image}" alt="" style="width: 100%; border-radius: 4px;" />
  </div>`;
}
