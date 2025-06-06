// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Mobile menu toggle
document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  // Toggle mobile menu visibility
  const nav = document.querySelector(".nav")
  nav.style.display = nav.style.display === "block" ? "none" : "block"

  // Animate hamburger to X
  const spans = document.querySelectorAll(".mobile-menu-btn span")
  spans.forEach((span) => span.classList.toggle("active"))
})

// Smooth scroll for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Close mobile menu when link is clicked
    if (window.innerWidth <= 768) {
      document.querySelector(".nav").style.display = "none"
    }
  })
})

// Button click handlers
document.querySelector(".btn-primary").addEventListener("click", () => {
  console.log("Каталог clicked")
  // Add catalog navigation logic
})

document.querySelector(".btn-secondary").addEventListener("click", () => {
  console.log("Узнать больше clicked")
  // Add learn more functionality
})

// Search functionality
document.querySelector(".search-btn").addEventListener("click", () => {
  console.log("Search clicked")
  // Add search functionality
})

// Favorites functionality
document.querySelector(".favorites-btn").addEventListener("click", () => {
  console.log("Favorites clicked")
  // Add favorites functionality
})

