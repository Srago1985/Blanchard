const initCatalogTabs = () => {
    document.querySelectorAll('.catalog__country').forEach((tabsBtn) => {
        tabsBtn.addEventListener('click', (event) => {
            const path = event.currentTarget.dataset.path;
            const target = document.querySelector(`.tabs-panel[data-target="${path}"]`);

            if (!target) {
                return;
            }

            document.querySelectorAll('.tabs-panel').forEach((tabsContent) => {
                tabsContent.classList.remove('tabs-panel-active');
            });

            document.querySelectorAll('.catalog__country').forEach((el) => {
                el.classList.remove('btn-active');
            });

            target.classList.add('tabs-panel-active');
            tabsBtn.classList.add('btn-active');
        });
    });

    document.querySelectorAll('.catalog__content-text').forEach((tabsBtn) => {
        tabsBtn.addEventListener('click', (event) => {
            const path = event.currentTarget.dataset.path;
            const target = document.querySelector(`.portrait-panel[data-target="${path}"]`);

            if (!target) {
                return;
            }

            document.querySelectorAll('.portrait-panel').forEach((tabsContent) => {
                tabsContent.classList.remove('portrait-panel-active');
            });

            document.querySelectorAll('.catalog__content-text').forEach((el) => {
                el.classList.remove('catalog__content-text--active');
            });

            target.classList.add('portrait-panel-active');
            tabsBtn.classList.add('catalog__content-text--active');

            if (document.documentElement.clientWidth < 667) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalogTabs);
} else {
    initCatalogTabs();
}

