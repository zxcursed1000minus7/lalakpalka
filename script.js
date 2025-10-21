class SmoothAccordion {
    constructor() {
        this.accordionItems = document.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            item.style.animationDelay = `${0.1 + index * 0.1}s`;
            
            header.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });
        setTimeout(() => {
            if (this.accordionItems.length > 0) {
                this.accordionItems[0].classList.add('active');
            }
        }, 1000);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.accordion-item')) {
            }
        });
    }

    toggleItem(clickedItem) {
        if (clickedItem.classList.contains('active')) {
            this.closeItem(clickedItem);
        } else {
            this.openItem(clickedItem);
        }
        
        this.updateStats();
    }

    openItem(item) {
        item.classList.add('active');
        item.style.transform = 'translateY(0)';
        setTimeout(() => {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 300);
    }

    closeItem(item) {
        item.classList.remove('active');
        this.updateStats();
    }

    closeAllItems() {
        this.accordionItems.forEach(item => {
            this.closeItem(item);
        });
    }

    openAllItems() {
        this.accordionItems.forEach(item => {
            this.openItem(item);
        });
    }

    updateStats() {
        const openItems = document.querySelectorAll('.accordion-item.active').length;
        const totalItems = this.accordionItems.length;
        console.log(`Открыто блоков: ${openItems} из ${totalItems}`);
    }

    getOpenItems() {
        return document.querySelectorAll('.accordion-item.active');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.accordion = new SmoothAccordion();
    
    // Добавляем глобальные функции для отладки
    window.closeAllAccordions = () => window.accordion.closeAllItems();
    window.openAllAccordions = () => window.accordion.openAllItems();
});