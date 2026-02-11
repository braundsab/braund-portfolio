// Portfolio filtering and lightbox

// Portfolio Filter
class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (this.filterButtons.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.filterItems(filter);
        this.setActiveButton(button);
      });
    });
  }
  
  filterItems(filter) {
    this.portfolioItems.forEach(item => {
      const tags = item.getAttribute('data-tags').split(',');
      
      if (filter === 'all' || tags.includes(filter)) {
        item.classList.remove('hidden');
        // Restart animation
        item.style.animation = 'none';
        setTimeout(() => {
          item.style.animation = '';
        }, 10);
      } else {
        item.classList.add('hidden');
      }
    });
  }
  
  setActiveButton(activeButton) {
    this.filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
}

// Lightbox
class Lightbox {
  constructor() {
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxImage = document.querySelector('.lightbox-image');
    this.lightboxTitle = document.querySelector('.lightbox-title');
    this.lightboxDescription = document.querySelector('.lightbox-description');
    this.lightboxCounter = document.querySelector('.lightbox-counter');
    this.lightboxMeta = document.querySelector('.lightbox-meta');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.prevBtn = document.querySelector('.lightbox-prev');
    this.nextBtn = document.querySelector('.lightbox-next');
    
    this.currentGallery = [];
    this.currentIndex = 0;
    this.currentData = null;
    
    if (this.lightbox) {
      this.init();
    }
  }
  
  init() {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previous());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    // Close on overlay click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.previous();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Attach click handlers to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const data = this.getItemData(item);
        this.open(data);
      });
    });
  }
  
  getItemData(item) {
    return {
      title: item.getAttribute('data-title'),
      description: item.getAttribute('data-description'),
      gallery: item.getAttribute('data-gallery').split(','),
      year: item.getAttribute('data-year'),
      client: item.getAttribute('data-client')
    };
  }
  
  open(data) {
    this.currentData = data;
    this.currentGallery = data.gallery;
    this.currentIndex = 0;
    
    this.updateContent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  updateContent() {
    const imageSrc = this.currentGallery[this.currentIndex];
    
    // Update image with lazy loading
    this.lightboxImage.src = imageSrc;
    
    // Update info
    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = this.currentData.title;
    }
    
    if (this.lightboxDescription) {
      this.lightboxDescription.textContent = this.currentData.description;
    }
    
    // Update counter
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.currentGallery.length}`;
    }
    
    // Update meta info
    if (this.lightboxMeta) {
      let metaHTML = '';
      if (this.currentData.year) {
        metaHTML += `<span>${this.currentData.year}</span>`;
      }
      if (this.currentData.client && this.currentData.client !== 'null') {
        metaHTML += `<span>${this.currentData.client}</span>`;
      }
      this.lightboxMeta.innerHTML = metaHTML;
    }
    
    // Update navigation buttons
    this.updateNavButtons();
  }
  
  updateNavButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.prevBtn.classList.toggle('disabled', this.currentIndex === 0);
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.currentGallery.length - 1;
      this.nextBtn.classList.toggle('disabled', this.currentIndex === this.currentGallery.length - 1);
    }
  }
  
  next() {
    if (this.currentIndex < this.currentGallery.length - 1) {
      this.currentIndex++;
      this.updateContent();
    }
  }
  
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateContent();
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioFilter();
  new Lightbox();
});
