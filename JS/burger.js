document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.menu-burger');
  const nav = document.querySelector('.header__nav2');
  const login = document.querySelector('.header__login');
  const header = document.querySelector('.header');
  const body = document.body;
  const mobileMenuBreakpoint = 1240;

  if (!burger || !nav || !login) {
    return;
  }

  const setMenuState = (isOpen) => {
    [burger, nav, login].forEach((el) => el.classList.toggle('open-menu', isOpen));
    body.classList.toggle('menu-open', isOpen);
    if (header) {
      header.classList.toggle('header--menu-open', isOpen);
    }
  };

  const syncMenuStateByViewport = () => {
    if (window.innerWidth > mobileMenuBreakpoint) {
      setMenuState(false);
    }
  };

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      syncMenuStateByViewport();
    }, 100);
  };

  setMenuState(false);
  syncMenuStateByViewport();
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', () => {
    syncMenuStateByViewport();
  });

  burger.addEventListener('click', () => {
    setMenuState(!burger.classList.contains('open-menu'));
  });

  nav.addEventListener('click', () => {
    setMenuState(false);
  });
});
