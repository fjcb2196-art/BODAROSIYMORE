// =========================================================
// 📅 Configuración y Constantes
// =========================================================

// ⚠️ Cambia esta fecha por la real del evento (¡ACTUALIZAR!)
const EVENT_DATE = new Date("Feb 12, 2026 16:00:00").getTime(); 

// Parámetros para IntersectionObserver y Animación
const OPTIMIZED_THRESHOLD = 0.15; // Umbral de visibilidad para disparar animación
const SLIDE_DISTANCE = 80;        // Distancia en píxeles para el efecto de deslizamiento

// Elementos del DOM (cache para rendimiento)
const decorationWrapper = document.getElementById('decoration-wrapper');
const allContentBoxes = document.querySelectorAll('.content-box');
const toggleButton = document.getElementById('toggleButton'); // Botón de la primera versión
const leftDoor = document.querySelector('.left-door');
const rightDoor = document.querySelector('.right-door');
const bienvenidaScreen = document.getElementById('pantalla-bienvenida');
const mainWrapper = document.getElementById('main-wrapper');
const audio = document.getElementById('audio-boda');
const countdownEl = document.getElementById("countdown");
const rsvpForm = document.getElementById('rsvp-form');
const welcomeButton = document.getElementById('boton-bienvenido'); // Botón de la segunda versión
const mainInvitation = document.querySelector('.invitacion-principal');


// =========================================================
// 🚪 Función 1: Transición de Bienvenida (Apertura de Puertas y Audio)
// =========================================================

/**
 * Maneja la transición inicial de la pantalla de bienvenida
 * al contenido principal, incluyendo la animación de las 'puertas'
 * y la reproducción del audio de fondo.
 */
function handleWelcomeTransition() {
    // Verificar si el elemento de puertas/audio existe (usando el modelo de puertas)
    if (leftDoor && rightDoor && bienvenidaScreen && mainWrapper && audio) {
        // 1. Iniciar animación de puertas
        leftDoor.classList.add('open');
        rightDoor.classList.add('open');
        
        // 2. Ocultar el botón (si existe) para el efecto fade-out
        if (toggleButton) {
            toggleButton.classList.add('fade-out');
        } else if (welcomeButton) {
            welcomeButton.style.opacity = '0'; // Si es el otro botón, usar opacidad
        }

        // 3. Reproducir audio e iniciar fade-in del contenido principal después de 1 segundo
        setTimeout(() => {
            // Ocultar la pantalla de bienvenida
            bienvenidaScreen.style.display = 'none';

            // Mostrar el contenido principal con fade-in suave
            mainWrapper.classList.add('visible'); 
            if (mainInvitation) {
                 // Si se usa el otro modelo de transición, asegurar visibilidad
                mainInvitation.style.display = 'block'; 
            }

            // Iniciar la reproducción de audio
            audio.volume = 0.25;
            audio.play().catch(error => {
                console.warn("Error de Autoplay (Común si no hay interacción previa):", error);
            });
        }, 1000);
    } 
    // Manejo de la segunda versión del botón que solo hacía fade-out
    else if (bienvenidaScreen && welcomeButton) {
        // 1. Iniciar la transición visual (opacidad a 0)
        bienvenidaScreen.style.opacity = '0';
        
        // 2. Intentar la reproducción
        if (audio) {
            audio.volume = 0.25; 
            audio.play().catch(error => {
                console.warn("Error de Autoplay:", error);
            });
        }

        // 3. Ocultar el div completamente después de la transición de 1.5s
        setTimeout(() => {
            bienvenidaScreen.style.display = 'none';
            if (mainInvitation) {
                mainInvitation.style.display = 'block'; 
            }
        }, 1500); 
    }
}

// =========================================================
// ⏳ Función 2: Contador Regresivo
// =========================================================

/**
 * Actualiza el elemento del contador regresivo cada segundo.
 */
