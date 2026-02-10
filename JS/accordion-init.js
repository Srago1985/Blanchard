// Инициализация аккордеонов без jQuery UI
class Accordion {
    constructor(element) {
        this.accordion = element;
        this.headers = element.querySelectorAll('.catalog__country-head');
        this.contents = element.querySelectorAll('.catalog__country-content');
        this.animationSpeed = 300;
        
        this.init();
    }
    
    // Анимация открытия/закрытия
    slideToggle(element, isOpening) {
        if (isOpening) {
            element.style.display = 'block';
            const height = element.scrollHeight;
            element.style.height = '0px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${this.animationSpeed}ms ease`;
            
            // Триггер reflow для анимации
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
            
            // Триггер reflow
            element.offsetHeight;
            element.style.height = '0px';
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            }, this.animationSpeed);
        }
    }
    
    // Переключение секции аккордеона
    toggleSection(header, content) {
        const isOpen = header.classList.contains('ui-accordion-header-active');
        
        // Переключаем классы
        header.classList.toggle('ui-accordion-header-active');
        content.classList.toggle('ui-accordion-content-active');
        
        // Анимируем
        this.slideToggle(content, !isOpen);
        
        // Обновляем ARIA атрибуты для доступности
        const button = header.querySelector('button, .catalog__head-data');
        if (button) {
            button.setAttribute('aria-expanded', !isOpen);
        }
    }
    
    // Инициализация обработчиков
    init() {
        // Скрываем все секции по умолчанию
        this.contents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Добавляем обработчики клика
        this.headers.forEach((header, index) => {
            const content = this.contents[index];
            
            // Клик по заголовку или кнопке
            header.addEventListener('click', (e) => {
                // Предотвращаем двойное срабатывание
                if (e.target.closest('.catalog__content-text')) {
                    return;
                }
                this.toggleSection(header, content);
            });
            
            // Поддержка клавиатуры (Enter/Space)
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSection(header, content);
                }
            });
            
            // Устанавливаем ARIA атрибуты
            const button = header.querySelector('button, .catalog__head-data');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Инициализируем все аккордеоны на странице
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => new Accordion(accordion));
});