/**
 * Blanchard - Главный файл приложения
 * Объединяет всю основную логику сайта
 * Оптимизирован для производительности
 */

// ============================================
// 1. БУРГЕР-МЕНЮ
// ============================================
class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.menu-burger');
        this.nav = document.querySelector('.header__nav');
        this.login = document.querySelector('.header__login');
        this.body = document.body;
        
        if (!this.burger || !this.nav || !this.login) {
            console.warn('Burger menu elements not found');
            return;
        }
        
        this.init();
    }
    
    toggleMenu() {
        const isOpen = this.burger.classList.contains('open-menu');
        
        this.burger.classList.toggle('open-menu');
        this.nav.classList.toggle('open-menu');
        this.login.classList.toggle('open-menu');
        this.body.style.overflow = isOpen ? '' : 'hidden';
    }
    
    closeMenu() {
        if (this.burger.classList.contains('open-menu')) {
            this.burger.classList.remove('open-menu');
            this.nav.classList.remove('open-menu');
            this.login.classList.remove('open-menu');
            this.body.style.overflow = '';
        }
    }
    
    init() {
        this.burger.addEventListener('click', () => this.toggleMenu());
        
        this.nav.addEventListener('click', (e) => {
            if (e.target.matches('a')) {
                this.closeMenu();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = this.burger.contains(e.target) || 
                                     this.nav.contains(e.target) || 
                                     this.login.contains(e.target);
            
            if (!isClickInsideMenu && this.burger.classList.contains('open-menu')) {
                this.closeMenu();
            }
        });
    }
}

// ============================================
// 2. АККОРДЕОНЫ
// ============================================
class Accordion {
    constructor(element) {
        this.accordion = element;
        this.headers = element.querySelectorAll('.catalog__country-head');
        this.contents = element.querySelectorAll('.catalog__country-content');
        this.animationSpeed = 300;
        
        this.init();
    }
    
    slideToggle(element, isOpening) {
        if (isOpening) {
            element.style.display = 'block';
            const height = element.scrollHeight;
            element.style.height = '0px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${this.animationSpeed}ms ease`;
            
            element.offsetHeight;
            element.style.height = height + 'px';
            
            setTimeout(() => {
                element.style.height = 'auto';
                element.style.overflow = '';
            }, this.animationSpeed);
        } else {
            const height = element.scrollHeight;
            element.style.height = height + 'px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${this.animationSpeed}ms ease`;
            
            element.offsetHeight;
            element.style.height = '0px';
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            }, this.animationSpeed);
        }
    }
    
    toggleSection(header, content) {
        const isOpen = header.classList.contains('ui-accordion-header-active');
        
        header.classList.toggle('ui-accordion-header-active');
        content.classList.toggle('ui-accordion-content-active');
        
        this.slideToggle(content, !isOpen);
        
        const button = header.querySelector('button, .catalog__head-data');
        if (button) {
            button.setAttribute('aria-expanded', !isOpen);
        }
    }
    
    init() {
        this.contents.forEach(content => {
            content.style.display = 'none';
        });
        
        this.headers.forEach((header, index) => {
            const content = this.contents[index];
            
            header.addEventListener('click', (e) => {
                if (e.target.closest('.catalog__content-text')) {
                    return;
                }
                this.toggleSection(header, content);
            });
            
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSection(header, content);
                }
            });
            
            const button = header.querySelector('button, .catalog__head-data');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ============================================
// 3. ТАБЫ (КАТАЛОГ)
// ============================================
class TabsManager {
    constructor() {
        this.init();
    }
    
