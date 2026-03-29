const picClick = () => {
    const input = document.querySelector(".header__search-input");
    const lupe = document.querySelector(".header__search-pic320");
    const search = document.querySelector(".header__search");
    const pic = document.querySelector(".header__search-pic");
    const button = document.querySelector(".header__search-button");
    const cross = document.querySelector(".header__search-close");

    input.classList.toggle("show");
    lupe.classList.toggle("show");
    search.classList.toggle("open");
    pic.classList.toggle("close");
    button.classList.toggle("show");

    if (document.documentElement.clientWidth < 993) {
        if (cross) {
            cross.classList.toggle("show");
            cross.addEventListener("click", reset);
        }
    }
};


const reset = () => {
    const input = document.querySelector(".header__search-input");
    input.value = "";
};

document.querySelector(".header__search-pic").addEventListener("click", picClick);
document.querySelector(".header__search-close").addEventListener("click", picClick);
document.querySelector(".header__search-close").addEventListener("click", reset);


const header2Menus = document.querySelectorAll('.header2__menu-container');
const header2Heads = document.querySelectorAll('.header2__item-head');
let openHeader2Menu = null;

const handleHeader2MenuClick = (target) => {
    const headBtn = target.closest('.header2__item-head');

    if (openHeader2Menu && (target === openHeader2Menu || openHeader2Menu.contains(target))) {
        return;
    }

    if (headBtn) {
        const index = Array.from(header2Heads).indexOf(headBtn);

        if (index === -1) {
            return;
        }

        const menuToToggle = header2Menus[index];
        const shouldOpen = menuToToggle && !menuToToggle.classList.contains('header2__menu-container--open');

        header2Menus.forEach((menu) => menu.classList.remove('header2__menu-container--open'));
        header2Heads.forEach((item) => item.classList.remove('header2__item-head--open'));

        if (shouldOpen) {
            menuToToggle.classList.add('header2__menu-container--open');
            headBtn.classList.add('header2__item-head--open');
            openHeader2Menu = menuToToggle;
        } else {
            openHeader2Menu = null;
        }

        return;
    }

    header2Menus.forEach((menu) => menu.classList.remove('header2__menu-container--open'));
    header2Heads.forEach((item) => item.classList.remove('header2__item-head--open'));
    openHeader2Menu = null;
};

const changeHidden = () => {
    let cards = document.querySelectorAll(".events__card-hidden");

    cards.forEach(el => el.classList.toggle("hidden"));
};

const changeText = () => {
    let more = document.querySelector(".events__btn");

    more.classList.toggle('turn');
    if (more.classList.contains('turn')) {
        more.textContent = 'Свернуть';
    } else {
        more.textContent = 'Все события';
    }
};

const toggleClass = (selector, className) => {
    document.querySelector(selector).classList.toggle(className);
}

const smoothScroll = (selector) => {
    const element = document.querySelector(selector);
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

document.addEventListener('click', (event) => {
    // Header2 dropdown and arrow state
    handleHeader2MenuClick(event.target);

    // Search click handlers
    if (event.target.matches('.header__search-pic')) {
        picClick();
    }
    if (event.target.matches('.header__search-close')) {
        reset();
    }
    if (!event.target.closest('.header__search') && !event.target.matches('.header__search')) {
        const input = document.querySelector(".header__search-input");
        const lupe = document.querySelector(".header__search-pic320");
        const search = document.querySelector(".header__search");
        const pic = document.querySelector(".header__search-pic");
        const button = document.querySelector(".header__search-button");
        const cross = document.querySelector(".header__search-close");

        input.classList.remove("show");
        lupe.classList.remove("show");
        search.classList.remove("open");
        pic.classList.remove("close");
        button.classList.remove("show");

        if (document.documentElement.clientWidth < 993) {
            if (cross) {
                cross.classList.remove("show");
                cross.removeEventListener("click", reset);
            }
        }
    }

    // Events button click handler
    if (event.target.matches('.events__btn')) {
        const wasExpanded = event.target.classList.contains('turn');
        changeHidden();
        changeText();

        if (wasExpanded) {
            smoothScroll('.events');
        }
    }

    // Check heading click handler
    if (event.target.matches('.js-check-heading')) {
        toggleClass('.js-check-heading', 'is-active');
    }

    // Smooth scroll click handlers
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        smoothScroll(href);
    }
    if (event.target.matches('.hero__subscribe')) {
        smoothScroll('.contacts');
    }
});

