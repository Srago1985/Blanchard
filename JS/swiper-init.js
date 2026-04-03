const Swiper = window.Swiper;

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 10000,
    },
});


const swiper1 = new Swiper('.swiper1', {
    // Optional parameters 
    slidesPerView: 1,
    spaceBetween: 20,
    grid: {
        rows: 1,
    },
    pagination: {
        el: '.swiper1__pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper1__buttons-next',
        prevEl: '.swiper1__buttons-prev',
    },
    breakpoints: {
        453: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
            grid: {
                fill: 'row',
                rows: 2,
                rowGap: 34,
            },
        },

        1240: {
            spaceBetween: 50,
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                fill: 'row',
                rows: 2,
                rowGap: 50,
            },
        },
    }
});

const swiper2 = document.querySelector('.newSwiper');
let mySwiper;
const eventsHiddenCards = document.querySelectorAll('.events__card-hidden');
const allEventsCards = document.querySelectorAll('.events__content-card.events__card');
const eventsMoreButton = document.querySelector('.events__btn');
const tabletBreakpoint = 992;

function throttle(fn, delay) {
    let isThrottled = false;
    let savedArgs = null;
    let savedThis = null;

    const invoke = (context, args) => {
        fn.apply(context, args);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedArgs) {
                const argsToRun = savedArgs;
                const thisToRun = savedThis;
                savedArgs = null;
                savedThis = null;
                invoke(thisToRun, argsToRun);
            }
        }, delay);
    };

    return function throttledFn(...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        invoke(this, args);
    };
}

function syncEventsSliderCardsHeight() {
    if (!swiper2) {
        return;
    }

    const sliderCards = Array.from(swiper2.querySelectorAll('.swiper-slide'));

    if (!sliderCards.length) {
        return;
    }

    sliderCards.forEach((card) => {
        card.style.height = 'auto';
    });

    if (window.innerWidth > tabletBreakpoint) {
        return;
    }

    const maxHeight = Math.max(...sliderCards.map((card) => card.offsetHeight));

    sliderCards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
    });
}

function mobileSlider() {
    if (!swiper2) {
        return;
    }

    if (!swiper2.dataset.mobile) {
        swiper2.dataset.mobile = 'false';
    }

    if (window.innerWidth <= tabletBreakpoint && swiper2.dataset.mobile === 'false') {
        allEventsCards.forEach((card) => card.classList.remove('hidden'));

        if (eventsMoreButton) {
            eventsMoreButton.classList.remove('turn');
            eventsMoreButton.textContent = 'Все события';
        }

        mySwiper = new Swiper(swiper2, {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
            loop: false,
            pagination: {
                el: '.newSwiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 24,
                },
            },
            observer: true,
            observeParents: true,
            on: {
                init: syncEventsSliderCardsHeight,
                resize: syncEventsSliderCardsHeight,
            },
        });

        mySwiper.update();
        mySwiper.updateSlides();
        mySwiper.updateSlidesClasses();
        syncEventsSliderCardsHeight();

        swiper2.dataset.mobile = 'true';
    }

    if (window.innerWidth > tabletBreakpoint && swiper2.dataset.mobile === 'true') {
        swiper2.dataset.mobile = 'false';

        if (mySwiper && !mySwiper.destroyed) {
            mySwiper.destroy(true, true);
            mySwiper = null;
        }

        const sliderWrapper = swiper2.querySelector('.swiper-wrapper');
        const sliderCards = Array.from(swiper2.querySelectorAll('.swiper-slide'));

        if (sliderWrapper) {
            sliderWrapper.style.removeProperty('transform');
            sliderWrapper.style.removeProperty('transition-duration');
            sliderWrapper.style.removeProperty('width');
        }

        sliderCards.forEach((card) => {
            card.style.removeProperty('width');
            card.style.removeProperty('margin-right');
            card.style.removeProperty('height');
        });

        eventsHiddenCards.forEach((card) => card.classList.add('hidden'));
        syncEventsSliderCardsHeight();
    }

}

mobileSlider();
    window.addEventListener('load', syncEventsSliderCardsHeight);

window.addEventListener('resize', throttle(mobileSlider, 200));


const swiper3 = new Swiper('.swiper4', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    grid: {
        rows: 1,
    },
    pagination: {
        el: '.swiper4__pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.swiper4__buttons-next',
        prevEl: '.swiper4__buttons-prev',
    },
    spaceBetween: 25,
    breakpoints: {
        451: {
            spaceBetween: 34,
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        769: {
            spaceBetween: 44,
            slidesPerView: 2,
            slidesPerGroup: 2,
        },

        1500: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
        }
    }    
});

const swiper4 = new Swiper('.swiper5', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
        nextEl: '.swiper5__buttons-next',
        prevEl: '.swiper5__buttons-prev',
    },
    
    breakpoints: {
        665: {
            spaceBetween: 34,
            slidesPerView: 2,
            slidesPerGroup: 2,
        },

        1023: {
            spaceBetween: 50,
            slidesPerView: 3,
            slidesPerGroup: 3,
        },        
    }
});