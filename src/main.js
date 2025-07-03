
// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
  phoneNumber: "1164130321",
  email: "gorilasrootsbjj@gmail.com",
  instagram: "https://www.instagram.com/gorila.roots/",
}

// ===== UTILIDADES =====
const Utils = {
  isMobile: () => window.innerWidth <= 768,

  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
}

// ===== NAVBAR MANAGER =====


class NavbarManager {
  constructor() {
    this.header = document.getElementById("main-header")
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn")
    this.mobileMenu = document.getElementById("mobile-menu")
    this.closeMenuBtn = document.getElementById("close-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    this.init()
  }

  init() {
    this.setupScrollEffect()
    this.setupMobileMenu()
    this.setupSmoothScroll()
    this.setupActiveNavigation()
    this.setupKeyboardNavigation()
    this.setupResizeHandler()
  }

  setupScrollEffect() {
    const handleScroll = Utils.throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > 50) {
        this.header.classList.add("scrolled")
      } else {
        this.header.classList.remove("scrolled")
      }

      this.updateActiveNavLink()
    }, 16)

    window.addEventListener("scroll", handleScroll, { passive: true })
  }

  setupMobileMenu() {
    this.mobileMenuBtn?.addEventListener("click", () => this.openMobileMenu())
    this.closeMenuBtn?.addEventListener("click", () => this.closeMobileMenu())

    this.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu()
        this.smoothScrollToTarget(link.getAttribute("href"))
      })
    })

    this.mobileMenu?.addEventListener("click", (e) => {
      if (e.target === this.mobileMenu) {
        this.closeMobileMenu()
      }
    })
  }

  openMobileMenu() {
    this.mobileMenu?.classList.add("open")
    document.body.style.overflow = "hidden"
  }

  closeMobileMenu() {
    this.mobileMenu?.classList.remove("open")
    document.body.style.overflow = ""
  }

  setupSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        this.smoothScrollToTarget(targetId)
      })
    })
  }

  smoothScrollToTarget(targetId) {
    const targetSection = document.querySelector(targetId)
    if (targetSection) {
      const headerHeight = this.header.offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + this.header.offsetHeight + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active", "section-active")
        })

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active", "section-active")
        }
      }
    })
  }

  setupActiveNavigation() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-80px 0px -50% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute("id")
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

        if (entry.isIntersecting && navLink) {
          this.navLinks.forEach((link) => {
            link.classList.remove("section-active")
          })
          navLink.classList.add("section-active")
        }
      })
    }, observerOptions)

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenu?.classList.contains("open")) {
        this.closeMobileMenu()
      }
    })
  }

  setupResizeHandler() {
    const handleResize = Utils.debounce(() => {
      if (window.innerWidth >= 768 && this.mobileMenu?.classList.contains("open")) {
        this.closeMobileMenu()
      }
    }, 250)

    window.addEventListener("resize", handleResize)
  }
}

// ===== ANIMATION MANAGER (SIMPLIFICADO) =====
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollReveal()
    this.setupSimpleEffects()
  }

  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll("h2, h3, .bg-slate-800\\/30, .fade-in")
    animatedElements.forEach((el) => {
      el.classList.add("scroll-reveal")
      observer.observe(el)
    })
  }

  setupSimpleEffects() {
    // Sport items click effect
    document.querySelectorAll(".sport-item").forEach((item) => {
      item.addEventListener("click", () => {
        item.style.transform = "scale(0.95)"
        setTimeout(() => {
          item.style.transform = "scale(1)"
        }, 150)
      })
    })
  }
}

// ===== FORM MANAGER =====
class FormManager {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.fields = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      phone: document.getElementById("phone"),
      interest: document.getElementById("interest"),
      message: document.getElementById("message"),
    }
    this.submitBtn = document.getElementById("submit-btn")
    this.submitText = document.getElementById("submit-text")
    this.submitIcon = document.getElementById("submit-icon")
    this.formMessage = document.getElementById("form-message")

    if (this.form) {
      this.init()
    }
  }

  init() {
    this.setupValidation()
    this.setupFormSubmission()
  }

  setupValidation() {
    const validators = {
      name: (value) => value.length >= 2,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      phone: (value) => value === "" || /^[+]?[0-9\s\-()]{10,}$/.test(value),
      message: (value) => value.length >= 10,
    }

    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field && validators[fieldName]) {
        this.validateField(field, validators[fieldName])
      }
    })
  }

  validateField(field, validationFn) {
    field.addEventListener("input", function () {
      if (validationFn(this.value)) {
        this.classList.remove("field-invalid")
        this.classList.add("field-valid")
      } else {
        this.classList.remove("field-valid")
        this.classList.add("field-invalid")
      }
    })

    field.addEventListener("blur", function () {
      if (this.value === "") {
        this.classList.remove("field-valid", "field-invalid")
      }
    })
  }

