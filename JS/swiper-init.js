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
        451: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
            grid: {
                fill: 'row',
                rows: 2,
            },
        },

        1240: {
            spaceBetween: 50,
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                fill: 'row',
                rows: 2,
            },
        },
    }
});

const swiper2 = document.querySelector('.newSwiper');
let mySwiper;

function mobileSlider() {
    if (window.innerWidth <= 767 && swiper2.dataset.mobile === 'false') {
        mySwiper = new Swiper(swiper2, {
            spaceBetween: 10,            
            loop: true,
            pagination: {
                el: '.newSwiper-pagination',
                clickable: true,
            },
        });

        swiper2.dataset.mobile = 'true';
    }

    if (window.innerWidth > 767 && swiper2.dataset.mobile === 'true') {
        swiper2.dataset.mobile = 'false';
        if (swiper2.classList.contains('swiper-container-initialized')) {
            mySwiper.destroy();
        }
    }
}

mobileSlider()

window.addEventListener('resize', () => {
    mobileSlider();    
});


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

        1400: {
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