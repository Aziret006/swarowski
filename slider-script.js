class SwarovskiSlider {
  constructor(sliderElement) {
    this.slider = sliderElement
    this.wrapper = this.slider.querySelector(".slider-wrapper")
    this.slides = this.slider.querySelectorAll(".slide")
    this.prevBtn = this.slider.querySelector(".prev")
    this.nextBtn = this.slider.querySelector(".next")
    this.paginationDots = this.slider.querySelectorAll(".pagination-dot")

    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.isTransitioning = false

    this.init()
  }

  init() {
    this.bindEvents()
    this.updateSlider()
    this.startAutoplay()
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    // Pagination dots
    this.paginationDots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index))
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide()
      if (e.key === "ArrowRight") this.nextSlide()
    })

    // Touch/swipe support
    this.addTouchSupport()

    // Pause autoplay on hover
    this.slider.addEventListener("mouseenter", () => this.stopAutoplay())
    this.slider.addEventListener("mouseleave", () => this.startAutoplay())
  }

  addTouchSupport() {
    let startX = 0
    let endX = 0

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    this.slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      this.handleSwipe(startX, endX)
    })
  }

  handleSwipe(startX, endX) {
    const threshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }
  }

  prevSlide() {
    if (this.isTransitioning) return

    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1
    this.updateSlider()
  }

  nextSlide() {
    if (this.isTransitioning) return

    this.currentSlide = this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1
    this.updateSlider()
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return

    this.currentSlide = index
    this.updateSlider()
  }

  updateSlider() {
    this.isTransitioning = true

    // Update wrapper position
    const translateX = -this.currentSlide * (100 / this.totalSlides)
    this.wrapper.style.transform = `translateX(${translateX}%)`

    // Update active states
    this.updateActiveStates()

    // Reset transition flag
    setTimeout(() => {
      this.isTransitioning = false
    }, 600)
  }

  updateActiveStates() {
    // Update slides
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide)
    })

    // Update pagination dots
    this.paginationDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })
  }

  startAutoplay() {
    this.stopAutoplay()
    this.autoplayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    }
  }

  destroy() {
    this.stopAutoplay()
    // Remove event listeners if needed
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const sliderElement = document.querySelector(".slider")
  if (sliderElement) {
    new SwarovskiSlider(sliderElement)
  }
})

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = SwarovskiSlider
}
