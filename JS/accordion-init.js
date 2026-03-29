$(function () {
    const mobileBreakpoint = 640;
    const accordion = $(".accordion");

    function isMobileWidth() {
        return window.innerWidth <= mobileBreakpoint;
    }

    function getAccordionActiveState() {
        return isMobileWidth() ? false : 0;
    }

    function throttle(fn, delay) {
        let isThrottled = false;

        return function throttledFn(...args) {
            if (isThrottled) {
                return;
            }

            isThrottled = true;
            fn.apply(this, args);

            setTimeout(() => {
                isThrottled = false;
            }, delay);
        };
    }

    accordion.accordion({
        collapsible: true,
        animate: 300,
        heightStyle: "content",
        active: getAccordionActiveState()
    });

    const syncAccordionByBreakpoint = throttle(() => {
        accordion.accordion("option", "active", getAccordionActiveState());
    }, 200);

    window.addEventListener("resize", syncAccordionByBreakpoint);
});