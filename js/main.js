const body = document.body;
const hero = document.getElementById('hero');
const heroCard = document.getElementById('heroCard');
const heroButton = document.getElementById('heroButton');
const promoButton = document.getElementById('promoButton');
const promoOverlay = document.getElementById('promoOverlay');
const closePopupButton = document.getElementById('closePopup');
const cursorGlow = document.getElementById('cursorGlow');
const tiltCards = document.querySelectorAll('.tilt-card');

function openPromo() {
  promoOverlay.classList.add('show');
}

function closePromo() {
  promoOverlay.classList.remove('show');
}

function pulseHero() {
  heroCard.classList.remove('pulse');
  void heroCard.offsetWidth;
  heroCard.classList.add('pulse');
}

function toggleTheme() {
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');
}

window.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }

  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * -10;
  hero.style.transform = `translateY(${y * 0.2}px)`;
  heroCard.style.transform = `rotateY(${x * 0.6}deg) rotateX(${y * 0.4}deg)`;
});

window.addEventListener('mouseout', () => {
  hero.style.transform = 'translateY(0)';
  heroCard.style.transform = 'rotateY(0) rotateX(0)';
});

heroButton.addEventListener('mouseenter', pulseHero);
promoButton.addEventListener('click', openPromo);
closePopupButton.addEventListener('click', closePromo);

promoOverlay.addEventListener('click', (event) => {
  if (event.target === promoOverlay) {
    closePromo();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 't' || event.key === 'T') {
    toggleTheme();
  }

  if (event.key === 'p' || event.key === 'P') {
    openPromo();
  }

  if (event.code === 'Space') {
    event.preventDefault();
    pulseHero();
  }

  if (event.key === 'Escape') {
    closePromo();
  }
});

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
  });
});
