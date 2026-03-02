document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.menu-burger');
  const nav = document.querySelector('.header__nav2');
  const login = document.querySelector('.header__login');
  burger.addEventListener('click', () => {
    [burger, nav, login].forEach(el => el.classList.toggle('open-menu'));
  });
  nav.addEventListener('click', () => {
    [burger, nav, login].forEach(el => el.classList.toggle('open-menu'));
  });
});
