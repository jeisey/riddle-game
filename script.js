const grid = document.querySelector('.hint-grid');
const riddleText = document.querySelector('#riddle-text');
const hintsUsed = document.querySelector('#hints-used');
const guessesMade = document.querySelector('#guesses-made');
const answer = "echo";

riddleText.innerText = "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?";

let hints = [
    "Not alive, yet I speak.",
    "Nature's rebound.",
    "Found in canyons.",
    "The mountains repeat after you.",
    "Not a creature, yet I can \"listen\".",
    "Not a radio, but I can broadcast.",
    "Sounds familiar?",
    "A reflection, not of light, but of sound.",
    "Yell in a vast open space, and you might hear me."
];

// Shuffle hints for randomness
hints.sort(() => Math.random() - 0.5);

for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    let hint = document.createElement('span');
    hint.innerText = hints[i];
    cell.appendChild(hint);
    cell.addEventListener('click', function() {
        if (!cell.classList.contains('revealed')) {
            hint.style.display = 'block';
            cell.classList.add('revealed');
            hintsUsed.innerText = Number(hintsUsed.innerText) + 1;
        }
    });
    grid.appendChild(cell);
}

function checkAnswer() {
    let userAnswer = document.querySelector('#user-answer').value.toLowerCase();
    if (userAnswer.includes("echo")) {
        showModal('Congratulations! You solved the riddle.');
    } else {
        showModal('Try again.');
        guessesMade.innerText = Number(guessesMade.innerText) + 1;
    }
}

function showModal(message) {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10';
    modal.innerHTML = `<div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">${message}</div>`;
    document.body.appendChild(modal);
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 2000);
}

function resetGame() {
    location.reload();
}

let timeLeft = 5 * 60; // 5 minutes in seconds
const timerDisplay = document.querySelector('#timer');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize timer display
updateTimerDisplay();

let timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        showModal("Time's up! Try again.");
    }
}, 1000);

// ... (rest of the code remains unchanged)
