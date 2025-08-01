// Responsive Navbar Toggle with Animation
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate menu toggle icon
  if (navLinks.classList.contains('active')) {
    menuToggle.style.transform = 'rotate(90deg)';
  } else {
    menuToggle.style.transform = 'rotate(0deg)';
  }
});

// Enhanced Typing Animation for Hero Section
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

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typedText.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 800);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      setTimeout(type, 100);
    }
  }
}

// Start typing animation
setTimeout(type, 1000);

// Animation state trackers
let skillsAnimated = false;
let projectsAnimated = false;
let contactFormAnimated = false;
let socialLinksAnimated = false;

// Enhanced Skills Animation
function animateSkills() {
  if (skillsAnimated) return;
  
  const skillBars = document.querySelectorAll('.skill-bar');
  const progressBars = document.querySelectorAll('.progress');
  
  // Add staggered animation to skill bars
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.classList.add('animate-skill');
      
      // Add hover effect
      bar.addEventListener('mouseenter', () => {
        bar.style.transform = 'translateX(20px) scale(1.04)';
      });
      
      bar.addEventListener('mouseleave', () => {
        bar.style.transform = 'translateX(0) scale(1)';
      });
    }, index * 300);
  });
  
  // Animate progress bars with enhanced timing
  setTimeout(() => {
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      }, index * 200);
    });
  }, 800);
  
  skillsAnimated = true;
}

// Enhanced Projects Animation
function animateProjects() {
  if (projectsAnimated) return;
  
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-project');
      
      // Add enhanced hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-25px) scale(1.1) rotateY(10deg)';
        card.style.boxShadow = '0 25px 70px rgba(0,0,0,0.3)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      });
    }, index * 300);
  });
  
  projectsAnimated = true;
}

// Enhanced Contact Form Animation
function animateContactForm() {
  if (contactFormAnimated) return;
  
  const formGroups = document.querySelectorAll('.form-group');
  
  formGroups.forEach((group, index) => {
    setTimeout(() => {
      group.classList.add('animate-form');
      
      // Add focus animations
      const input = group.querySelector('input, textarea');
      if (input) {
        input.addEventListener('focus', () => {
          group.style.transform = 'translateX(15px) scale(1.03)';
        });
        
        input.addEventListener('blur', () => {
          group.style.transform = 'translateX(0) scale(1)';
        });
      }
    }, index * 200);
  });
  
  contactFormAnimated = true;
}

// Enhanced Social Links Animation
function animateSocialLinks() {
  if (socialLinksAnimated) return;
  
  const socialIcons = document.querySelectorAll('.animated-social');
  
  socialIcons.forEach((icon, index) => {
    setTimeout(() => {
      icon.classList.add('animate-social');
      
      // Add enhanced hover effects
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-25px) scale(1.2) rotateY(18deg)';
        icon.style.boxShadow = '0 25px 60px rgba(0,173,181,0.45)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        icon.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      });
    }, index * 300);
  });
  
  socialLinksAnimated = true;
}

// Enhanced Smooth Scroll for Nav Links
const navLinkEls = document.querySelectorAll('.nav-links a');
navLinkEls.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // Smooth scroll with offset for fixed nav
      const targetSection = document.querySelector(href);
      const offsetTop = targetSection.offsetTop - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu with animation
      navLinks.classList.remove('active');
      menuToggle.style.transform = 'rotate(0deg)';
      
      // Add active state to nav link
      navLinkEls.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Enhanced Reveal Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger specific animations based on section
      const sectionId = entry.target.id;
      
      switch(sectionId) {
        case 'skills':
          setTimeout(animateSkills, 300);
          break;
        case 'projects':
          setTimeout(animateProjects, 300);
          break;
        case 'contact':
          setTimeout(animateContactForm, 300);
          break;
      }
      
      // Check for social links section
      if (entry.target.querySelector('.social-links')) {
        setTimeout(animateSocialLinks, 300);
      }
    }
  });
}, observerOptions);

// Observe all reveal elements
const revealElements = document.querySelectorAll('.reveal, .timeline-item');
revealElements.forEach(el => observer.observe(el));

// Enhanced Project Modal with Animation
const projectDetails = [
  {
    title: 'Rupee Invoice System',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    desc: 'A comprehensive invoice management system built with modern web technologies, featuring dynamic invoice generation, client management, automated calculations, and real-time data processing for enhanced business efficiency.'
  },
  {
    title: 'Detection & Tracking Through Drone',
    img: 'drone.PNG',
    tags: ['Python', 'AI/ML', 'Deep Learning'],
    desc: 'Advanced computer vision system for real-time object detection and tracking using drone technology. Leveraging deep learning frameworks like YOLO and OpenCV for enhanced accuracy in surveillance, search and rescue operations, and automated monitoring systems.'
  },
  {
    title: 'Courier Android App',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    tags: ['Java', 'Kotlin'],
    desc: 'Mobile application for courier services with real-time tracking, delivery management, route optimization, and user-friendly interface. Built with modern Android development practices including MVVM architecture and Firebase integration.'
  }
];