function startCountdown() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = EVENT_DATE - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownEl) {
            countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // 🎉 Mensaje final cuando llega el día
        if (distance < 0) {
            clearInterval(timer);
            if (countdownEl) {
                countdownEl.innerHTML = "¡EL GRAN DÍA ES HOY! 🥳";
                countdownEl.classList.add('finished');
            }
        }
    }, 1000);
}


// =========================================================
// 📝 Función 3: Lógica del Formulario RSVP
// =========================================================

/**
 * Maneja el envío del formulario de confirmación (RSVP).
 */
function handleRsvpSubmit(event) {
    event.preventDefault();
    alert('¡Gracias por confirmar! (Este es un mensaje de prueba de la funcionalidad).');
    // NOTA: Aquí iría la lógica real de envío a un servicio (e.g., Fetch API)
}


// =========================================================
// 🌟 Función 4: Intersection Observer para Animación en Scroll
// =========================================================

// CREAMOS EL OBSERVADOR
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const targetElement = entry.target;

        // IGNORAR SECCIONES EXCLUIDAS (Detalles del Evento)
        if (targetElement.classList.contains('details')) {
            return; 
        }

        // 🎯 LÓGICA DE APARICIÓN Y DESAPARICIÓN
        if (entry.isIntersecting) {
            // ➡️ ENTRADA A LA VISTA: Aplicar 'show' (Fade-in / Blur-out)
            targetElement.classList.add('show');
        } else {
            // ⬅️ SALIDA DE LA VISTA: Remover 'show' (Fade-out / Blur-in)
            targetElement.classList.remove('show');
        }


        // 🎯 Ocultar/Mostrar decoración superior
        // Solo verificamos la intersección en la PRIMERA caja para controlar la decoración
        if (targetElement === allContentBoxes[0] && decorationWrapper) {
            if (entry.isIntersecting) {
                // Si la primera caja es visible, OCULTAR decoración
                decorationWrapper.classList.add('hide-decoration');
                decorationWrapper.classList.remove('show-decoration');
            } else {
                // Si la primera caja NO es visible, MOSTRAR decoración
                decorationWrapper.classList.remove('hide-decoration');
                decorationWrapper.classList.add('show-decoration');
            }
        }
    });
}, {
    // CRÍTICO: Observar el elemento cuando entra (0.15) y cuando sale completamente (0)
    threshold: [0, OPTIMIZED_THRESHOLD], 
    rootMargin: "0px 0px -150px 0px" // Margen inferior para disparar la aparición antes
});


// =========================================================
// 🚀 Inicialización al Cargar el DOM
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Asignar Eventos de Bienvenida (Usando el botón de la primera versión o el segundo)
    if (toggleButton) {
        toggleButton.addEventListener('click', handleWelcomeTransition);
    } else if (welcomeButton) {
        welcomeButton.addEventListener('click', handleWelcomeTransition);
    }
    
    // 2. Asignar Evento del Formulario
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRsvpSubmit);
    }

    // 3. Iniciar el Contador Regresivo
    startCountdown();

    // 4. Configurar y Observar Elementos en Scroll
    allContentBoxes.forEach((el) => {
        
        // **LÓGICA DE EXCLUSIÓN:** Detalles del Evento
        if (el.classList.contains('details')) {
            // Mostrar inmediatamente la excepción (FADE-IN rápido desde CSS)
            el.classList.add('show');
            return; 
        }

        // Aplicar estilos iniciales de FADE-OUT/BLUR-IN y desplazamiento
        el.style.opacity = 0;
        el.style.filter = 'blur(5px)'; 
        el.style.transform = `translateY(${SLIDE_DISTANCE}px)`;
        el.style.willChange = 'opacity, transform, filter';
        
        // Iniciar la observación
        observer.observe(el);
    });

    // 5. Activamos la decoración floral inmediatamente al cargar
    if (decorationWrapper) {
        decorationWrapper.classList.add('show-decoration');
    }
});
