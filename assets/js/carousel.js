class Carousel {
  constructor() {
    this.container = document.querySelector('.carousel-container');
    if (!this.container) return;
    
    this.slides = Array.from(this.container.querySelectorAll('.carousel-slide'));
    this.dots = Array.from(document.querySelectorAll('.carousel-dot'));
    this.prevBtn = document.querySelector('.carousel-arrow-prev');
    this.nextBtn = document.querySelector('.carousel-arrow-next');
    this.pauseBtn = document.querySelector('.carousel-pause');
    
    this.currentIndex = 0;
    this.isPlaying = true;
    this.interval = null;
    
    this.init();
  }
  
  init() {
    // Event listeners
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.pauseBtn?.addEventListener('click', () => this.togglePause());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) this.next();
      if (touchEndX - touchStartX > 50) this.prev();
    });
    
    // Start autoplay
    this.startAutoplay();
  }
  
  goToSlide(index) {
    this.slides[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex].classList.remove('active');
    
    this.currentIndex = index;
    
    this.slides[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }
  
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }
  
  togglePause() {
    if (this.isPlaying) {
      this.stopAutoplay();
      this.pauseBtn.classList.add('paused');
    } else {
      this.startAutoplay();
      this.pauseBtn.classList.remove('paused');
    }
    this.isPlaying = !this.isPlaying;
  }
  
  startAutoplay() {
    this.interval = setInterval(() => this.next(), 5000);
  }
  
  stopAutoplay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});
