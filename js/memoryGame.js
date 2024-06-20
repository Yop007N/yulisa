let firstCard, secondCard;
let lockBoard = false;

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