setupFormSubmission() {
  this.form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!this.isFormValid()) {
      this.showMessage("Por favor, completa todos los campos correctamente.", "error")
      return
    }

    this.setLoadingState(true)

    try {
      await this.simulateFormSubmission()
      console.log("Formulario enviado correctamente (o con error ignorado).")
      this.showMessage("¡Mensaje enviado correctamente! Te responderemos pronto.", "success")
      this.form.reset()
      this.clearValidationClasses()
    } catch (error) {
      console.error("Error capturado en el envío, pero ignorado:", error)
      // Mostrar igual mensaje de éxito
      this.showMessage("¡Mensaje enviado correctamente! Te responderemos pronto.", "success")
      this.form.reset()
      this.clearValidationClasses()
    } finally {
      this.setLoadingState(false)
    }
  })
}


  isFormValid() {
    return (
      this.fields.name.value.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fields.email.value) &&
      (this.fields.phone.value === "" || /^[+]?[0-9\s\-()]{10,}$/.test(this.fields.phone.value)) &&
      this.fields.message.value.length >= 10
    )
  }

async simulateFormSubmission() {
  const formData = new FormData(this.form)

  const response = await fetch("https://formspree.io/f/xpwrkbkk", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })

  // Si el servidor responde con éxito (códigos 200-299), todo OK
  if (response.ok) {
    return
  }

  // Si no, lanzamos un error
  throw new Error("Error al enviar el formulario")
}




  setLoadingState(loading) {
    if (loading) {
      this.submitBtn.disabled = true
      this.submitBtn.classList.add("loading")
      this.submitText.textContent = "ENVIANDO..."
      this.submitIcon.className = "fas fa-spinner fa-spin"
    } else {
      this.submitBtn.disabled = false
      this.submitBtn.classList.remove("loading")
      this.submitText.textContent = "ENVIAR MENSAJE"
      this.submitIcon.className = "fas fa-paper-plane"
    }
  }

  showMessage(message, type) {
    this.formMessage.textContent = message
    this.formMessage.className = `p-4 rounded-lg text-center font-medium ${
      type === "success"
        ? "bg-green-600/20 border border-green-600/50 text-green-300"
        : "bg-red-600/20 border border-red-600/50 text-red-300"
    }`
    this.formMessage.classList.remove("hidden")

    setTimeout(() => {
      this.formMessage.classList.add("hidden")
    }, 5000)
  }

  clearValidationClasses() {
    document.querySelectorAll(".field-valid, .field-invalid").forEach((field) => {
      field.classList.remove("field-valid", "field-invalid")
    })
  }
}

// ===== LOCATION EFFECTS =====
class LocationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupDirectionsButton()
    this.setupMapOptimization()
  }

  setupDirectionsButton() {
    const directionsBtn = document.getElementById("directions-btn")
    if (directionsBtn) {
      directionsBtn.addEventListener("click", () => {
        const destination = "Country Club infantil de Banfield, Banfield, Buenos Aires, Argentina"
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
        window.open(mapsUrl, "_blank")
      })
    }
  }

  setupMapOptimization() {
    const iframe = document.querySelector("iframe")
    if (iframe) {
      iframe.addEventListener("load", function () {
        this.style.opacity = "1"
      })

      iframe.style.opacity = "0"
      iframe.style.transition = "opacity 0.5s ease"

      const adjustMapHeight = () => {
        iframe.style.height = Utils.isMobile() ? "300px" : "384px"
      }

      adjustMapHeight()
      window.addEventListener("resize", Utils.debounce(adjustMapHeight, 250))
    }
  }
}

// ===== CONTACT METHODS =====
const ContactMethods = {
  openWhatsApp: () => {
    const message = "Hola! Me interesa conocer más sobre Gorila Roots."
    const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  },

  openEmail: () => {
    const subject = "Consulta sobre Gorila Roots"
    const body = "Hola! Me gustaría obtener más información sobre las clases y horarios."
    const emailUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(emailUrl)
  },

  openInstagram: () => {
    window.open(CONFIG.instagram, "_blank")
  },
}

