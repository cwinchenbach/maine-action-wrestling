document.querySelector('.menu-btn')?.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
});

document.querySelector('.subscribe-btn')?.addEventListener('click', () => {
  const button = document.querySelector('.subscribe-btn');
  button.textContent = 'You’re ringside ✓';
  button.style.background = '#2538c7';
});
