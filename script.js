// =========================================================
// 🌟 1. APARICIÓN/DESAPARICIÓN GRADUAL EN SCROLL
// =========================================================

// Elementos clave
const decorationWrapper = document.getElementById('decoration-wrapper');
// El título ya está incluido en allContentBoxes, no es estrictamente necesario seleccionarlo aparte
const firstSection = document.querySelector('.content-box.section:nth-of-type(1)');
const allContentBoxes = document.querySelectorAll('.content-box');

// Umbrales para transición suave (0.00 a 1.00)
const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
const SLIDE_DISTANCE = 80;

// Observador de intersección
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        // 🎯 Aparición gradual de secciones
        if (entry.target.classList.contains('content-box')) {
            const ratio = entry.intersectionRatio;
            const translateY = SLIDE_DISTANCE * (1 - ratio);

            entry.target.style.opacity = ratio;
            entry.target.style.transform = `translateY(${translateY}px)`;

            // Activamos clase 'show' cuando el elemento está muy visible
            if (ratio > 0.80) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        }

        // 🎯 Ocultar/Mostrar decoración superior al pasar la primera sección
        if (entry.target === firstSection && decorationWrapper) {
            if (entry.isIntersecting) {
                decorationWrapper.classList.add('hide-decoration');
                decorationWrapper.classList.remove('show-decoration');
            } else {
                // Muestra la decoración solo si volvemos a la parte superior
                decorationWrapper.classList.remove('hide-decoration');
                decorationWrapper.classList.add('show-decoration');
            }
        }
    });
}, {
    threshold: thresholds
});

// Activamos el observador en todas las secciones
allContentBoxes.forEach((el) => observer.observe(el));
if (firstSection) observer.observe(firstSection);


// =========================================================
// ⏳ 2. CONTADOR REGRESIVO PARA EL EVENTO
// =========================================================

// ⚠️ Cambia esta fecha por la real del evento (¡ACTUALIZAR!)
const eventDate = new Date("Feb 12, 2026 16:00:00").getTime();

const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // 🎉 Mensaje final cuando llega el día
    if (distance < 0) {
        clearInterval(x);
        if (countdownEl) {
             countdownEl.innerHTML = "¡EL GRAN DÍA ES HOY!";
        }
    }
}, 1000);


// =========================================================
// 🌸 3. INICIALIZACIÓN DE LA PÁGINA (Prepara el contenido oculto)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('decoration-wrapper');
    const titleBox = document.querySelector('.content-box.title-box');

    // Inicializamos opacidad y posición de todas las secciones para la animación de scroll
    allContentBoxes.forEach(box => {
        box.style.opacity = 0;
        box.style.transform = `translateY(${SLIDE_DISTANCE}px)`;
    });

    // Pequeño retraso para la animación de la decoración
    setTimeout(() => {
        // Activamos la decoración floral
        wrapper?.classList.add('show-decoration');

        // Mostramos el título inmediatamente (ya que está al inicio del scroll)
        if (titleBox) {
            titleBox.style.opacity = 1;
            titleBox.style.transform = 'translateY(0px)';
            titleBox.classList.add('show');
        }
    }, 300);
});


// =========================================================
// 📬 4. MENSAJE DE CONFIRMACIÓN DE FORMULARIO
// =========================================================

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('¡Gracias por confirmar! (Este es un mensaje de prueba de la funcionalidad).');
    });
}


// =========================================================
// 🔊 5. BOTÓN DE BIENVENIDA Y REPRODUCCIÓN DE AUDIO (CORREGIDO)
// =========================================================

document.getElementById('boton-bienvenido').addEventListener('click', function () {
  const bienvenida = document.getElementById('pantalla-bienvenida');
  const audio = document.getElementById('audio-boda');

  // 🔊 Iniciar la reproducción del audio (Clave para que funcione en navegadores)
  audio.volume = 0.25; // Establecer volumen al 25% (recomendado)
  audio.play().catch(error => {
      // Captura el error si la reproducción falla por algún bloqueo del navegador
      console.log("Error al intentar reproducir el audio:", error);
  });

  // Ocultar pantalla de bienvenida con transición CSS (opacidad a 0)
  bienvenida.style.opacity = '0';

  // Ocultar el div de bienvenida completamente después de la transición (1500ms)
  setTimeout(() => {
    bienvenida.style.display = 'none';
    // No necesitamos mostrar el div de la invitación si ya estaba en el HTML y solo lo tapaba la bienvenida.
  }, 1500); 
});
