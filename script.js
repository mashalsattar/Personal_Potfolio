// Enhanced Portfolio JavaScript with Fixed Header and Better Animations

// Animation State Management
let animationStates = {
  skills: false,
  projects: false,
  contactForm: false,
  socialLinks: false,
  timeline: false,
  initialized: false
};

// Fixed Navigation Header Management
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrolled = window.pageYOffset;
  
  // Keep header always visible and add scroll effects
  if (scrolled > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link based on current section
  updateActiveNavLink();
  
  // Enhanced parallax effects
  updateParallaxEffects(scrolled);
});

// Update Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Enhanced Parallax Effects
function updateParallaxEffects(scrolled) {
  // Animate floating shapes
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    const speed = 0.08 + (index * 0.02);
    const rotation = scrolled * 0.05;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${1 + scrolled * 0.0002})`;
  });
  
  // Animate particles
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    const speed = 0.15 + (index * 0.025);
    const rotation = scrolled * 0.1;
    particle.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${1 + Math.sin(scrolled * 0.01) * 0.2})`;
  });
  
  // Animate geometric lines
  const lines = document.querySelectorAll('.pattern-line');
  lines.forEach((line, index) => {
    const speed = 0.08 + (index * 0.015);
    line.style.opacity = Math.max(0.1, 0.4 - scrolled * 0.0008);
    line.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.3}px)`;
  });
  
  // Background animation based on scroll
  const bg = document.querySelector('.professional-animated-bg');
  if (bg) {
    bg.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
  }
}

// Responsive Navbar Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Enhanced menu toggle animation
    if (navLinks.classList.contains('active')) {
      menuToggle.style.transform = 'rotate(90deg) scale(1.1)';
      menuToggle.style.color = 'var(--highlight)';
    } else {
      menuToggle.style.transform = 'rotate(0deg) scale(1)';
      menuToggle.style.color = 'var(--text-dark)';
    }
  });
}

// Enhanced Typing Animation
const typedText = document.getElementById('typed');
const roles = [
  'Web Developer',
  'AI/ML & Deep Learning Enthusiast',
  'Detection & Tracking Innovator',
  'WordPress Developer',
  'Python Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedText) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 1000);
    } else {
      setTimeout(typeEffect, 60);
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2500);
    } else {
      setTimeout(typeEffect, 120);
    }
  }
}

// Enhanced Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        animateSection(entry.target);
      }, 200);
    }
  });
}, observerOptions);

// Animate Section Function
function animateSection(sectionElement) {
  sectionElement.classList.add('visible');
  
  const sectionId = sectionElement.id;
  
  switch(sectionId) {
    case 'skills':
      setTimeout(() => animateSkills(), 600);
      break;
    case 'projects':
      setTimeout(() => animateProjects(), 600);
      break;
    case 'contact':
      setTimeout(() => animateContactForm(), 600);
      // Animate social grid in the Connect With Me section
      setTimeout(() => animateSocialGrid(), 1200);
      break;
    case 'experience':
      setTimeout(() => animateTimeline(), 600);
      break;
  }
  
  // Check if this is the Connect With Me section
  if (sectionElement.querySelector('.contact-socials')) {
    setTimeout(() => animateSocialGrid(), 600);
  }
}

// Enhanced Skills Animation
function animateSkills() {
  if (animationStates.skills) return;
  
  const skillBars = document.querySelectorAll('.animate-skill-item');
  const progressBars = document.querySelectorAll('.progress');
  
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.classList.add('animate-skill');
      
      // Enhanced hover effects
      bar.addEventListener('mouseenter', () => {
        bar.style.transform = 'translateX(25px) scale(1.05)';
        bar.style.background = 'rgba(255,255,255,0.95)';
        bar.style.boxShadow = '0 10px 30px rgba(66,133,244,0.4)';
      });
      
      bar.addEventListener('mouseleave', () => {
        bar.style.transform = 'translateX(0) scale(1)';
        bar.style.background = 'rgba(255,255,255,0.8)';
        bar.style.boxShadow = 'none';
      });
    }, index * 250);
  });
  
  // Animate progress bars
  setTimeout(() => {
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
          setTimeout(() => {
            bar.style.boxShadow = '0 0 25px rgba(66,133,244,0.3)';
          }, 2000);
        }
      }, index * 400);
    });
  }, 1000);
  
  animationStates.skills = true;
}

// Enhanced Projects Animation
function animateProjects() {
  if (animationStates.projects) return;
  
  const projectCards = document.querySelectorAll('.animate-project-item');
  
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-project');
      
      // Enhanced 3D hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-30px) scale(1.1) rotateY(12deg)';
        card.style.boxShadow = '0 30px 80px rgba(0,102,204,0.5)';
        
        const tags = card.querySelectorAll('.project-tags span');
        tags.forEach((tag, tagIndex) => {
          setTimeout(() => {
            tag.style.transform = 'scale(1.15) translateY(-3px)';
            tag.style.background = 'linear-gradient(135deg, var(--highlight), var(--secondary))';
          }, tagIndex * 80);
        });
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        card.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
        
        const tags = card.querySelectorAll('.project-tags span');
        tags.forEach(tag => {
          tag.style.transform = 'scale(1) translateY(0)';
          tag.style.background = 'linear-gradient(135deg, var(--accent), var(--highlight))';
        });
      });
    }, index * 400);
  });
  
  animationStates.projects = true;
}

// Enhanced Timeline Animation
function animateTimeline() {
  if (animationStates.timeline) return;
  
  const timelineItems = document.querySelectorAll('.animate-timeline-item');
  
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate-timeline');
      
      const content = item.querySelector('.timeline-content');
      if (content) {
        content.addEventListener('mouseenter', () => {
          content.style.transform = 'translateY(-15px) scale(1.04)';
          content.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
          content.style.borderLeftColor = 'var(--secondary)';
        });
        
        content.addEventListener('mouseleave', () => {
          content.style.transform = 'translateY(0) scale(1)';
          content.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
          content.style.borderLeftColor = 'var(--highlight)';
        });
      }
    }, index * 500);
  });
  
  animationStates.timeline = true;
}

// Enhanced Contact Form Animation
function animateContactForm() {
  if (animationStates.contactForm) return;
  
  const formGroups = document.querySelectorAll('.animate-form-item');
  
  formGroups.forEach((group, index) => {
    setTimeout(() => {
      group.classList.add('animate-form');
      
      const input = group.querySelector('input, textarea');
      if (input) {
        input.addEventListener('focus', () => {
          group.style.transform = 'translateX(20px) scale(1.04)';
          group.style.background = 'rgba(255,255,255,0.12)';
        });
        
        input.addEventListener('blur', () => {
          group.style.transform = 'translateX(0) scale(1)';
          group.style.background = 'transparent';
        });
        
        input.addEventListener('input', () => {
          if (input.value) {
            input.style.borderColor = 'var(--highlight)';
            input.style.boxShadow = '0 0 20px rgba(66,133,244,0.4)';
          } else {
            input.style.borderColor = 'rgba(0,0,0,0.1)';
            input.style.boxShadow = 'none';
          }
        });
      }
    }, index * 300);
  });
  
  animationStates.contactForm = true;
}

// Animate Social Grid (Connect With Me section)
function animateSocialGrid() {
  if (animationStates.socialLinks) return;
  
  const socialItems = document.querySelectorAll('.contact-social-icon');
  
  socialItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate-social');
      
      // Enhanced hover effects for social items
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.4) translateY(-15px) rotate(15deg)';
        item.style.boxShadow = '0 20px 60px rgba(0,102,204,0.4)';
        
        const iconWrapper = item.querySelector('.icon-wrapper');
        if (iconWrapper) {
          iconWrapper.style.transform = 'scale(1.3) rotate(20deg)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
        
        const iconWrapper = item.querySelector('.icon-wrapper');
        if (iconWrapper) {
          iconWrapper.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    }, index * 300);
  });
  
  animationStates.socialLinks = true;
}

// Enhanced Smooth Scroll for Nav Links
const navLinkEls = document.querySelectorAll('.nav-link');
navLinkEls.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu
      if (navLinks) {
        navLinks.classList.remove('active');
        if (menuToggle) {
          menuToggle.style.transform = 'rotate(0deg) scale(1)';
          menuToggle.style.color = 'var(--text-dark)';
        }
      }
    }
  });
});

// Enhanced Project Modal System
const projectDetails = [
  {
    title: 'Rupee Invoice System',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    desc: 'A comprehensive invoice management system built with modern web technologies, featuring dynamic invoice generation, client management, automated calculations, and real-time data processing for enhanced business efficiency and streamlined financial operations.',
    features: [
      'Dynamic invoice generation with customizable templates',
      'Client management system with contact tracking',
      'Automated tax calculations and currency conversion',
      'Real-time data processing and storage',
      'Export functionality for PDF and Excel formats',
      'Responsive design for all devices'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript ES6', 'PHP 8.0', 'MySQL', 'Bootstrap']
  },
  {
    title: 'Detection & Tracking Through Drone',
    img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80',
    tags: ['Python', 'AI/ML', 'Deep Learning'],
    desc: 'Advanced computer vision system for real-time object detection and tracking using drone technology. Leveraging deep learning frameworks like YOLO and OpenCV for enhanced accuracy in surveillance, search and rescue operations, and automated monitoring systems with real-time data processing.',
    features: [
      'Real-time object detection using YOLO v5/v8',
      'Multi-object tracking with DeepSORT algorithm',
      'Drone integration with autonomous flight paths',
      'Live video streaming and analysis',
      'Automated alert system for suspicious activities',
      'GPS coordinates mapping and logging'
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch', 'YOLO', 'NumPy', 'Pandas']
  },
  {
    title: 'Courier Android App',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    tags: ['Java', 'Kotlin'],
    desc: 'A comprehensive courier management Android application designed for efficient package delivery tracking, real-time location services, and seamless communication between couriers, customers, and dispatch centers with advanced routing algorithms.',
    features: [
      'Real-time package tracking and status updates',
      'GPS-based route optimization and navigation',
      'Push notifications for delivery updates',
      'Barcode scanning for package identification',
      'Customer rating and feedback system',
      'Offline mode for remote area operations'
    ],
    technologies: ['Java', 'Kotlin', 'Android SDK', 'Firebase', 'Google Maps API', 'SQLite']
  }
];

// Open Modal Function
function openModal(index) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody || !projectDetails[index]) return;
  
  const project = projectDetails[index];
  
  modalBody.innerHTML = `
    <div class="modal-project-content" style="opacity: 0; transform: translateY(30px);">
      <div class="modal-project-header">
        <img src="${project.img}" alt="${project.title}" class="modal-project-img" style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px; margin-bottom: 2rem;">
        <h2 style="color: var(--secondary); font-size: 1.8rem; margin-bottom: 1rem; text-shadow: 0 0 10px rgba(0,102,204,0.3);">${project.title}</h2>
        <div class="modal-project-tags" style="display: flex; gap: 0.8rem; margin-bottom: 2rem; flex-wrap: wrap;">
          ${project.tags.map(tag => `<span style="background: linear-gradient(135deg, var(--highlight), var(--secondary)); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">${tag}</span>`).join('')}
        </div>
      </div>
      
      <div class="modal-project-body">
        <div class="project-description" style="margin-bottom: 2.5rem;">
          <h3 style="color: var(--highlight); font-size: 1.3rem; margin-bottom: 1rem;">Project Overview</h3>
          <p style="color: var(--text-dark); line-height: 1.7; font-size: 1rem;">${project.desc}</p>
        </div>
        
        ${project.features ? `
        <div class="project-features" style="margin-bottom: 2.5rem;">
          <h3 style="color: var(--highlight); font-size: 1.3rem; margin-bottom: 1rem;">Key Features</h3>
          <ul style="color: var(--text-dark); line-height: 1.8; padding-left: 1.5rem;">
            ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        ${project.technologies ? `
        <div class="project-technologies" style="margin-bottom: 2rem;">
          <h3 style="color: var(--highlight); font-size: 1.3rem; margin-bottom: 1rem;">Technologies Used</h3>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${project.technologies.map(tech => `<span style="background: rgba(66,133,244,0.1); color: var(--text-dark); padding: 0.4rem 0.8rem; border-radius: 15px; font-size: 0.85rem; border: 1px solid rgba(66,133,244,0.2);">${tech}</span>`).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
  
  // Animate modal content
  setTimeout(() => {
    const content = modalBody.querySelector('.modal-project-content');
    if (content) {
      content.style.opacity = '1';
      content.style.transform = 'translateY(0)';
      content.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
  }, 100);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    const content = modal.querySelector('.modal-project-content');
    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(-30px) scale(0.9)';
    }
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Enhanced Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Enhanced form validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #666, #888)';
    
    // Simulate API call
    setTimeout(() => {
      showFormMessage('Thank you! Your message has been sent successfully.', 'success');
      this.reset();
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = 'linear-gradient(135deg, var(--highlight), var(--secondary))';
      
      // Reset form styling
      const inputs = this.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.style.borderColor = 'rgba(0,0,0,0.1)';
        input.style.boxShadow = 'none';
      });
    }, 2000);
  });
}

