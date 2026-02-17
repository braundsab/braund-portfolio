class GalleryLightbox {
  constructor() {
    this.lightbox = document.querySelector('.gallery-lightbox');
    if (!this.lightbox) return;
    
    this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
    this.lightboxTitle = this.lightbox.querySelector('.lightbox-title');
    this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
    this.lightboxClose = this.lightbox.querySelector('.lightbox-close');
    this.lightboxPrev = this.lightbox.querySelector('.lightbox-arrow-prev');
    this.lightboxNext = this.lightbox.querySelector('.lightbox-arrow-next');
    
    this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    // Gallery item clicks
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.currentIndex = index;
        this.openLightbox();
      });
    });
    
    // Lightbox controls
    this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
    this.lightboxPrev?.addEventListener('click', () => this.prevImage());
    this.lightboxNext?.addEventListener('click', () => this.nextImage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });
    
    // Click outside to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  }
  
  openLightbox() {
    this.updateLightbox();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  updateLightbox() {
    const currentItem = this.galleryItems[this.currentIndex];
    const imageSrc = currentItem.dataset.src;
    const title = currentItem.dataset.title || '';
    
    this.lightboxImage.src = imageSrc;
    
    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = title;
    }
    
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.galleryItems.length}`;
    }
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.updateLightbox();
  }
  
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.updateLightbox();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
});
