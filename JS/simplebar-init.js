document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.header2__menu').forEach(elem => {
        new SimpleBar(elem)
    })
});

