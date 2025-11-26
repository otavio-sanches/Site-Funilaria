// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header")
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }
})

// Smooth scroll for navigation links (only for anchor links on same page)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    // Only prevent default if it's not just "#"
    if (href !== "#" && href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const header = document.getElementById("header")
        const headerHeight = header ? header.offsetHeight : 0
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          const bootstrap = window.bootstrap
          if (bootstrap) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse)
            bsCollapse.hide()
          }
        }
      }
    }
  })
})

// Booking form submission (if form exists)
const bookingForm = document.getElementById("bookingForm")
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name")?.value || ""
    const phone = document.getElementById("phone")?.value || ""
    const service = document.getElementById("service")?.value || ""
    const date = document.getElementById("date")?.value || ""
    const message = document.getElementById("message")?.value || ""

    // Get service name from select option
    const serviceSelect = document.getElementById("service")
    let serviceName = ""
    if (serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]) {
      serviceName = serviceSelect.options[serviceSelect.selectedIndex].text
    }

    // Create WhatsApp message
    const whatsappMessage = `Olá! Gostaria de agendar um serviço:\n\nNome: ${name}\nTelefone: ${phone}\nServiço: ${serviceName}\nData Preferencial: ${date}\nMensagem: ${message}`

    // WhatsApp URL (replace with actual phone number)
    const whatsappUrl = `https://wa.me/5511910920790?text=${encodeURIComponent(whatsappMessage)}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  })
}

// Set minimum date for booking form (if date input exists)
const dateInput = document.getElementById("date")
if (dateInput) {
  const today = new Date().toISOString().split("T")[0]
  dateInput.setAttribute("min", today)
}

// Add animation on scroll for sections
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

// Observe all sections that should animate
document.querySelectorAll("section").forEach((section) => {
  // Only animate sections that don't have the split layout
  if (!section.classList.contains("hero-split-section") && !section.classList.contains("login-page")) {
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  }
})
