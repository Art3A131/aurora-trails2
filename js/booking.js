const acc = document.getElementsByClassName('accordion');
const bookingForm = document.getElementById('bookingForm');
const successOverlay = document.getElementById('successOverlay');
const closeSuccess = document.getElementById('closeSuccess');
const resetBtn = document.getElementById('resetBtn');
const resultText = document.getElementById('resultText');
const bookingTitle = document.getElementById('bookingTitle');
const inputs = document.querySelectorAll('input, textarea, select');

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    toggleAccordion(this);
  });
}

function toggleAccordion(button) {
  button.classList.toggle('active');
  const panel = button.nextElementSibling;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
  }
}

function openSuccessPopup() {
  successOverlay.classList.add('show');
}

function closeSuccessPopup() {
  successOverlay.classList.remove('show');
}

function animateBookingTitle() {
  bookingTitle.classList.remove('title-wave');
  void bookingTitle.offsetWidth;
  bookingTitle.classList.add('title-wave');
}

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim() || 'Пользователь';
  const tour = document.getElementById('tourSelect').value || 'выбранный тур';
  resultText.textContent = `${name}, ваша заявка на направление «${tour}» принята. Форма обработана через JavaScript без отправки на сервер.`;
  openSuccessPopup();
  animateBookingTitle();
});

resetBtn.addEventListener('click', () => {
  bookingForm.reset();
  inputs.forEach((input) => input.classList.remove('valid'));
  animateBookingTitle();
});

closeSuccess.addEventListener('click', closeSuccessPopup);

successOverlay.addEventListener('click', (event) => {
  if (event.target === successOverlay) {
    closeSuccessPopup();
  }
});

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      input.classList.add('valid');
    } else {
      input.classList.remove('valid');
    }
  });

  input.addEventListener('focus', animateBookingTitle);

  input.addEventListener('mouseover', () => {
    input.style.transform = 'translateY(-1px)';
  });

  input.addEventListener('mouseout', () => {
    input.style.transform = 'translateY(0)';
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSuccessPopup();
  }

  if (event.key === 'r' || event.key === 'R') {
    bookingForm.reset();
    inputs.forEach((input) => input.classList.remove('valid'));
  }

  if (event.key === '1') {
    toggleAccordion(acc[0]);
  }

  if (event.key === '2') {
    toggleAccordion(acc[1]);
  }

  if (event.key === '3') {
    toggleAccordion(acc[2]);
  }
});


const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});
