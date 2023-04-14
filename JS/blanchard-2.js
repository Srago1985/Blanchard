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


const initMenu = () => {
    const form = document.querySelectorAll('.header2__menu-container');
    const tel = document.querySelectorAll('.header2__item-head');
    let open;

    document.addEventListener('click', (event) => {
        const elem = event.target;
        if (open && (elem === open || open.contains(elem))) return false;

        if (elem.classList.contains('header2__item-head')) {
            for (let i = 0; i < tel.length; i++) {
                if (elem === tel[i]) {
                    if (open && open !== form[i]) {
                        open.classList.remove("show");
                    }
                    open = form[i];
                    open.classList.toggle("show");
                    return false;
                }
            }
        }

        if (open) {
            open.classList.remove("show");
        }
    });
};

initMenu();

const classToggle = (target) => {
    const head = document.querySelectorAll('.header2__item-head');
    if (target.closest('.header2__item-head') && target.closest('.click')) {
        target.closest('.header2__item-head').classList.remove('click');
        return;
    }
    head.forEach(item => item.classList.remove('click'));

    if (target.closest('.header2__item-head')) {
        target.closest('.header2__item-head').classList.add('click');
    }
}

const changeHidden = () => {
    let cards = document.querySelectorAll(".events__card-hidden");
    let exh = document.querySelector(".exhibition");

    cards.forEach(el => el.classList.toggle("hidden"));

    if (document.documentElement.clientWidth < 993) {
        exh.classList.toggle("hidden");
    }
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

const toggleShow = (event, selectors) => {
    if (selectors.every(selector => !event.target.closest(selector))) {
        selectors.forEach(selector => {
            document.querySelector(selector).classList.remove('show');
        });
    }
}

const smoothScroll = (selector) => {
    const element = document.querySelector(selector);
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

document.addEventListener('click', (event) => {
    // Toggle click class
    classToggle(event.target);

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
        changeHidden();
        changeText();
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

