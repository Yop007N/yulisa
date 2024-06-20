function removeDuplicateFrases(frases) {
    return frases.filter((frase, index) => frases.indexOf(frase) === index);
}

function lanzarConfeti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 200 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.2)
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            shapes: ['circle', 'square'],
            scalar: randomInRange(0.4, 1.2)
        }));
    }, 250);
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
