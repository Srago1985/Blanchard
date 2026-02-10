// Главный класс для управления интерактивностью страницы
class BlanchardApp {
    constructor() {
        // Кешируем все элементы DOM один раз
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
    
    // Переключение поиска
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
    
    // Закрытие поиска
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
    
    // Сброс поискового запроса
    resetSearch() {
        if (this.elements.searchInput) {
            this.elements.searchInput.value = "";
        }
    }
    
    // Управление меню header2
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
    
    // Переключение активного класса для заголовков меню
    toggleMenuHeadClass(target) {
        const clickedHead = target.closest('.header2__item-head');
        
        if (clickedHead?.closest('.click')) {
            clickedHead.classList.remove('click');
            return;
        }
        
        this.elements.menuHeads.forEach(item => item.classList.remove('click'));
        clickedHead?.classList.add('click');
    }
    
    // Переключение скрытых карточек событий
    toggleEventsCards() {
        const { eventsCards, eventsBtn, exhibition } = this.elements;
        
        eventsCards.forEach(card => card.classList.toggle("hidden"));
        
        if (this.state.isMobile() && exhibition) {
            exhibition.classList.toggle("hidden");
        }
        
        // Изменяем текст кнопки
        if (eventsBtn) {
            eventsBtn.classList.toggle('turn');
            eventsBtn.textContent = eventsBtn.classList.contains('turn') ? 'Свернуть' : 'Все события';
        }
    }
    
    // Плавная прокрутка к элементу
    smoothScroll(selector) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Единый обработчик всех кликов (Event Delegation)
    handleClick(event) {
        const target = event.target;
        
        // Управление классами для header2
        this.toggleMenuHeadClass(target);
        this.handleMenuClick(target);
        
        // Поиск: открытие/закрытие
        if (target.matches('.header__search-pic')) {
            this.toggleSearch();
            return;
        }
        
        if (target.matches('.header__search-close')) {
            this.toggleSearch();
            this.resetSearch();
            return;
        }
        
        // Закрытие поиска при клике вне его
        if (!target.closest('.header__search')) {
            this.closeSearch();
        }
        
        // Кнопка "Все события"
        if (target.matches('.events__btn')) {
            this.toggleEventsCards();
            return;
        }
        
        // Переключение заголовка проверки
        if (target.matches('.js-check-heading')) {
            this.elements.checkHeading?.classList.toggle('is-active');
            return;
        }
        
        // Плавная прокрутка по якорям
        if (target.matches('a[href^="#"]')) {
            event.preventDefault();
            const href = target.getAttribute('href');
            if (href && href !== '#') {
                this.smoothScroll(href);
            }
            return;
        }
        
        // Кнопка подписки
        if (target.matches('.hero__subscribe')) {
            this.smoothScroll(this.elements.contacts);
        }
    }
    
    // Инициализация приложения
    init() {
        // Единый обработчик кликов для всей страницы
        document.addEventListener('click', (event) => this.handleClick(event));
        
        // Закрытие меню при нажатии Escape
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

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new BlanchardApp();
});
