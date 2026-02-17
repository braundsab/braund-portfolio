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
    
    this.updateLightbox(hasGalleryLink);
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  updateLightbox(hasGalleryLink = false) {
    const imageSrc = this.currentGallery[this.currentIndex];
    
    // Update image with lazy loading
    this.lightboxImage.src = imageSrc;
    
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
      } else {
        this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.currentGallery.length}`;
      }
    }
    
    // Show/hide gallery button
    if (this.galleryButton) {
      this.galleryButton.style.display = (this.isPhotography && hasGalleryLink) ? 'inline-block' : 'none';
    }
    
    // Show/hide arrows for single-image photography projects
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
  }
  
  prevImage() {
    if (this.isPhotography || this.currentGallery.length <= 1) return;
    
    this.currentIndex = (this.currentIndex - 1 + this.currentGallery.length) % this.currentGallery.length;
    this.updateLightbox();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioLightbox();
});