window.openModal = function(idx) {
  const modal = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  const p = projectDetails[idx];
  
  body.innerHTML = `
    <img src="${p.img}" alt="${p.title}" style="width:100%;border-radius:15px;margin-bottom:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.1);"/>
    <h3 style="color:var(--secondary);font-size:1.4rem;margin-bottom:1rem;">${p.title}</h3>
    <div class="project-tags" style="margin-bottom:1.5rem;">${p.tags.map(t=>`<span style="background:var(--highlight);color:white;padding:0.4rem 1rem;border-radius:20px;margin-right:0.5rem;font-size:0.9rem;">${t}</span>`).join('')}</div>
    <p style="line-height:1.6;color:var(--primary);font-size:1rem;">${p.desc}</p>
  `;
  
  modal.style.display = 'flex';
  
  // Add modal animation
  setTimeout(() => {
    modal.querySelector('.modal-content').classList.add('slide-in-modal');
  }, 10);
}

window.closeModal = function() {
  const modal = document.getElementById('project-modal');
  const modalContent = modal.querySelector('.modal-content');
  
  modalContent.style.animation = 'modalSlideOut 0.3s ease-in-out forwards';
  
  setTimeout(() => {
    modal.style.display = 'none';
    modalContent.style.animation = '';
    modalContent.classList.remove('slide-in-modal');
  }, 300);
}

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('project-modal');
  if (event.target === modal) {
    closeModal();
  }
}

// Enhanced Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Show loading state
  formMessage.textContent = "Sending your message...";
  formMessage.className = 'fade-in-message show';
  formMessage.style.color = '#ff9500';
  
  // Simulate form submission
  setTimeout(() => {
    formMessage.textContent = `Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`;
    formMessage.style.color = '#219150';
    
    // Reset form with animation
    contactForm.reset();
    
    // Remove focus styles from form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      if (input) {
        input.classList.remove('filled');
      }
    });
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('show');
      setTimeout(() => {
        formMessage.textContent = '';
      }, 500);
    }, 5000);
  }, 2000);
});

// Enhanced floating label functionality
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
  // Handle focus and blur events
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateX(8px) scale(1.03)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'translateX(0) scale(1)';
    
    if (this.value) {
      this.classList.add('filled');
    } else {
      this.classList.remove('filled');
    }
  });
  
  // Handle input events for real-time validation
  input.addEventListener('input', function() {
    if (this.value) {
      this.style.borderColor = 'var(--highlight)';
    } else {
      this.style.borderColor = 'var(--accent)';
    }
  });
});

// Enhanced Portfolio Download Function
const downloadPortfolioBtn = document.getElementById('download-portfolio-btn');

