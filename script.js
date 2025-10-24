// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navMenu = document.getElementById("navMenu")
      const hamburger = document.getElementById("hamburger")
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
      }
    }
  })
})

// Active Navigation Link Highlighting
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem("theme") || "dark-theme"
body.classList.add(currentTheme)

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme")
    localStorage.setItem("theme", "light-theme")
  } else {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark-theme")
  }
})

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const filterValue = button.getAttribute("data-filter")

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category")

      if (filterValue === "all" || category === filterValue) {
        card.classList.remove("hidden")
        // Add fade-in animation
        card.style.animation = "fadeInUp 0.5s ease"
      } else {
        card.classList.add("hidden")
      }
    })
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Log form data (in a real application, this would be sent to a server)
  console.log("[v0] Contact form submitted:", { name, email, message })

  // Show success message
  alert("Thank you for your message! This is a demo form. Please use the email link to contact me directly.")

  // Reset form
  contactForm.reset()
})

// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll(".skill-progress")
let skillsAnimated = false

function animateSkillBars() {
  const skillsSection = document.getElementById("skills")
  const skillsSectionTop = skillsSection.offsetTop
  const skillsSectionHeight = skillsSection.offsetHeight
  const scrollY = window.pageYOffset
  const windowHeight = window.innerHeight

  if (scrollY + windowHeight > skillsSectionTop + 100 && !skillsAnimated) {
    skillBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })
    skillsAnimated = true
  }
}

window.addEventListener("scroll", animateSkillBars)

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  highlightNavigation()
  console.log("[v0] Portfolio website initialized")
})

// EmailJS Integration for Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');

  emailjs.sendForm(
    'service_qzmfpoc',    
    'template_nyys3c5',   
    this
  ).then(() => {
    status.textContent = "Message sent successfully!";
    status.style.color = "green";
    this.reset();
  }, (error) => {
    console.error('FAILED...', error);
    status.textContent = "Failed to send message. Please try again.";
    status.style.color = "red";
  });
});
