document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.catalog__country').forEach(function (tabsBtn) {
        console.log(tabsBtn)
        tabsBtn.addEventListener('click', function (event) {
            const path = event.currentTarget.dataset.path
            console.log(path)
            document.querySelectorAll('.tabs-panel').forEach(function (tabsContent) {
                tabsContent.classList.remove('tabs-panel-active')
                console.log(tabsContent)
            });
            document.querySelectorAll(".catalog__country").forEach(el => {
                el.classList.remove("btn-active");
            });
            document.querySelector(`[data-target="${path}"]`).classList.add('tabs-panel-active');
            this.classList.add('btn-active');
        })
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.catalog__content-text').forEach(function (tabsBtn2) {
        console.log(tabsBtn2)
        tabsBtn2.addEventListener('click', function (event2) {
            const path2 = event2.currentTarget.dataset.path
            console.log(path2)
            document.querySelectorAll('.portrait-panel').forEach(function (tabsContent2) {
                tabsContent2.classList.remove('portrait-panel-active')
                console.log(tabsContent2)
            });
            document.querySelector(`[data-target="${path2}"]`).classList.add('portrait-panel-active');
            function scroll() {
                document.querySelector(`[data-target="${path2}"]`).scrollIntoView({behavior: "smooth"})
            };
            if (document.documentElement.clientWidth < 667) {
                scroll();
            }
        });
    });
});

