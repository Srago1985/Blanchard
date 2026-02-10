/**
 * Оптимизация изображений
 * - Ленивая загрузка
 * - Placeholder для улучшения UX
 * - Обработка ошибок загрузки
 */

class ImageOptimizer {
    constructor() {
        this.images = [];
        this.observer = null;
        this.init();
    }
    
    // Проверка поддержки нативной ленивой загрузки
    supportsNativeLazyLoading() {
        return 'loading' in HTMLImageElement.prototype;
    }
    
    // Создание placeholder для изображения
    createPlaceholder(img) {
        const wrapper = img.parentElement;
        if (!wrapper.classList.contains('img-loading')) {
            wrapper.classList.add('img-loading');
        }
    }
    
    // Удаление placeholder после загрузки
    removePlaceholder(img) {
        const wrapper = img.parentElement;
        wrapper.classList.remove('img-loading');
        wrapper.classList.add('img-loaded');
    }
    
    // Обработка ошибок загрузки
    handleError(img) {
        console.warn(`Failed to load image: ${img.src}`);
        img.alt = 'Изображение недоступно';
        this.removePlaceholder(img);
    }
    
    // Загрузка изображения
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        this.createPlaceholder(img);
        
        // Создаем новый объект Image для предзагрузки
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = src;
            img.removeAttribute('data-src');
            this.removePlaceholder(img);
        };
        
        imageLoader.onerror = () => {
            this.handleError(img);
        };
        
        imageLoader.src = src;
    }
    
    // Intersection Observer для lazy loading
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px', // Загружаем за 50px до входа в viewport
            threshold: 0.01
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.observer.unobserve(img);
                }
            });
        }, options);
    }
    
    // Добавление loading="lazy" к существующим изображениям
    addNativeLazyLoading() {
        const images = document.querySelectorAll('img:not([loading])');
        
        images.forEach((img, index) => {
            // Первые 3 изображения загружаем сразу (above the fold)
            if (index < 3) {
                img.loading = 'eager';
            } else {
                img.loading = 'lazy';
            }
        });
    }
    
    // Улучшение alt-текстов для изображений галереи
    improveAltTexts() {
        const galleryImages = document.querySelectorAll('.gallery__slide-pic');
        
        galleryImages.forEach((img, index) => {
            if (!img.alt || img.alt === '') {
                img.alt = `Картина галереи ${index + 1}`;
            }
        });
    }
    
    // Инициализация
    init() {
        // Если браузер поддерживает нативную ленивую загрузку
        if (this.supportsNativeLazyLoading()) {
            this.addNativeLazyLoading();
        } else {
            // Fallback для старых браузеров
            this.setupIntersectionObserver();
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                this.observer.observe(img);
            });
        }
        
        // Улучшаем доступность
        this.improveAltTexts();
        
        console.log('✅ Image optimization initialized');
    }
}

// Добавляем CSS для placeholder эффекта
const style = document.createElement('style');
style.textContent = `
    .img-loading {
        position: relative;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .img-loading img {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    
    .img-loaded img {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new ImageOptimizer();
});
