// =========================================================
// 🌟 1. APARICIÓN/DESAPARICIÓN GRADUAL EN SCROLL
// =========================================================

// Elementos clave
const decorationWrapper = document.getElementById('decoration-wrapper');
const titleBox = document.querySelector('.content-box.title-box');
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

            // Activamos desenfoque solo cuando el elemento está muy visible
            if (ratio > 0.80) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        }

        // 🎯 Ocultar decoración superior al entrar en la primera sección
        if (entry.target === firstSection) {
            if (entry.isIntersecting) {
                decorationWrapper?.classList.add('hide-decoration');
                decorationWrapper?.classList.remove('show-decoration');
            } else {
                decorationWrapper?.classList.remove('hide-decoration');
                decorationWrapper?.classList.add('show-decoration');
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

// ⚠️ Cambia esta fecha por la real del evento
const eventDate = new Date("Feb 12, 2026 16:00:00").getTime();

const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownEl = document.getElementById("countdown");
    countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // 🎉 Mensaje final cuando llega el día
    if (distance < 0) {
        clearInterval(x);
        countdownEl.innerHTML = "¡EL GRAN DÍA ES HOY!";
    }
}, 1000);


// =========================================================
// 🌸 3. APARICIÓN INICIAL DE DECORACIÓN Y TÍTULO
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('decoration-wrapper');
    const titleBox = document.querySelector('.content-box.title-box');

    setTimeout(() => {
        // Activamos decoración floral
        wrapper?.classList.add('show-decoration');

        // Inicializamos opacidad y posición de todas las secciones
        allContentBoxes.forEach(box => {
            box.style.opacity = 0;
            box.style.transform = `translateY(${SLIDE_DISTANCE}px)`;
        });

        // Mostramos el título inmediatamente
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

document.getElementById('rsvp-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('¡Gracias por confirmar! (Este es un mensaje de prueba de la funcionalidad).');
});

// =========================================================
// BOTON DE BIENVENIDA
// =========================================================

document.getElementById('boton-bienvenido').addEventListener('click', function () {
  const bienvenida = document.getElementById('pantalla-bienvenida');
  const invitacion = document.querySelector('.invitacion-principal');
  const audio = document.getElementById('audio-boda');

  // Reproducir música
  audio.volume = 0.25;
  audio.play();

  // Ocultar pantalla de bienvenida con transición
  bienvenida.style.opacity = '0';

  // Mostrar contenido principal después de la transición
  setTimeout(() => {
    bienvenida.style.display = 'none';
    invitacion.style.display = 'block';
  }, 1500); // Tiempo igual al de la transición CSS
});
