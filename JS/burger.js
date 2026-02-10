// Инициализация бургер-меню
class BurgerMenu {
    constructor() {
        // Кешируем элементы DOM один раз при инициализации
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
    
    // Переключение состояния меню
    toggleMenu() {
        const isOpen = this.burger.classList.contains('open-menu');
        
        this.burger.classList.toggle('open-menu');
        this.nav.classList.toggle('open-menu');
        this.login.classList.toggle('open-menu');
        
        // Блокируем прокрутку страницы когда меню открыто
        this.body.style.overflow = isOpen ? '' : 'hidden';
    }
    
    // Закрытие меню
    closeMenu() {
        if (this.burger.classList.contains('open-menu')) {
            this.burger.classList.remove('open-menu');
            this.nav.classList.remove('open-menu');
            this.login.classList.remove('open-menu');
            this.body.style.overflow = '';
        }
    }
    
    // Инициализация обработчиков событий
    init() {
        // Клик по бургеру
        this.burger.addEventListener('click', () => this.toggleMenu());
        
        // Клик по навигации закрывает меню
        this.nav.addEventListener('click', (e) => {
            // Закрываем только если кликнули по ссылке, а не по контейнеру
            if (e.target.matches('a')) {
                this.closeMenu();
            }
        });
        
        // Закрытие по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        // Закрытие при клике вне меню
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

// Инициализируем после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new BurgerMenu();
});