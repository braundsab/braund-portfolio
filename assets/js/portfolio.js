class PortfolioLightbox {
  constructor() {
    this.lightbox = document.querySelector('.lightbox:not(.gallery-lightbox)');
    if (!this.lightbox) return;
    
    this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
    this.lightboxTitle = this.lightbox.querySelector('.lightbox-title');
    this.lightboxDescription = this.lightbox.querySelector('.lightbox-description');
    this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');
    this.lightboxClose = this.lightbox.querySelector('.lightbox-close');
    this.lightboxPrev = this.lightbox.querySelector('.lightbox-arrow-prev');
    this.lightboxNext = this.lightbox.querySelector('.lightbox-arrow-next');
    this.galleryButton = this.lightbox.querySelector('.lightbox-gallery-btn');
    
    this.currentGallery = [];
    this.currentIndex = 0;
    this.currentTitle = '';
    this.currentDescription = '';
    this.isPhotography = false;
    this.isZoomed = false;
    
    this.init();
  }
  
  init() {
    // Portfolio item clicks
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if this is "More Photography - Gallery" (direct link)
        const directLink = item.dataset.directGalleryLink === 'true';
        if (directLink) {
          window.location.href = '/gallery/';
          return;
        }
        
        this.openLightbox(item);
      });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterPortfolio(btn.dataset.filter);
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    // Lightbox controls
    this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
    this.lightboxPrev?.addEventListener('click', () => this.prevImage());
    this.lightboxNext?.addEventListener('click', () => this.nextImage());
    
    // Image click to zoom
    this.lightboxImage?.addEventListener('click', () => this.toggleZoom());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft' && !this.isZoomed) this.prevImage();
      if (e.key === 'ArrowRight' && !this.isZoomed) this.nextImage();
      if (e.key === 'z' || e.key === 'Z') this.toggleZoom();
    });
    
    // Click outside to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  }
  
  filterPortfolio(filter) {
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const tags = item.dataset.tags.split(',');
      
      if (filter === 'all' || tags.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
  
  openLightbox(item) {
    this.currentTitle = item.dataset.title;
    this.currentDescription = item.dataset.description;
    this.isPhotography = item.dataset.isPhotography === 'true';
    const hasGalleryLink = item.dataset.galleryLink === 'true';
    
    const galleryData = item.dataset.gallery;
    this.currentGallery = galleryData ? galleryData.split(',') : [];
    this.currentIndex = 0;
    this.isZoomed = false;
    
    this.updateLightbox(hasGalleryLink);
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Accessibility: Move focus to lightbox
    this.lightboxClose?.focus();
    
    // Announce to screen readers
    this.announceToScreenReader(`Opened ${this.currentTitle}. Press Escape to close, Z to zoom, arrow keys to navigate.`);
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
    this.isZoomed = false;
    this.lightboxImage?.classList.remove('zoomed');
  }
  
  toggleZoom() {
    this.isZoomed = !this.isZoomed;
    
    if (this.isZoomed) {
      this.lightboxImage.classList.add('zoomed');
      this.lightboxImage.style.cursor = 'zoom-out';
      this.announceToScreenReader('Image zoomed to actual size. Click again to zoom out.');
    } else {
      this.lightboxImage.classList.remove('zoomed');
      this.lightboxImage.style.cursor = 'zoom-in';
      this.announceToScreenReader('Image zoomed to fit screen.');
    }
  }
  
  updateLightbox(hasGalleryLink = false) {
    const imageSrc = this.currentGallery[this.currentIndex];
    
    // Update image
    this.lightboxImage.src = imageSrc;
    this.lightboxImage.style.cursor = 'zoom-in';
    this.lightboxImage.classList.remove('zoomed');
    this.isZoomed = false;
    
    // Update info
    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = this.currentTitle;
    }
    
    if (this.lightboxDescription) {
      this.lightboxDescription.textContent = this.currentDescription;
    }
    
    // Update counter
    if (this.lightboxCounter) {
      if (this.isPhotography || this.currentGallery.length <= 1) {
        this.lightboxCounter.textContent = '';
        this.lightboxCounter.setAttribute('aria-live', 'off');
      } else {
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.currentGallery.length}`;
        this.lightboxCounter.setAttribute('aria-live', 'polite');
      }
    }
    
    // Show/hide gallery button
    if (this.galleryButton) {
      this.galleryButton.style.display = (this.isPhotography && hasGalleryLink) ? 'inline-block' : 'none';
    }
    
    // Show/hide arrows
    if (this.isPhotography || this.currentGallery.length <= 1) {
      this.lightboxPrev.style.display = 'none';
      this.lightboxNext.style.display = 'none';
    } else {
      this.lightboxPrev.style.display = 'flex';
      this.lightboxNext.style.display = 'flex';
    }
  }
  
  nextImage() {
    if (this.isPhotography || this.currentGallery.length <= 1) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.currentGallery.length;
    this.updateLightbox();
    this.announceToScreenReader(`Image ${this.currentIndex + 1} of ${this.currentGallery.length}`);
  }
  
  prevImage() {
    if (this.isPhotography || this.currentGallery.length <= 1) return;
    
    this.currentIndex = (this.currentIndex - 1 + this.currentGallery.length) % this.currentGallery.length;
    this.updateLightbox();
    this.announceToScreenReader(`Image ${this.currentIndex + 1} of ${this.currentGallery.length}`);
  }
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioLightbox();
});
