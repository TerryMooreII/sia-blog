export default {
  name: 'image-lightbox',
  version: '1.0.0',
  hooks: {
    /**
     * Transform images in markdown HTML to be clickable for lightbox
     * and inject CSS and JavaScript
     */
    afterMarkdown: (html, context) => {
      // Check if we've already injected the lightbox assets
      const marker = '<!-- sia-lightbox-injected -->';
      if (html.includes(marker)) {
        // Only transform images if not already processed
        return html;
      }

      // Match <img> tags, including those with various attributes
      const imgRegex = /<img\s+([^>]*?)>/gi;
      
      let processedHtml = html.replace(imgRegex, (match, attributes) => {
        // Extract src attribute
        const srcMatch = attributes.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) {
          return match; // Skip if no src attribute
        }
        
        const src = srcMatch[1];
        
        // Extract alt attribute for accessibility
        const altMatch = attributes.match(/alt=["']([^"']*)["']/i);
        const alt = altMatch ? altMatch[1] : '';
        
        // Wrap the img in a clickable container
        return `<a href="${src}" class="lightbox-trigger" data-lightbox="image" aria-label="View image: ${alt || 'Image'}">${match}</a>`;
      });

      // Inject CSS and JavaScript only if there are images to lightbox
      if (processedHtml.includes('lightbox-trigger')) {
        const css = `
<style id="sia-lightbox-styles">
/* Lightbox Trigger Styles */
.lightbox-trigger {
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.lightbox-trigger:hover {
  opacity: 0.9;
}

.lightbox-trigger img {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Lightbox Modal Styles */
.lightbox-modal {
  display: none;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lightbox-modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  animation: lightboxZoomIn 0.3s ease;
}

@keyframes lightboxZoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.lightbox-content img {
  max-width: 100%;
  max-height: 90vh;
  width: auto;
  height: auto;
  display: block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  z-index: 10001;
  transition: opacity 0.2s ease;
  background: rgba(0, 0, 0, 0.5);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.lightbox-close:hover,
.lightbox-close:focus {
  opacity: 0.7;
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-close::before {
  content: '×';
  font-size: 22px;
  line-height: 1;
  margin-top: -4px;
}

/* Prevent body scroll when lightbox is open */
body.lightbox-open {
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lightbox-content {
    max-width: 95%;
    max-height: 95%;
  }
  
  .lightbox-close {
    top: 10px;
    right: 15px;
    width: 36px;
    height: 36px;
  }
  
  .lightbox-close::before {
    font-size: 28px;
  }
}
</style>`;

        const js = `
<script id="sia-lightbox-script">
(function() {
  'use strict';
  
  // Initialize lightbox when DOM is ready
  function initLightbox() {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    if (triggers.length === 0) return;
    
    // Create modal element if it doesn't exist
    let modal = document.getElementById('sia-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'sia-lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-label', 'Image lightbox');
      modal.setAttribute('aria-modal', 'true');
      
      const content = document.createElement('div');
      content.className = 'lightbox-content';
      
      const img = document.createElement('img');
      img.setAttribute('alt', '');
      content.appendChild(img);
      
      const closeBtn = document.createElement('span');
      closeBtn.className = 'lightbox-close';
      closeBtn.setAttribute('aria-label', 'Close lightbox');
      closeBtn.setAttribute('tabindex', '0');
      content.appendChild(closeBtn);
      
      modal.appendChild(content);
      document.body.appendChild(modal);
    }
    
    const modalContent = modal.querySelector('.lightbox-content');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.lightbox-close');
    
    // Open lightbox function
    function openLightbox(src, alt) {
      modalImg.src = src;
      modalImg.alt = alt || 'Image';
      modal.classList.add('active');
      document.body.classList.add('lightbox-open');
      
      // Focus management for accessibility
      closeBtn.focus();
    }
    
    // Close lightbox function
    function closeLightbox() {
      modal.classList.remove('active');
      document.body.classList.remove('lightbox-open');
    }
    
    // Add click handlers to all triggers
    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const img = trigger.querySelector('img');
        if (img) {
          const src = img.src || trigger.href;
          const alt = img.alt || '';
          openLightbox(src, alt);
        }
      });
    });
    
    // Close button click
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeLightbox();
      }
    });
    
    // Close button keyboard support
    closeBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeLightbox();
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
</script>`;

        // Append CSS, JS, and marker to the HTML
        processedHtml += marker + css + js;
      }

      return processedHtml;
    }
  }
};

