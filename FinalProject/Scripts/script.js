const animals = ['dog', 'cat', 'mouse', 'hamster', 'rabbit', 'bear', 'panda', 'fox'];
let cards = [];
let flippedCards = [];
let matches = 0;

// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to initialize the game board
function initializeGame() {
    const doubledAnimals = animals.concat(animals);
    cards = shuffle(doubledAnimals);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    cards.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.dataset.index = index;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.style.backgroundImage = `url(IMAGES/${animal}.jpg)`; // Assumes images are stored in 'IMAGES/' directory

        card.appendChild(frontFace);
        card.appendChild(backFace);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Function to handle card flip
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Function to check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.animal === card2.dataset.animal) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matches++;

        if (matches === animals.length) {
            setTimeout(() => alert('Congratulations! You matched all the animals!'), 500);
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }

    flippedCards = [];
}

// Function to start the game
function startGame() {
    initializeGame();
    matches = 0;
}

// Add event listener to start button
document.getElementById('start-button').addEventListener('click', startGame);

// Start the game initially
startGame();
