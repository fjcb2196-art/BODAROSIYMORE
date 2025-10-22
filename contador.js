document.addEventListener('DOMContentLoaded', function() {
    const eventDate = new Date("Dec 20, 2025 19:30:00").getTime(); 
    const countdownElement = document.getElementById("countdown");

    if (!countdownElement) {
        console.error("Elemento 'countdown' no encontrado. Asegúrate de que existe en el HTML.");
        return;
    }

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-unit"><span>${days}</span> Días</div>
            <div class="countdown-unit"><span>${hours}</span> Horas</div>
            <div class="countdown-unit"><span>${minutes}</span> Mins</div>
            <div class="countdown-unit"><span>${seconds}</span> Segs</div>
        `;

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "¡EL GRAN DÍA ES HOY!";
            countdownElement.classList.add('finished');
        }
    }, 1000);
});
