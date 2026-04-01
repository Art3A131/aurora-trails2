const wrapperOne = document.querySelector('.wrapper-1');
const leftButton = document.querySelector('.carousel-left');
const rightButton = document.querySelector('.carousel-right');
const leftButtonSmall = document.querySelector('.carousel-left-small');
const rightButtonSmall = document.querySelector('.carousel-right-small');
const imageContainer = document.querySelector('.image-container');
const galleryTitle = document.getElementById('galleryTitle');
const modal = document.getElementById('myModal');

let track = 0;
let counter = 1;
let autoPlay = null;
let slideIndex = 1;

const moveImagesLeft = function () {
  if (counter < imageContainer.childElementCount) {
    counter++;
    track = track - 100;
    wrapperOne.style.marginLeft = `${track}%`;
    animateTitle();
  } else {
    counter = 1;
    track = 0;
    wrapperOne.style.marginLeft = `${track}%`;
    animateTitle();
  }
};

const moveImagesRight = function () {
  if (counter > 1) {
    counter--;
    track = track + 100;
    wrapperOne.style.marginLeft = `${track}%`;
    animateTitle();
  } else {
    counter = imageContainer.childElementCount;
    track = -(counter - 1) * 100;
    wrapperOne.style.marginLeft = `${track}%`;
    animateTitle();
  }
};

function animateTitle() {
  galleryTitle.classList.remove('title-wave');
  void galleryTitle.offsetWidth;
  galleryTitle.classList.add('title-wave');
}

function startAutoPlay() {
  if (!autoPlay) {
    autoPlay = setInterval(moveImagesLeft, 3000);
  }
}

function stopAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = null;
}

function toggleAutoPlay() {
  if (autoPlay) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

rightButton.addEventListener('click', moveImagesLeft);
rightButtonSmall.addEventListener('click', moveImagesLeft);
leftButton.addEventListener('click', moveImagesRight);
leftButtonSmall.addEventListener('click', moveImagesRight);

imageContainer.addEventListener('mouseenter', stopAutoPlay);
imageContainer.addEventListener('mouseleave', startAutoPlay);
startAutoPlay();

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('demo');
  const captionText = document.getElementById('caption');

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

showSlides(slideIndex);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    if (modal.style.display === 'block') {
      plusSlides(1);
    } else {
      moveImagesLeft();
    }
  }

  if (event.key === 'ArrowLeft') {
    if (modal.style.display === 'block') {
      plusSlides(-1);
    } else {
      moveImagesRight();
    }
  }

  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'g' || event.key === 'G') {
    toggleAutoPlay();
  }
});

window.openModal = openModal;
window.closeModal = closeModal;
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;


const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});
