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
    document.querySelector('.next-button').style.display = 'none';
    generateCards();
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
    const duration = 15 * 1000;
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
};

function countdown() {
    const countDownDate = new Date("Jun 16, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `Tiempo restante para tu cumpleaños: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡Feliz Cumpleaños, Aylén!";
    }
}

const x = setInterval(countdown, 1000);