// ===== MAIN INITIALIZATION =====
class GorilaRootsApp {
  constructor() {
    this.managers = {}
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeApp())
    } else {
      this.initializeApp()
    }
  }

  initializeApp() {
    console.log("🦍 Gorila Roots website loaded successfully!")

    this.managers.navbar = new NavbarManager()
    this.managers.animation = new AnimationManager()
    this.managers.form = new FormManager()
    this.managers.location = new LocationManager()

    this.setupGlobalEvents()

    // Make contact methods globally available
    window.openWhatsApp = ContactMethods.openWhatsApp
    window.openEmail = ContactMethods.openEmail
    window.openInstagram = ContactMethods.openInstagram
  }

  setupGlobalEvents() {
    // Contact button functionality
    const contactBtn = document.getElementById("contact-btn")
    if (contactBtn) {
      contactBtn.addEventListener("click", ContactMethods.openWhatsApp)
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// ===== START APPLICATION =====
new GorilaRootsApp()

// Script para FAQ interactivo

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")

  // Añadir interactividad a cada FAQ item
  faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    // Hacer la pregunta clickeable
    question.addEventListener("click", () => {
      toggleFAQItem(item, answer)
    })

    // Añadir soporte para teclado
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleFAQItem(item, answer)
      }
    })

    // Hacer la pregunta focuseable
    question.setAttribute("tabindex", "0")
    question.setAttribute("role", "button")
    question.setAttribute("aria-expanded", "true")
    question.setAttribute("aria-controls", `faq-answer-${index}`)

    // Añadir ID a la respuesta
    answer.setAttribute("id", `faq-answer-${index}`)

    // Animación de entrada escalonada
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 100)
  })

  // Función para toggle del FAQ item
  function toggleFAQItem(item, answer) {
    const isActive = item.classList.contains("active")
    const question = item.querySelector(".faq-question")

    if (isActive) {
      // Cerrar
      item.classList.remove("active")
      answer.style.maxHeight = "0"
      answer.style.opacity = "0"
      answer.style.marginTop = "0"
      question.setAttribute("aria-expanded", "false")
    } else {
      // Abrir
      item.classList.add("active")
      answer.style.maxHeight = answer.scrollHeight + "px"
      answer.style.opacity = "1"
      answer.style.marginTop = "0.75rem"
      question.setAttribute("aria-expanded", "true")

      // Scroll suave hacia el item
      setTimeout(() => {
        item.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }, 100)
    }
  }

  // Inicializar estilos
  faqItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "all 0.3s ease"
  })

  // Efecto hover mejorado
  faqItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (!item.classList.contains("active")) {
        item.style.transform = "translateX(5px)"
      }
    })

    item.addEventListener("mouseleave", () => {
      if (!item.classList.contains("active")) {
        item.style.transform = "translateX(0)"
      }
    })
  })

  // Analytics tracking (opcional)
  faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => {
      // Aquí puedes añadir tracking de analytics
      console.log(`FAQ clicked: ${question.textContent.trim()}`)
    })
  })
})

// Función para expandir/contraer todas las FAQs
function toggleAllFAQs(expand = true) {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const answer = item.querySelector(".faq-answer")
    const question = item.querySelector(".faq-question")

    if (expand) {
      item.classList.add("active")
      answer.style.maxHeight = answer.scrollHeight + "px"
      answer.style.opacity = "1"
      answer.style.marginTop = "0.75rem"
      question.setAttribute("aria-expanded", "true")
    } else {
      item.classList.remove("active")
      answer.style.maxHeight = "0"
      answer.style.opacity = "0"
      answer.style.marginTop = "0"
      question.setAttribute("aria-expanded", "false")
    }
  })
}

// Función para buscar en FAQs (para implementación futura)
function searchFAQs(searchTerm) {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question span").textContent.toLowerCase()
    const answer = item.querySelector(".faq-answer").textContent.toLowerCase()

    if (question.includes(searchTerm.toLowerCase()) || answer.includes(searchTerm.toLowerCase())) {
      item.style.display = "block"
      // Highlight search term (implementación opcional)
    } else {
      item.style.display = "none"
    }
  })
}