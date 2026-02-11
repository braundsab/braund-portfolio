// Carousel functionality

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
    this.dots = Array.from(this.carousel.querySelectorAll('.carousel-dot'));
    this.prevBtn = this.carousel.querySelector('.carousel-arrow-prev');
    this.nextBtn = this.carousel.querySelector('.carousel-arrow-next');
    this.pauseBtn = this.carousel.querySelector('.carousel-pause');
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isPlaying = true;
    this.autoplayDelay = 5000; // 5 seconds
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    // Show first slide
    this.showSlide(0);
    
    // Set up event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => this.toggleAutoplay());
    }
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.pauseAutoplay();
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => {
      if (this.isPlaying) this.pauseAutoplay();
    });
    
    this.carousel.addEventListener('mouseleave', () => {
      if (this.isPlaying) this.startAutoplay();
    });
    
    // Touch/swipe support
    this.setupTouch();
    
    // Start autoplay
    this.startAutoplay();
  }
  
  showSlide(index) {
    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Show current slide
    this.slides[index].classList.add('active');
    
    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    this.currentIndex = index;
  }
  
  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  previousSlide() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  goToSlide(index) {
    this.showSlide(index);
    this.resetAutoplay();
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  resetAutoplay() {
    this.pauseAutoplay();
    if (this.isPlaying) {
      this.startAutoplay();
    }
  }
  
  toggleAutoplay() {
    this.isPlaying = !this.isPlaying;
    
    if (this.isPlaying) {
      this.startAutoplay();
      if (this.pauseBtn) {
        this.pauseBtn.textContent = 'Pause';
      }
    } else {
      this.pauseAutoplay();
      if (this.pauseBtn) {
        this.pauseBtn.textContent = 'Play';
      }
    }
  }
  
  setupTouch() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
        this.pauseAutoplay();
      }
    };
    
    this.handleSwipe = handleSwipe;
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('.carousel');
  if (carouselElement) {
    new Carousel(carouselElement);
  }
});
