// =========================================================
// 🌟 1. APARICIÓN/DESAPARICIÓN GRADUAL EN SCROLL (OPTIMIZADO)
// =========================================================

// Elementos clave
const decorationWrapper = document.getElementById('decoration-wrapper');
const allContentBoxes = document.querySelectorAll('.content-box');

// Umbral fijo para que la animación se dispare al 15% de visibilidad
const OPTIMIZED_THRESHOLD = 0.15; 
const SLIDE_DISTANCE = 80;

// Observador de intersección
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {

        // 🎯 Aparición de secciones (solo animar una vez y desobservar)
        if (entry.target.classList.contains('content-box')) {
            if (entry.isIntersecting) {
                // Aplicamos la clase 'show' que activa la transición de CSS
                entry.target.classList.add('show');
                
                // OPTIMIZACIÓN: Una vez animado, dejamos de observarlo
                observer.unobserve(entry.target);
            }
        }

        // 🎯 Ocultar/Mostrar decoración superior
        if (entry.target === allContentBoxes[0] && decorationWrapper) {
            if (entry.isIntersecting) {
                // Si la primera caja es visible, ocultar decoración
                decorationWrapper.classList.add('hide-decoration');
                decorationWrapper.classList.remove('show-decoration');
            } else {
                // Si la primera caja NO es visible (scroll hacia abajo), mostrar decoración
                decorationWrapper.classList.remove('hide-decoration');
                decorationWrapper.classList.add('show-decoration');
            }
        }
    });
}, {
    threshold: OPTIMIZED_THRESHOLD 
});

// Inicializamos y asignamos estilos para la animación
document.addEventListener('DOMContentLoaded', () => {
    allContentBoxes.forEach((el) => {
        
        // **LÓGICA CRÍTICA:** Excluir la sección 'details' del efecto de scroll
        if (el.classList.contains('details')) {
            // 1. Mostrar inmediatamente con la clase 'show' para activar el FADE-IN rápido en CSS
            el.classList.add('show');
            
            // 2. Ya no es necesario observar esta sección
            return; 
        }

        // Aplicar estilos iniciales de fade-in para todas las demás secciones (con desplazamiento)
        el.style.opacity = 0;
        el.style.transform = `translateY(${SLIDE_DISTANCE}px)`;
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.willChange = 'opacity, transform';
        
        observer.observe(el);
    });

    // Activamos la decoración floral inmediatamente al cargar
    if (decorationWrapper) {
        decorationWrapper.classList.add('show-decoration');
    }
});


// =========================================================
// ⏳ 2. CONTADOR REGRESIVO PARA EL EVENTO (Mantener)
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
            countdownEl.classList.add('finished');
        }
    }
}, 1000);


// =========================================================
// 📬 3. MENSAJE DE CONFIRMACIÓN DE FORMULARIO (Mantener)
// =========================================================

const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('¡Gracias por confirmar! (Este es un mensaje de prueba de la funcionalidad).');
    });
}


// =========================================================
// 🔊 4. BOTÓN DE BIENVENIDA Y REPRODUCCIÓN DE AUDIO (Mantener)
// =========================================================

document.getElementById('boton-bienvenido').addEventListener('click', function () {
    const bienvenida = document.getElementById('pantalla-bienvenida');
    const audio = document.getElementById('audio-boda');
    
    // 1. Iniciar la transición visual (opacidad a 0)
    bienvenida.style.opacity = '0';
    
    // 2. Intentar la reproducción (CLAVE para Autoplay en móviles)
    audio.volume = 0.25; 
    audio.play().catch(error => {
        console.log("Error de Autoplay (Ignorado si es por la política del navegador):", error);
    });

    // 3. Ocultar el div completamente después de la transición de 1.5s
    setTimeout(() => {
        bienvenida.style.display = 'none';
        
        const principal = document.querySelector('.invitacion-principal');
        if (principal) {
            principal.style.display = 'block'; 
        }
    }, 1500); 
});
