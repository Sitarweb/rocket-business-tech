export default class Slider {
    constructor(sliderSelector, prevButtonSelector, nextButtonSelector, textSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.text = document.querySelector(textSelector);
        this.slides = Array.from(this.slider.querySelectorAll('article'));
        this.slideCount = this.slides.length;
        this.slideIndex = 0;

        this.init();
    }

    init() {
        if (!this.slides || this.slides.length === 0) {
            console.error('Отсутствуют слайды для инициализации слайдера.');
            return;
        }

        this.prevButton.addEventListener('click', () => {
            console.log('Previous button clicked');
            this.slideIndex = (this.slideIndex - 1 + this.slideCount) % this.slideCount;
            this.updateSlider();
        });

        this.nextButton.addEventListener('click', () => {
            console.log('Next button clicked');
            this.slideIndex = (this.slideIndex + 1) % this.slideCount;
            this.updateSlider();
        });

        // Инициализация слайдера
        this.updateSlider();
    }

    updateText() {
        const currentSlideText = this.text.querySelector('.current-slide');
        const totalSlidesText = this.text.querySelector('.total-slides');
        
        currentSlideText.textContent = this.slideIndex + 1;
        totalSlidesText.textContent = `/ ${this.slideCount}`;
    }    

    updateSlider() {
        if (isNaN(this.slideIndex) || this.slideIndex < 0 || this.slideIndex >= this.slideCount) {
            console.error('Некорректное значение индекса слайда.');
            return;
        }

        this.slides.forEach((slide, index) => {
            
            if (index === this.slideIndex) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });

        this.updateText();
    }
}
