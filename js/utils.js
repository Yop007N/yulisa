// Funciones modificadas para lanzar menos confeti

function lanzarConfeti() {
    const duration = 4 * 1000; // Aumentado de 3s a 4s
    const animationEnd = Date.now() + duration;
    const defaults = { 
        startVelocity: 25, // Aumentado de 20 a 25
        spread: 240, // Aumentado de 180 a 240
        ticks: 50, // Aumentado de 40 a 50
        zIndex: 0 
    };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 70 * (timeLeft / duration); // Aumentado de 30 a 70
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.2, 0.3), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.0)
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.8), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.0)
        }));
    }, 400); // Reducido de 500ms a 400ms (más frecuente)
}

function countdown(targetDate, elementId) {
    const updateCountdown = () => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerText = `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function removeDuplicateFrases(frases) {
    return frases.filter((frase, index) => frases.indexOf(frase) === index);
}