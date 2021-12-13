const head = document.querySelectorAll('.header2__item-head');

const classToggle = (target) => {
    if (target.closest('.header2__item-head') && target.closest('.click')) {
        target.closest('.header2__item-head').classList.remove('click');
        return
    }
    head.forEach(item => item.classList.remove('click'));

    if (target.closest('.header2__item-head')) {
        target.closest('.header2__item-head').classList.add('click');
    }
}

document.addEventListener('click', ({ target }) => {
    classToggle(target);
});

function init() {
    
    var form = document.querySelectorAll('.header2__menu-container'),
        tel = document.querySelectorAll('.header2__item-head'),
        open;
    document.onclick = function (event) {
        var elem = event.target;
        if (open && (elem === open || open.contains(elem))) return false;
        if (elem.classList.contains('header2__item-head')) {
            for (var i = 0; i < tel.length; i++) {
                if (elem === tel[i]) break
            }
            if (open && open !== form[i]) open.classList.remove("show");
            open = form[i];
            open.classList.toggle("show");
            return false;
        }
        open && open.classList.remove("show");
    }
}
init ();

const pic = document.querySelector(".header__search-pic");
const input = document.querySelector(".header__search-input");
const search = document.querySelector(".header__search");
const lupe = document.querySelector(".header__search-pic320");
const button = document.querySelector(".header__search-button");
const cross = document.querySelector(".header__search-close");

pic.addEventListener("click", picClick);
cross.addEventListener("click", picClick);
function picClick() {
    
    input.classList.toggle("show");
    lupe.classList.toggle("show"); 
    search.classList.toggle("open");
    pic.classList.toggle ("close");
    button.classList.toggle("show");
    if (document.documentElement.clientWidth < 993) {
        cross.classList.toggle("show");
    }
};

document.body.addEventListener("click", function (x) {
    var close = x.target   

    console.log(x.target)
    if (!x.target.closest(".header__search")) {
        input.classList.remove("show");
        lupe.classList.remove("show"); 
        search.classList.remove("open");
        pic.classList.remove("close");
        button.classList.remove("show");
        cross.classList.remove("show")
    }
});

let cards = document.querySelectorAll(".events__card-hidden");
let more = document.querySelector(".events__btn")
let exh = document.querySelector(".exhibition")

let changeHidden = function() {
    cards.forEach(el => el.classList.toggle("hidden"));
    if (document.documentElement.clientWidth < 770) {
        exh.classList.toggle("hidden")
    }
};

let changeText = function() {
    more.classList.toggle('turn');
    if (more.classList.contains('turn')) {
        more.textContent = 'Свернуть'
    } else {
        more.textContent = 'Все события'
    }
}

more.addEventListener('click', changeHidden);
more.addEventListener('click', changeText);


(() => {
    const checkBtn = document.querySelector('.js-check-heading');

    checkBtn.addEventListener('click', function () {
        this.classList.toggle('is-active');
    });
})();


$('a[href^="#"').on('click', function () {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 400);
    return false;
});

$('.hero__subscribe').click(() => {
    $('html, body').animate({
        scrollTop: $('.contacts').offset().top
    }, 400);
});