// Form validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
  if (!formMessage) return;
  
  formMessage.textContent = message;
  formMessage.className = `fade-in-message show ${type}`;
  
  if (type === 'error') {
    formMessage.style.color = '#ff6b6b';
  } else {
    formMessage.style.color = '#51cf66';
  }
  
  setTimeout(() => {
    formMessage.classList.remove('show');
  }, 5000);
}

// Enhanced Download Portfolio Function with Actual File Generation
const downloadBtn = document.getElementById('download-portfolio-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function() {
    // Add download animation
    this.style.transform = 'scale(0.95)';
    this.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Preparing Download...
    `;
    
    // Generate and download portfolio as HTML file
    generateAndDownloadPortfolio();
    
    setTimeout(() => {
      this.style.transform = 'scale(1)';
      this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="download-text">Download Portfolio</span>
      `;
      
      // Show success message
      showDownloadSuccess();
    }, 2000);
  });
}

// Generate and Download Portfolio Function
function generateAndDownloadPortfolio() {
  // Create portfolio content as HTML
  const portfolioContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mashal Sattar - Portfolio</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background: #f9f9f9;
        }
        .header { 
            text-align: center; 
            background: linear-gradient(135deg, #4285f4, #0066cc); 
            color: white; 
            padding: 30px; 
            border-radius: 15px; 
            margin-bottom: 30px; 
        }
        .section { 
            background: white; 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 10px; 
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
        }
        .section h2 { 
            color: #0066cc; 
            border-bottom: 2px solid #4285f4; 
            padding-bottom: 10px; 
        }
        .project { 
            background: #f8f9fa; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px; 
            border-left: 4px solid #4285f4; 
        }
        .skill-item { 
            background: #e3f2fd; 
            padding: 8px 15px; 
            margin: 5px; 
            border-radius: 20px; 
            display: inline-block; 
        }
        .contact-info { 
            background: #e8f5e8; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 10px 0; 
        }
        .timeline-item { 
            border-left: 3px solid #4285f4; 
            padding-left: 20px; 
            margin: 20px 0; 
        }
        @media print { 
            body { background: white; } 
            .section { box-shadow: none; } 
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Mashal Sattar</h1>
        <p>Web Developer | AI/ML & Deep Learning Enthusiast | Detection & Tracking Innovator</p>
    </div>
    
    <div class="section">
        <h2>About Me</h2>
        <p>I'm Mashal Sattar, a passionate Web Developer & AI/ML enthusiast skilled in building responsive websites, dynamic web apps, and intelligent systems. Experienced in WordPress, real-time object detection, and data-driven automation. I turn ideas into smart, user-focused digital solutions that deliver real results.</p>
    </div>
    
    <div class="section">
        <h2>Skills</h2>
        <div class="skill-item">Web Developer (95%)</div>
        <div class="skill-item">WordPress Developer (92%)</div>
        <div class="skill-item">AI/ML & Deep Learning Enthusiast (90%)</div>
        <div class="skill-item">Python Developer (88%)</div>
        <div class="skill-item">Detection & Tracking Innovator (85%)</div>
    </div>
    
    <div class="section">
        <h2>Experience</h2>
        <div class="timeline-item">
            <h3>Machine Learning Engineer Intern</h3>
            <p><strong>National Center Of Physics | July 2024 - August 2024</strong></p>
            <p>Applied Computer Vision and machine learning techniques to real-world target detection and tracking scenarios, leveraging python and deep learning framework to enhance accuracy and efficiency in diverse environments.</p>
        </div>
    </div>
    
    <div class="section">
        <h2>Education</h2>
        <div class="timeline-item">
            <h3>Bachelor of Science in Computer Engineering</h3>
            <p><strong>Institute of Space and Technology | 2021 - 2025</strong></p>
            <p>Computer Engineer specialized in AI/ML Engineering, Web Development, and User Experience Design. Maintained strong academic performance while actively building practical expertise through diverse projects, internships, and hands-on experience.</p>
        </div>
        <div class="timeline-item">
            <h3>Intermediate in Computer Science</h3>
            <p><strong>KRL Model College Kahuta | 2019 - 2021</strong></p>
            <p>Built a strong foundation in Computer Science with well-developed core programming skills and a deep understanding of computational principles.</p>
        </div>
        <div class="timeline-item">
            <h3>Matric in Computer Science</h3>
            <p><strong>KRL Model College Kahuta | 2017 - 2019</strong></p>
        </div>
    </div>
    
    <div class="section">
        <h2>Projects</h2>
        <div class="project">
            <h3>Rupee Invoice System</h3>
            <p><strong>Technologies:</strong> HTML, CSS, JavaScript, PHP</p>
            <p>A comprehensive invoice management system built with modern web technologies, featuring dynamic invoice generation, client management, automated calculations, and real-time data processing for enhanced business efficiency and streamlined financial operations.</p>
        </div>
        <div class="project">
            <h3>Detection & Tracking Through Drone</h3>
            <p><strong>Technologies:</strong> Python, AI/ML, Deep Learning</p>
            <p>Advanced computer vision system for real-time object detection and tracking using drone technology. Leveraging deep learning frameworks like YOLO and OpenCV for enhanced accuracy in surveillance, search and rescue operations, and automated monitoring systems with real-time data processing.</p>
        </div>
        <div class="project">
            <h3>Courier Android App</h3>
            <p><strong>Technologies:</strong> Java, Kotlin</p>
            <p>A comprehensive courier management Android application designed for efficient package delivery tracking, real-time location services, and seamless communication between couriers, customers, and dispatch centers with advanced routing algorithms.</p>
        </div>
    </div>
    
    <div class="section">
        <h2>Contact Information</h2>
        <div class="contact-info">
            <p><strong>Email:</strong> mishelsattar393@gmail.com</p>
            <p><strong>LinkedIn:</strong> https://www.linkedin.com/in/mashal-sattar-441679281</p>
            <p><strong>GitHub:</strong> https://github.com/mashalsattar</p>
        </div>
    </div>
    
    <div class="section">
        <p style="text-align: center; color: #666; margin-top: 30px;">
            © 2025 Mashal Sattar. All rights reserved.<br>
            Generated on ${new Date().toLocaleDateString()}
        </p>
    </div>
</body>
</html>`;

  // Create and download the file
  const blob = new Blob([portfolioContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mashal_Sattar_Portfolio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Show download success message
function showDownloadSuccess() {
  const successMsg = document.createElement('div');
  successMsg.textContent = 'Portfolio downloaded successfully! 🎉';
  successMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, var(--highlight), var(--secondary));
    color: white;
    padding: 1.5rem 2.5rem;
    border-radius: 25px;
    font-weight: 600;
    z-index: 3000;
    opacity: 0;
    transition: all 0.4s ease;
    box-shadow: 0 15px 40px rgba(0,102,204,0.3);
    font-size: 1.1rem;
  `;
  
  document.body.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.style.opacity = '1';
    successMsg.style.transform = 'translate(-50%, -50%) scale(1.05)';
  }, 100);
  
  setTimeout(() => {
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
      if (document.body.contains(successMsg)) {
        document.body.removeChild(successMsg);
      }
    }, 400);
  }, 3000);
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start typing animation
  setTimeout(typeEffect, 1000);
  
  // Observe all sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Initialize background animations
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 500);
  
  // Add loading animation to elements
  const animatedElements = document.querySelectorAll('.animate-on-load');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
  });
  
  // Trigger load animations
  setTimeout(() => {
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, index * 200);
    });
  }, 800);
  
  // Initialize hero social icons animation
  const socialIcons = document.querySelectorAll('.hero-socials .social-icon');
  socialIcons.forEach((icon, index) => {
    setTimeout(() => {
      icon.style.opacity = '1';
      icon.style.transform = 'translateY(0) scale(1)';
    }, 800 + (index * 400));
  });
  
  // Add performance optimization
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (preferReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
  }
  
  // Add mouse tracking for enhanced interactions
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor-following elements
    updateMouseEffects();
  });
  
  function updateMouseEffects() {
    // Subtle mouse-following effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const speed = 0.02 + (index * 0.005);
      const currentTransform = shape.style.transform || '';
      
      if (!currentTransform.includes('translate3d')) {
        const rect = shape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - centerX) * speed;
        const deltaY = (mouseY - centerY) * speed;
        
        shape.style.transform = `${currentTransform} translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    });
  }
  
  // Initialize scroll-triggered animations
  initializeScrollAnimations();
  
  // Add keyboard navigation support
  initializeKeyboardNavigation();
  
  animationStates.initialized = true;
});

// Scroll-triggered animations
function initializeScrollAnimations() {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scrolled-into-view');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  scrollElements.forEach(element => {
    scrollObserver.observe(element);
  });
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      navigateToNextSection(e.key === 'ArrowDown');
    }
    
    // Open project modals with Enter key when focused
    if (e.key === 'Enter') {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.classList.contains('project-card')) {
        const index = Array.from(document.querySelectorAll('.project-card')).indexOf(focusedElement);
        if (index !== -1) {
          openModal(index);
        }
      }
    }
  });
}

// Navigate between sections
function navigateToNextSection(isDown) {
  const sections = document.querySelectorAll('section[id]');
  const currentScroll = window.pageYOffset;
  let targetSection = null;
  
  if (isDown) {
    // Find next section
    for (let section of sections) {
      if (section.offsetTop > currentScroll + 100) {
        targetSection = section;
        break;
      }
    }
  } else {
    // Find previous section
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop < currentScroll - 100) {
        targetSection = sections[i];
        break;
      }
    }
  }
  
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Enhanced error handling
window.addEventListener('error', (e) => {
  console.error('Portfolio Error:', e.error);
  // You could show a user-friendly error message here
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
    }
  }
});

if ('PerformanceObserver' in window) {
  performanceObserver.observe({entryTypes: ['measure']});
}

// Utility function for debouncing scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink();
  updateParallaxEffects(window.pageYOffset);
}, 10);

// Replace the direct scroll handler with debounced version for better performance
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', debouncedScrollHandler);

// Add service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Add theme toggle functionality (if you want to add light/dark mode)
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Export functions for potential external use
window.portfolioAPI = {
  openModal,
  closeModal,
  toggleTheme,
  navigateToNextSection,
  updateActiveNavLink
};

// Analytics tracking (replace with your analytics code)
function trackEvent(action, category, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track important user interactions
document.addEventListener('click', (e) => {
  if (e.target.matches('.project-card')) {
    trackEvent('click', 'project', e.target.querySelector('h3').textContent);
  }
  
  if (e.target.matches('.contact-social-icon')) {
    trackEvent('click', 'contact', e.target.querySelector('.social-platform').textContent);
  }
  
  if (e.target.matches('.nav-link')) {
    trackEvent('click', 'navigation', e.target.textContent);
  }
});

// Add accessibility improvements
function improveAccessibility() {
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#hero';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--highlight);
    color: white;
    padding: 8px;
    border-radius: 4px;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ARIA labels to interactive elements
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${projectDetails[index]?.title || 'project'}`);
  });
  
  // Add focus indicators
  const style = document.createElement('style');
  style.textContent = `
    .skip-link:focus {
      top: 6px !important;
    }
    
    .project-card:focus {
      outline: 3px solid var(--highlight);
      outline-offset: 3px;
    }
    
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize accessibility improvements
improveAccessibility();

// Final initialization check
console.log('Portfolio JavaScript loaded successfully!');
console.log('Author: Mashal Sattar');
console.log('Portfolio features: Responsive design, smooth animations, interactive elements, working download functionality');