    switchTabs(buttons, panels, activeClass, activePanelClass) {
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const path = event.currentTarget.dataset.path;
                const targetPanel = document.querySelector(`[data-target="${path}"]`);
                
                if (!targetPanel) {
                    console.warn(`Target panel not found for path: ${path}`);
                    return;
                }
                
                buttons.forEach(btn => btn.classList.remove(activeClass));
                panels.forEach(panel => panel.classList.remove(activePanelClass));
                
                button.classList.add(activeClass);
                targetPanel.classList.add(activePanelClass);
                
                if (window.innerWidth < 667) {
                    targetPanel.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    initCountryTabs() {
        const countryButtons = document.querySelectorAll('.catalog__country');
        const countryPanels = document.querySelectorAll('.tabs-panel');
        
        if (countryButtons.length && countryPanels.length) {
            this.switchTabs(countryButtons, countryPanels, 'btn-active', 'tabs-panel-active');
        }
    }
    
    initPortraitTabs() {
        const portraitButtons = document.querySelectorAll('.catalog__content-text');
        const portraitPanels = document.querySelectorAll('.portrait-panel');
        
        if (portraitButtons.length && portraitPanels.length) {
            this.switchTabs(portraitButtons, portraitPanels, 'btn2-active', 'portrait-panel-active');
        }
    }
    
    init() {
        this.initCountryTabs();
        this.initPortraitTabs();
        
        document.addEventListener('keydown', (e) => {
            const activeButton = document.querySelector('.catalog__country.btn-active, .catalog__content-text.btn2-active');
            
            if (!activeButton || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
            
            const isCountryTab = activeButton.classList.contains('catalog__country');
            const buttons = Array.from(
                document.querySelectorAll(isCountryTab ? '.catalog__country' : '.catalog__content-text')
            );
            
            const currentIndex = buttons.indexOf(activeButton);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % buttons.length;
            } else {
                nextIndex = currentIndex === 0 ? buttons.length - 1 : currentIndex - 1;
            }
            
            buttons[nextIndex]?.click();
        });
    }
}

// ============================================
// 4. ОСНОВНАЯ ИНТЕРАКТИВНОСТЬ
// ============================================
class BlanchardApp {
    constructor() {
        this.elements = {
            // Поиск
            searchInput: document.querySelector(".header__search-input"),
            searchLupe: document.querySelector(".header__search-pic320"),
            searchContainer: document.querySelector(".header__search"),
            searchPic: document.querySelector(".header__search-pic"),
            searchButton: document.querySelector(".header__search-button"),
            searchClose: document.querySelector(".header__search-close"),
            
            // Меню header2
            menuContainers: document.querySelectorAll('.header2__menu-container'),
            menuHeads: document.querySelectorAll('.header2__item-head'),
            
            // События
            eventsCards: document.querySelectorAll(".events__card-hidden"),
            eventsBtn: document.querySelector(".events__btn"),
            exhibition: document.querySelector(".exhibition"),
            
            // Прочее
            checkHeading: document.querySelector('.js-check-heading'),
            contacts: document.querySelector('.contacts'),
        };
        
        this.state = {
            openMenu: null,
            isMobile: () => window.innerWidth < 993,
        };
        
        this.init();
    }
    
    toggleSearch() {
        const { searchInput, searchLupe, searchContainer, searchPic, searchButton, searchClose } = this.elements;
        
        searchInput?.classList.toggle("show");
        searchLupe?.classList.toggle("show");
        searchContainer?.classList.toggle("open");
        searchPic?.classList.toggle("close");
        searchButton?.classList.toggle("show");
        
        if (this.state.isMobile() && searchClose) {
            searchClose.classList.toggle("show");
        }
    }
    
    closeSearch() {
        const { searchInput, searchLupe, searchContainer, searchPic, searchButton, searchClose } = this.elements;
        
        searchInput?.classList.remove("show");
        searchLupe?.classList.remove("show");
        searchContainer?.classList.remove("open");
        searchPic?.classList.remove("close");
        searchButton?.classList.remove("show");
        
        if (this.state.isMobile() && searchClose) {
            searchClose.classList.remove("show");
        }
    }
    
    resetSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.value = "";
        }
    }
    
    handleMenuClick(target) {
        const { menuContainers, menuHeads } = this.elements;
        
        if (this.state.openMenu && (target === this.state.openMenu || this.state.openMenu.contains(target))) {
            return;
        }
        
        if (target.classList.contains('header2__item-head')) {
            const index = Array.from(menuHeads).indexOf(target);
            
            if (index !== -1) {
                if (this.state.openMenu && this.state.openMenu !== menuContainers[index]) {
                    this.state.openMenu.classList.remove("show");
                }
                this.state.openMenu = menuContainers[index];
                this.state.openMenu.classList.toggle("show");
            }
            return;
        }
        
        if (this.state.openMenu) {
            this.state.openMenu.classList.remove("show");
            this.state.openMenu = null;
        }
    }
    
    toggleMenuHeadClass(target) {
        const clickedHead = target.closest('.header2__item-head');
        
        if (clickedHead?.closest('.click')) {
            clickedHead.classList.remove('click');
            return;
        }
        
        this.elements.menuHeads.forEach(item => item.classList.remove('click'));
        clickedHead?.classList.add('click');
    }
    
    toggleEventsCards() {
        const { eventsCards, eventsBtn, exhibition } = this.elements;
        
        eventsCards.forEach(card => card.classList.toggle("hidden"));
        
        if (this.state.isMobile() && exhibition) {
            exhibition.classList.toggle("hidden");
        }
        
        if (eventsBtn) {
            eventsBtn.classList.toggle('turn');
            eventsBtn.textContent = eventsBtn.classList.contains('turn') ? 'Свернуть' : 'Все события';
        }
    }
    
    smoothScroll(selector) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    handleClick(event) {
        const target = event.target;
        
        this.toggleMenuHeadClass(target);
        this.handleMenuClick(target);
        
        if (target.matches('.header__search-pic')) {
            this.toggleSearch();
            return;
        }
        
        if (target.matches('.header__search-close')) {
            this.toggleSearch();
            this.resetSearch();
            return;
        }
        
        if (!target.closest('.header__search')) {
            this.closeSearch();
        }
        
        if (target.matches('.events__btn')) {
            this.toggleEventsCards();
            return;
        }
        
        if (target.matches('.js-check-heading')) {
            this.elements.checkHeading?.classList.toggle('is-active');
            return;
        }
        
        if (target.matches('a[href^="#"]')) {
            event.preventDefault();
            const href = target.getAttribute('href');
            if (href && href !== '#') {
                this.smoothScroll(href);
            }
            return;
        }
        
        if (target.matches('.hero__subscribe')) {
            this.smoothScroll(this.elements.contacts);
        }
    }
    
    init() {
        document.addEventListener('click', (event) => this.handleClick(event));
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeSearch();
                if (this.state.openMenu) {
                    this.state.openMenu.classList.remove("show");
                    this.state.openMenu = null;
                }
            }
        });
    }
}

// ============================================
// 5. ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем все модули
    new BurgerMenu();
    new TabsManager();
    new BlanchardApp();
    
    // Инициализируем все аккордеоны на странице
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => new Accordion(accordion));
    
    console.log('✅ Blanchard App initialized');
});
