AOS.init();

let currentPage = 1;
const totalPages = 5;
const pianoMusic = document.getElementById('pianoMusic');

function nextPage() {
    lanzarConfeti();
    const current = document.getElementById(`page${currentPage}`);
    const next = document.getElementById(`page${(currentPage % totalPages) + 1}`);
    if (next) {
        current.classList.remove('active');
        next.classList.add('active');
        currentPage = (currentPage % totalPages) + 1;
    }
}

function startGame() {
    document.getElementById('game').style.display = 'flex';
    document.querySelector('.start-game-button').style.display = 'none';
    generateCards();
}

function goToStart() {
    currentPage = 1;
    document.querySelectorAll('.page').forEach((page, index) => {
        page.classList.remove('active');
        if (index === 0) page.classList.add('active');
    });
}

function generateCards() {
    const gameContainer = document.getElementById('game');
    gameContainer.innerHTML = '';
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('game-card');
        cardElement.dataset.value = card;
        cardElement.onclick = () => flipCard(cardElement);
        gameContainer.appendChild(cardElement);
    });
}

let firstCard, secondCard;
let lockBoard = false;

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.onclick = null;
    secondCard.onclick = null;
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
    if (document.querySelectorAll('.game-card.flipped').length === 8) {
        Swal.fire({
            title: '¡Felicidades!',
            text: '¡Has encontrado todas las parejas!',
            icon: 'success',
            confirmButtonText: '¡Gracias!'
        });
    }
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

function togglePlay() {
    if (pianoMusic.paused) {
        pianoMusic.play();
    } else {
        pianoMusic.pause();
    }
}

window.onload = function() {
    lanzarConfeti();
    setTimeout(lanzarConfeti, 10000);
    pianoMusic.play();
    updateBirthdayMessage();
    countdown();
};

function countdown() {
    const now = new Date();
    const birthDate = new Date("Jun 16, 2004");
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());

    if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const distance = nextBirthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `El próximo cumpleaños será en: ${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡Feliz Cumpleaños, Aylén!";
    }
}

const x = setInterval(countdown, 1000);

function updateBirthdayMessage() {
    const now = new Date();
    const birthDate = new Date("Jun 16, 2004");
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());

    if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const age = currentYear - birthDate.getFullYear();
    document.getElementById('birthdayMessage').innerText = "Próximo cumpleaños de Aylén";
   // document.getElementById('birthdayInfo').innerText = `Tu próximo cumpleaños será el ${nextBirthday.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}. Aylén cumplirá ${age + 1} años.`;
}


document.addEventListener('DOMContentLoaded', function () {
    // Mostrar cuenta regresiva
    updateCountdown();

    // Mostrar frase del día
    showFraseDiaria();
});

function updateCountdown() {
    const targetDate = new Date('2025-06-16T00:00:00');
    setInterval(() => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('time').innerText = `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
    }, 1000);
}

function showFraseDiaria() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const fraseDiaria = frases[dayOfYear % frases.length];
    document.getElementById('fraseDiaria').innerText = fraseDiaria;
}

function showNextFrase() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const nextDay = (dayOfYear + 1) % frases.length;
    const nextFrase = frases[nextDay];
    document.getElementById('fraseDiaria').innerText = nextFrase;
}

function toggleMusic() {
    const audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}



document.addEventListener('DOMContentLoaded', function () {
    // Mostrar cuenta regresiva
    updateCountdown();

    // Mostrar frase del día
    showFraseDiaria();
});

function updateCountdown() {
    const targetDate = new Date('2025-06-16T00:00:00');
    setInterval(() => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('time').innerText = `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
    }, 1000);
}

function showFraseDiaria() {
    const uniqueFrases = removeDuplicateFrases(frases);

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const fraseDiaria = uniqueFrases[dayOfYear % uniqueFrases.length];
    document.getElementById('fraseDiaria').innerText = fraseDiaria;
}

function removeDuplicateFrases(frases) {
    return frases.filter((frase, index) => frases.indexOf(frase) === index);
}

function showNextFrase() {
    const uniqueFrases = removeDuplicateFrases(frases);

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const nextDay = (dayOfYear + 1) % uniqueFrases.length;
    const nextFrase = uniqueFrases[nextDay];
    document.getElementById('fraseDiaria').innerText = nextFrase;
}

function toggleMusic() {
    const audio = document.getElementById('audio');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
