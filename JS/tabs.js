// Класс для управления табами
class TabsManager {
    constructor() {
        this.init();
    }
    
    // Универсальный метод для переключения табов
    switchTabs(buttons, panels, activeClass, activePanelClass) {
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const path = event.currentTarget.dataset.path;
                const targetPanel = document.querySelector(`[data-target="${path}"]`);
                
                if (!targetPanel) {
                    console.warn(`Target panel not found for path: ${path}`);
                    return;
                }
                
                // Убираем активные классы со всех кнопок и панелей
                buttons.forEach(btn => btn.classList.remove(activeClass));
                panels.forEach(panel => panel.classList.remove(activePanelClass));
                
                // Добавляем активный класс к текущей кнопке и панели
                button.classList.add(activeClass);
                targetPanel.classList.add(activePanelClass);
                
                // Прокрутка для мобильных устройств
                if (window.innerWidth < 667) {
                    targetPanel.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Инициализация табов стран
    initCountryTabs() {
        const countryButtons = document.querySelectorAll('.catalog__country');
        const countryPanels = document.querySelectorAll('.tabs-panel');
        
        if (countryButtons.length && countryPanels.length) {
            this.switchTabs(countryButtons, countryPanels, 'btn-active', 'tabs-panel-active');
        }
    }
    
    // Инициализация табов портретов
    initPortraitTabs() {
        const portraitButtons = document.querySelectorAll('.catalog__content-text');
        const portraitPanels = document.querySelectorAll('.portrait-panel');
        
        if (portraitButtons.length && portraitPanels.length) {
            this.switchTabs(portraitButtons, portraitPanels, 'btn2-active', 'portrait-panel-active');
        }
    }
    
    // Общая инициализация
    init() {
        this.initCountryTabs();
        this.initPortraitTabs();
        
        // Поддержка клавиатуры (стрелки влево/вправо для навигации)
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

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new TabsManager();
});
