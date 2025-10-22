// =========================================================
// 🌟 1. APARICIÓN/DESAPARICIÓN GRADUAL EN SCROLL (OPTIMIZADO)
// =========================================================

// Elementos clave
const decorationWrapper = document.getElementById('decoration-wrapper');
const allContentBoxes = document.querySelectorAll('.content-box');

// Umbral fijo para que la animación se dispare al 15% de visibilidad
const OPTIMIZED_THRESHOLD = 0.15; 
const SLIDE_DISTANCE = 80;

// CREAMOS UN NUEVO OBSERVADOR
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const targetElement = entry.target;

        // IGNORAR SECCIONES EXCLUIDAS (Detalles del Evento)
        if (targetElement.classList.contains('details')) {
            return; 
        }

        // 🎯 LÓGICA DE APARICIÓN Y DESAPARICIÓN

        if (entry.isIntersecting) {
            // ➡️ ENTRADA A LA VISTA (Scroll Down)
            // Aplicamos la clase 'show' para FADE-IN (Opacidad 1) y BLUR-OUT (Blur 0)
            targetElement.classList.add('show');
            
        } else {
            // ⬅️ SALIDA DE LA VISTA (Scroll Up/Down)
            // Removemos la clase 'show' para FADE-OUT (Opacidad 0) y BLUR-IN (Blur 5px)
            targetElement.classList.remove('show');
        }


        // 🎯 Ocultar/Mostrar decoración superior
        // Solo verificamos la intersección en la primera caja para controlar la decoración
        if (targetElement === allContentBoxes[0] && decorationWrapper) {
            if (entry.isIntersecting) {
                // Si la primera caja es visible, ocultar decoración
                decorationWrapper.classList.add('hide-decoration');
                decorationWrapper.classList.remove('show-decoration');
            } else {
                // Si la primera caja NO es visible, mostrar decoración
                decorationWrapper.classList.remove('hide-decoration');
                decorationWrapper.classList.add('show-decoration');
            }
        }
    });
}, {
    // CRÍTICO: Observar el elemento cuando entra (0.15) y cuando sale completamente (0)
    // El 'rootMargin' permite un margen de error al disparar la salida
    threshold: [0, OPTIMIZED_THRESHOLD], 
    rootMargin: "0px 0px -150px 0px" 
});

// Inicializamos y asignamos estilos para la animación
document.addEventListener('DOMContentLoaded', () => {
    allContentBoxes.forEach((el) => {
        
        // **LÓGICA DE EXCLUSIÓN:** Detalles del Evento
        if (el.classList.contains('details')) {
            // Mostrar inmediatamente la excepción (FADE-IN rápido de CSS)
            el.classList.add('show');
            return; 
        }

        // Aplicar estilos iniciales de FADE-OUT/BLUR-IN (para todas las demás secciones)
        el.style.opacity = 0;
        el.style.transform = `translateY(${SLIDE_DISTANCE}px)`;
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, filter 0.6s ease-out';
        el.style.willChange = 'opacity, transform, filter';
        
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
