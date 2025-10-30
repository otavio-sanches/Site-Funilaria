// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header")
  if (window.scrollY > 20) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.getElementById("header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      const bootstrap = window.bootstrap // Declare the bootstrap variable
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  })
})

// Booking form submission
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const phone = document.getElementById("phone").value
  const service = document.getElementById("service").value
  const date = document.getElementById("date").value
  const message = document.getElementById("message").value

  // Get service name from select option
  const serviceSelect = document.getElementById("service")
  const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text

  // Create WhatsApp message
  const whatsappMessage = `Olá! Gostaria de agendar um serviço:\n\nNome: ${name}\nTelefone: ${phone}\nServiço: ${serviceName}\nData Preferencial: ${date}\nMensagem: ${message}`

  // WhatsApp URL (replace with actual phone number)
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank")
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(20px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Set minimum date for booking form
const dateInput = document.getElementById("date")
const today = new Date().toISOString().split("T")[0]
dateInput.setAttribute("min", today)
