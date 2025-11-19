
const selectionScreen = document.querySelector('.selection-screen');
const resultScreen = document.querySelector('.result-screen');
const options = document.querySelectorAll('.option-btn');
const playerHandImage = document.getElementById('player-hand');
const computerHandImage = document.getElementById('computer-hand');
const resultText = document.getElementById('result-text');
const playAgainBtn = document.getElementById('play-again-btn');
const winsCount = document.getElementById('wins-count');
const lossesCount = document.getElementById('losses-count');
const drawsCount = document.getElementById('draws-count');

const choices = ['rock', 'paper', 'scissors'];
const imagePaths = { rock: 'Rock.png', paper: 'Paper.png', scissors: 'Scissors.png' };
let scores = { wins: 0, losses: 0, draws: 0 };

function handleChoice(playerChoice) {
    selectionScreen.classList.remove('active');
    resultScreen.classList.add('active');
    resultText.textContent = '';
    playAgainBtn.style.display = 'none';
    playerHandImage.src = imagePaths.rock;
    computerHandImage.src = imagePaths.rock;

    playerHandImage.classList.add('loading-effect');
    computerHandImage.classList.add('loading-effect');

    setTimeout(() => {
        playerHandImage.classList.remove('loading-effect');
        computerHandImage.classList.remove('loading-effect');

        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        playerHandImage.src = imagePaths[playerChoice];
        computerHandImage.src = imagePaths[computerChoice];

        computerHandImage.style.transform = "scaleX(-1)";

        const winner = determineWinner(playerChoice, computerChoice);
        updateScoreboard(winner);

        resultText.textContent = winner;
        playAgainBtn.style.display = 'block';
    }, 1500);
}

function determineWinner(player, computer) {
    if (player === computer) return "It's a Tie!";
    else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return "Congrats, You Won!";
    else return "You Lost, Try Again.";
}

function updateScoreboard(winner) {
    if (winner.includes('Won')) scores.wins++;
    else if (winner.includes('Lost')) scores.losses++;
    else scores.draws++;

    winsCount.textContent = scores.wins;
    lossesCount.textContent = scores.losses;
    drawsCount.textContent = scores.draws;
}

options.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        handleChoice(playerChoice);
    });
});

playAgainBtn.addEventListener('click', () => {
    selectionScreen.classList.add('active');
    resultScreen.classList.remove('active');
});