downloadPortfolioBtn.addEventListener('click', function() {
  // Add loading animation
  this.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.416" stroke-dashoffset="31.416" opacity="0.3"/>
      <path d="M12 2C6.477 2 2 6.477 2 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    </svg>
    Preparing Download...
  `;
  
  this.style.pointerEvents = 'none';
  
  // Simulate download preparation
  setTimeout(() => {
    // Generate portfolio content
    const portfolioContent = generatePortfolioHTML();
    
    // Create and trigger download
    const blob = new Blob([portfolioContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mashal_Sattar_Portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Reset button
    this.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Download Complete!
    `;
    this.style.background = 'linear-gradient(135deg, #219150, #00adb5)';
    
    setTimeout(() => {
      this.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Download Portfolio
      `;
      this.style.background = 'linear-gradient(135deg, var(--secondary), var(--highlight))';
      this.style.pointerEvents = 'auto';
    }, 2000);
  }, 1500);
});

// Function to generate complete portfolio HTML
function generatePortfolioHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mashal Sattar - Portfolio</title>
  <style>
    ${document.querySelector('style') ? document.querySelector('style').textContent : ''}
    body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: #f7f7f7; }
    .portfolio-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { color: #00adb5; font-size: 2.5rem; margin-bottom: 10px; }
    .header p { color: #222831; font-size: 1.2rem; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #222831; border-bottom: 2px solid #74a0d9; padding-bottom: 10px; }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .skill-item { background: #f0f8ff; padding: 15px; border-radius: 10px; text-align: center; }
    .contact-info { background: #e8f4f8; padding: 20px; border-radius: 15px; }
  </style>
</head>
<body>
  <div class="portfolio-container">
    <div class="header">
      <h1>Mashal Sattar</h1>
      <p>AI/ML & Deep Learning Enthusiast | Web Developer | Detection & Tracking Innovator</p>
    </div>
    
    <div class="section">
      <h2>About Me</h2>
      <p>I'm Mashal Sattar, a passionate Web Developer & AI/ML enthusiast skilled in building responsive websites, dynamic web apps, and intelligent systems. Experienced in WordPress, real-time object detection, and data-driven automation. I turn ideas into smart, user-focused digital solutions that deliver real results.</p>
    </div>
    
    <div class="section">
      <h2>Skills</h2>
      <div class="skills-grid">
        <div class="skill-item">Web Development (95%)</div>
        <div class="skill-item">WordPress Development (92%)</div>
        <div class="skill-item">AI/ML & Deep Learning (90%)</div>
        <div class="skill-item">Python Development (88%)</div>
        <div class="skill-item">Detection & Tracking (85%)</div>
      </div>
    </div>
    
    <div class="section">
      <h2>Experience</h2>
      <div style="margin-bottom: 20px;">
        <h3>Machine Learning Engineer Intern</h3>
        <p><strong>National Center Of Physics | July 2024 - August 2024</strong></p>
        <p>Applied Computer Vision and machine learning techniques to real-world target detection and tracking scenarios, leveraging python and deep learning framework to enhance accuracy and efficiency in diverse environments.</p>
      </div>
    </div>
    
    <div class="section">
      <h2>Education</h2>
      <div style="margin-bottom: 15px;">
        <h3>Bachelor of Science in Computer Engineering</h3>
        <p><strong>Institute of Space and Technology | 2021 - 2025</strong></p>
      </div>
      <div style="margin-bottom: 15px;">
        <h3>Intermediate in Computer Science</h3>
        <p><strong>KRL Model College Kahuta | 2019 - 2021</strong></p>
      </div>
    </div>
    
    <div class="section">
      <h2>Featured Projects</h2>
      <div style="margin-bottom: 15px;">
        <h3>Rupee Invoice System</h3>
        <p>Technologies: HTML, CSS, JavaScript, PHP</p>
        <p>A comprehensive invoice management system with dynamic generation and real-time processing.</p>
      </div>
      <div style="margin-bottom: 15px;">
        <h3>Detection & Tracking Through Drone</h3>
        <p>Technologies: Python, AI/ML, Deep Learning</p>
        <p>Advanced computer vision system for real-time object detection and tracking using drone technology.</p>
      </div>
      <div style="margin-bottom: 15px;">
        <h3>Courier Android App</h3>
        <p>Technologies: Java, Kotlin</p>
        <p>Mobile application for courier services with real-time tracking and delivery management.</p>
      </div>
    </div>
    
    <div class="contact-info">
      <h2>Contact Information</h2>
      <p><strong>Email:</strong> mishelsattar393@gmail.com</p>
      <p><strong>LinkedIn:</strong> https://www.linkedin.com/in/mashal-sattar-441679281</p>
      <p><strong>GitHub:</strong> https://github.com/mashalsattar</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; color: #666;">
      <p>© 2025 Mashal Sattar. All rights reserved.</p>
      <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
  </div>
</body>
</html>`;
}

// Enhanced Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-section');
  const speed = 0.3;
  
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * speed}px)`;
  }
  
  // Update navigation background opacity based on scroll
  const nav = document.querySelector('.glass-nav');
  const scrollPercentage = Math.min(scrolled / 200, 1);
  nav.style.background = `rgba(255,255,255,${0.18 + scrollPercentage * 0.12})`;
  
  // Animate floating particles based on scroll
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    const speed = 0.1 + (index * 0.05);
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes modalSlideOut {
    from { 
      opacity: 1; 
      transform: scale(1) translateY(0);
    }
    to { 
      opacity: 0; 
      transform: scale(0.8) translateY(-50px);
    }
  }
  
  @keyframes navLinkHover {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .nav-links a:hover {
    animation: navLinkHover 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);

// Enhanced Loading Animation
window.addEventListener('load', () => {
  // Add loading complete class to body
  document.body.classList.add('loaded');
  
  // Initialize all animations
  setTimeout(() => {
    // Check if sections are in view on load
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('visible');
        
        // Trigger specific animations
        const sectionId = section.id;
        switch(sectionId) {
          case 'skills':
            setTimeout(animateSkills, 500);
            break;
          case 'projects':
            setTimeout(animateProjects, 500);
            break;
          case 'contact':
            setTimeout(animateContactForm, 500);
            break;
        }
        
        if (section.querySelector('.social-links')) {
          setTimeout(animateSocialLinks, 500);
        }
      }
    });
  }, 100);
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
  // Close modal with Escape key
  if (e.key === 'Escape') {
    const modal = document.getElementById('project-modal');
    if (modal.style.display === 'flex') {
      closeModal();
    }
  }
  
  // Navigate sections with arrow keys
  if (e.ctrlKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
    e.preventDefault();
    const sections = [...document.querySelectorAll('section[id]')];
    const currentSection = sections.find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom > 100;
    });
    
    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection);
      let nextIndex;
      
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % sections.length;
      } else {
        nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
      }
      
      sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

console.log('🚀 Portfolio loaded with enhanced professional animations and download functionality!');