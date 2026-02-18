class GalleryLightbox {
  constructor() {
    this.lightbox = document.querySelector('.gallery-lightbox');
    if (!this.lightbox) return;
    
    this.lightboxImage = this.lightbox.querySelector('.gallery-lightbox-image');
    this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
    this.lightboxClose = this.lightbox.querySelector('.lightbox-close');
    this.lightboxPrev = this.lightbox.querySelector('.lightbox-arrow-prev');
    this.lightboxNext = this.lightbox.querySelector('.lightbox-arrow-next');
    this.lightboxControls = this.lightbox.querySelector('.gallery-lightbox-controls');
    
    this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    this.currentIndex = 0;
    this.isZoomed = false;
    this.hideControlsTimeout = null;
    
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
    this.lightboxClose?.addEventListener('click', () => {
      if (this.isZoomed) {
        this.toggleZoom();
      } else {
        this.closeLightbox();
      }
    });
    
    this.lightboxPrev?.addEventListener('click', () => this.prevImage());
    this.lightboxNext?.addEventListener('click', () => this.nextImage());
    
    // Image click to zoom
    this.lightboxImage?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleZoom();
    });
    
    // Mouse movement to show controls when zoomed
    this.lightbox?.addEventListener('mousemove', () => {
      if (this.isZoomed) {
        this.showControls();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        if (this.isZoomed) {
          this.toggleZoom();
        } else {
          this.closeLightbox();
        }
      }
      if (e.key === 'ArrowLeft' && !this.isZoomed) this.prevImage();
      if (e.key === 'ArrowRight' && !this.isZoomed) this.nextImage();
      if (e.key === 'z' || e.key === 'Z') this.toggleZoom();
    });
    
    // Click background to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox && !this.isZoomed) {
        this.closeLightbox();
      }
    });
  }
  
  openLightbox() {
    this.isZoomed = false;
    this.updateLightbox();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.lightboxClose?.focus();
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    this.lightbox.classList.remove('gallery-fullscreen-zoom');
    document.body.style.overflow = '';
    this.isZoomed = false;
    this.lightboxImage?.classList.remove('zoomed');
    
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
  }
  
  toggleZoom() {
    this.isZoomed = !this.isZoomed;
    
    if (this.isZoomed) {
      this.lightbox.classList.add('gallery-fullscreen-zoom');
      this.lightboxImage.classList.add('zoomed');
      this.lightboxImage.style.cursor = 'zoom-out';
      
      // Show controls initially, then auto-hide
      this.showControls();
    } else {
      this.lightbox.classList.remove('gallery-fullscreen-zoom');
      this.lightboxImage.classList.remove('zoomed');
      this.lightboxImage.style.cursor = 'zoom-in';
      
      // Restore controls visibility
      this.lightbox.classList.remove('hide-controls');
      if (this.hideControlsTimeout) {
        clearTimeout(this.hideControlsTimeout);
      }
    }
  }
  
  showControls() {
    this.lightbox.classList.remove('hide-controls');
    
    // Auto-hide after 2 seconds of no movement
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
    }
    
    this.hideControlsTimeout = setTimeout(() => {
      if (this.isZoomed) {
        this.lightbox.classList.add('hide-controls');
      }
    }, 2000);
  }
  
  updateLightbox() {
    const currentItem = this.galleryItems[this.currentIndex];
    const imageSrc = currentItem.dataset.src;
    
    this.lightboxImage.src = imageSrc;
    this.lightboxImage.style.cursor = 'zoom-in';
    this.lightboxImage.classList.remove('zoomed');
    this.isZoomed = false;
    
    this.lightbox.classList.remove('gallery-fullscreen-zoom');
    this.lightbox.classList.remove('hide-controls');
    
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

document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
});
