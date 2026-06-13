// Word list for typing practice
const wordList = [
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
    'programming', 'javascript', 'typing', 'practice', 'speed', 'accuracy',
    'keyboard', 'computer', 'developer', 'code', 'function', 'variable',
    'array', 'object', 'string', 'number', 'boolean', 'promise',
    'async', 'await', 'class', 'method', 'property', 'algorithm',
    'database', 'network', 'server', 'client', 'request', 'response',
    'document', 'window', 'element', 'attribute', 'style', 'color',
    'background', 'margin', 'padding', 'border', 'shadow', 'transform',
    'animation', 'transition', 'display', 'position', 'absolute', 'relative'
];

// Game state
let gameState = {
    isRunning: false,
    timeLeft: 60,
    totalTime: 60,
    currentWordIndex: 0,
    correctWords: 0,
    totalChars: 0,
    correctChars: 0,
    words: [],
    timerId: null
};

// DOM elements
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const userInput = document.getElementById('userInput');
const targetWord = document.getElementById('targetWord');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const wordCountDisplay = document.getElementById('wordCount');
const totalWordsDisplay = document.getElementById('totalWords');
const resultsDiv = document.getElementById('results');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateWords();
    displayWord();
});

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
userInput.addEventListener('input', handleInput);

function generateWords() {
    gameState.words = [];
    for (let i = 0; i < 100; i++) {
        gameState.words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    totalWordsDisplay.textContent = gameState.words.length;
}

function displayWord() {
    if (gameState.currentWordIndex < gameState.words.length) {
        targetWord.textContent = gameState.words[gameState.currentWordIndex];
    } else {
        endGame();
    }
}

function startGame() {
    if (gameState.isRunning) return;

    gameState.isRunning = true;
    gameState.timeLeft = gameState.totalTime;
    gameState.currentWordIndex = 0;
    gameState.correctWords = 0;
    gameState.totalChars = 0;
    gameState.correctChars = 0;
    resultsDiv.style.display = 'none';

    startBtn.disabled = true;
    userInput.disabled = false;
    userInput.focus();
    userInput.value = '';

    displayWord();

    gameState.timerId = setInterval(() => {
        gameState.timeLeft--;
        timerDisplay.textContent = gameState.timeLeft;

        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleInput(e) {
    if (!gameState.isRunning) return;

    const input = e.target.value;
    const currentWord = gameState.words[gameState.currentWordIndex];

    // Update total characters
    gameState.totalChars = input.length;

    // Count correct characters
    gameState.correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentWord[i]) {
            gameState.correctChars++;
        }
    }

    // Check if word is completed
    if (input.endsWith(' ')) {
        const typedWord = input.trim();
        if (typedWord === currentWord) {
            gameState.correctWords++;
        }

        gameState.currentWordIndex++;
        userInput.value = '';
        displayWord();
    }

    // Update statistics
    updateStats();
}

function updateStats() {
    // Calculate WPM (Words Per Minute)
    const elapsedSeconds = gameState.totalTime - gameState.timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const wpm = elapsedMinutes > 0 ? Math.round(gameState.correctWords / elapsedMinutes) : 0;
    wpmDisplay.textContent = wpm;

    // Calculate accuracy
    const accuracy = gameState.totalChars > 0 
        ? Math.round((gameState.correctChars / gameState.totalChars) * 100) 
        : 0;
    accuracyDisplay.textContent = accuracy + '%';

    // Update word count
    wordCountDisplay.textContent = gameState.currentWordIndex;
}

function endGame() {
    gameState.isRunning = false;
    clearInterval(gameState.timerId);

    startBtn.disabled = false;
    userInput.disabled = true;

    // Calculate final stats
    const elapsedSeconds = gameState.totalTime - gameState.timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const finalWpm = elapsedMinutes > 0 ? Math.round(gameState.correctWords / elapsedMinutes) : 0;
    const finalAccuracy = gameState.totalChars > 0 
        ? Math.round((gameState.correctChars / gameState.totalChars) * 100) 
        : 0;

    // Display results
    document.getElementById('finalWpm').textContent = finalWpm;
    document.getElementById('finalAccuracy').textContent = finalAccuracy + '%';
    document.getElementById('finalWords').textContent = gameState.currentWordIndex;
    resultsDiv.style.display = 'block';
}

function resetGame() {
    gameState.isRunning = false;
    clearInterval(gameState.timerId);

    gameState.timeLeft = gameState.totalTime;
    gameState.currentWordIndex = 0;
    gameState.correctWords = 0;
    gameState.totalChars = 0;
    gameState.correctChars = 0;

    startBtn.disabled = false;
    userInput.disabled = true;
    userInput.value = '';
    resultsDiv.style.display = 'none';

    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '0%';
    timerDisplay.textContent = '60';
    wordCountDisplay.textContent = '0';

    generateWords();
    displayWord();
}