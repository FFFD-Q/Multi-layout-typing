// Japanese word list with kanji, furigana, and romaji
const japaneseWords = [
    { kanji: '林檎', furigana: 'りんご', romaji: 'ringo' },
    { kanji: '蜜柑', furigana: 'みかん', romaji: 'mikan' },
    { kanji: '葡萄', furigana: 'ぶどう', romaji: 'budou' },
    { kanji: '桜', furigana: 'さくら', romaji: 'sakura' },
    { kanji: '月', furigana: 'つき', romaji: 'tsuki' },
    { kanji: '太陽', furigana: 'たいよう', romaji: 'taiyou' },
    { kanji: '星', furigana: 'ほし', romaji: 'hoshi' },
    { kanji: '雲', furigana: 'くも', romaji: 'kumo' },
    { kanji: '雨', furigana: 'あめ', romaji: 'ame' },
    { kanji: '風', furigana: 'かぜ', romaji: 'kaze' },
    { kanji: '火', furigana: 'ひ', romaji: 'hi' },
    { kanji: '水', furigana: 'みず', romaji: 'mizu' },
    { kanji: '木', furigana: 'き', romaji: 'ki' },
    { kanji: '花', furigana: 'はな', romaji: 'hana' },
    { kanji: '鳥', furigana: 'とり', romaji: 'tori' },
    { kanji: '魚', furigana: 'さかな', romaji: 'sakana' },
    { kanji: '猫', furigana: 'ねこ', romaji: 'neko' },
    { kanji: '犬', furigana: 'いぬ', romaji: 'inu' },
    { kanji: '兎', furigana: 'うさぎ', romaji: 'usagi' },
    { kanji: '熊', furigana: 'くま', romaji: 'kuma' },
    { kanji: '山', furigana: 'やま', romaji: 'yama' },
    { kanji: '川', furigana: 'かわ', romaji: 'kawa' },
    { kanji: '海', furigana: 'うみ', romaji: 'umi' },
    { kanji: '島', furigana: 'しま', romaji: 'shima' },
    { kanji: '橋', furigana: 'はし', romaji: 'hashi' },
    { kanji: '道', furigana: 'みち', romaji: 'michi' },
    { kanji: '家', furigana: 'いえ', romaji: 'ie' },
    { kanji: '学校', furigana: 'がっこう', romaji: 'gakkou' },
    { kanji: '本', furigana: 'ほん', romaji: 'hon' },
    { kanji: '紙', furigana: 'かみ', romaji: 'kami' },
    { kanji: 'ペン', furigana: 'ぺん', romaji: 'pen' },
    { kanji: '机', furigana: 'つくえ', romaji: 'tsukue' },
    { kanji: '椅子', furigana: 'いす', romaji: 'isu' },
    { kanji: '友達', furigana: 'ともだち', romaji: 'tomodachi' },
    { kanji: '家族', furigana: 'かぞく', romaji: 'kazoku' },
    { kanji: '父', furigana: 'ちち', romaji: 'chichi' },
    { kanji: '母', furigana: 'はは', romaji: 'haha' },
    { kanji: '兄', furigana: 'あに', romaji: 'ani' },
    { kanji: '妹', furigana: 'いもうと', romaji: 'imouto' },
    { kanji: '先生', furigana: 'せんせい', romaji: 'sensei' },
    { kanji: '学生', furigana: 'がくせい', romaji: 'gakusei' },
    { kanji: '医者', furigana: 'いしゃ', romaji: 'isha' },
    { kanji: '看護師', furigana: 'かんごし', romaji: 'kangoshi' },
    { kanji: 'レストラン', furigana: 'れすとらん', romaji: 'resutoran' },
    { kanji: 'コンピュータ', furigana: 'こんぴゅーた', romaji: 'konpyuuta' },
    { kanji: 'インターネット', furigana: 'いんたーねっと', romaji: 'intaanetto' },
    { kanji: '電話', furigana: 'でんわ', romaji: 'denwa' },
    { kanji: 'テレビ', furigana: 'てれび', romaji: 'terebi' },
    { kanji: '写真', furigana: 'しゃしん', romaji: 'shashin' }
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
    timerId: null,
    currentInput: '',
    currentRomaji: ''
};

// DOM elements - will be initialized after DOM loads
let startBtn, resetBtn, wordKanji, wordFurigana, wordRomaji, inputDisplay;
let wpmDisplay, accuracyDisplay, timerDisplay, wordCountDisplay, totalWordsDisplay, resultsDiv;
let kanjiSizeInput, furiganaSizeInput, romajiSizeInput, kanjiSizeValue, furiganaSizeValue, romajiSizeValue;

// Initialize all DOM elements
function initializeDOMElements() {
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    wordKanji = document.getElementById('wordKanji');
    wordFurigana = document.getElementById('wordFurigana');
    wordRomaji = document.getElementById('wordRomaji');
    inputDisplay = document.getElementById('inputDisplay');
    wpmDisplay = document.getElementById('wpm');
    accuracyDisplay = document.getElementById('accuracy');
    timerDisplay = document.getElementById('timer');
    wordCountDisplay = document.getElementById('wordCount');
    totalWordsDisplay = document.getElementById('totalWords');
    resultsDiv = document.getElementById('results');
    
    kanjiSizeInput = document.getElementById('kanjiSize');
    furiganaSizeInput = document.getElementById('furiganaSize');
    romajiSizeInput = document.getElementById('romajiSize');
    kanjiSizeValue = document.getElementById('kanjiSizeValue');
    furiganaSizeValue = document.getElementById('furiganaSizeValue');
    romajiSizeValue = document.getElementById('romajiSizeValue');
    
    console.log('DOM elements initialized');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initializeDOMElements();
    generateWords();
    displayWord();
    setupSizeControls();
    setupEventListeners();
    console.log('Game initialized successfully');
});

function setupEventListeners() {
    startBtn.addEventListener('click', startGame);
    resetBtn.addEventListener('click', resetGame);
    document.addEventListener('keydown', handleKeyPress);
}

function setupSizeControls() {
    kanjiSizeInput.addEventListener('input', (e) => {
        const size = e.target.value;
        kanjiSizeValue.textContent = size + 'px';
        wordKanji.style.fontSize = size + 'px';
    });

    furiganaSizeInput.addEventListener('input', (e) => {
        const size = e.target.value;
        furiganaSizeValue.textContent = size + 'px';
        wordFurigana.style.fontSize = size + 'px';
    });

    romajiSizeInput.addEventListener('input', (e) => {
        const size = e.target.value;
        romajiSizeValue.textContent = size + 'px';
        wordRomaji.style.fontSize = size + 'px';
    });
}

function generateWords() {
    gameState.words = [];
    for (let i = 0; i < 50; i++) {
        const randomWord = japaneseWords[Math.floor(Math.random() * japaneseWords.length)];
        gameState.words.push(randomWord);
    }
    totalWordsDisplay.textContent = gameState.words.length;
}

function displayWord() {
    if (gameState.currentWordIndex < gameState.words.length) {
        const word = gameState.words[gameState.currentWordIndex];
        wordKanji.textContent = word.kanji;
        wordFurigana.textContent = word.furigana;
        wordRomaji.textContent = word.romaji;
        gameState.currentRomaji = word.romaji;
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
    gameState.currentInput = '';
    resultsDiv.style.display = 'none';
    inputDisplay.textContent = '';

    startBtn.disabled = true;
    displayWord();

    gameState.timerId = setInterval(() => {
        gameState.timeLeft--;
        timerDisplay.textContent = gameState.timeLeft;

        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleKeyPress(e) {
    if (!gameState.isRunning) return;

    const key = e.key.toLowerCase();
    const currentRomaji = gameState.currentRomaji;

    // Handle space to move to next word
    if (key === ' ') {
        e.preventDefault();
        
        if (gameState.currentInput === currentRomaji) {
            gameState.correctWords++;
            gameState.correctChars += gameState.currentInput.length;
        }
        
        gameState.totalChars += gameState.currentInput.length;
        
        gameState.currentWordIndex++;
        gameState.currentInput = '';
        inputDisplay.textContent = '';
        displayWord();
        updateStats();
        return;
    }

    // Handle backspace
    if (key === 'backspace') {
        e.preventDefault();
        gameState.currentInput = gameState.currentInput.slice(0, -1);
    } else if (/^[a-z]$/.test(key)) {
        // Only allow a-z characters
        gameState.currentInput += key;
    } else {
        return;
    }

    // Update input display with color feedback
    updateInputDisplay();
    updateStats();
}

function updateInputDisplay() {
    const currentRomaji = gameState.currentRomaji;
    let html = '';

    for (let i = 0; i < gameState.currentInput.length; i++) {
        const inputChar = gameState.currentInput[i];
        const correctChar = currentRomaji[i];

        if (inputChar === correctChar) {
            // Correct character - light gray
            html += `<span class="char correct">${inputChar}</span>`;
        } else {
            // Incorrect character - red
            html += `<span class="char incorrect">${inputChar}</span>`;
        }
    }

    // Add remaining characters to show
    for (let i = gameState.currentInput.length; i < currentRomaji.length; i++) {
        html += `<span class="char waiting">${currentRomaji[i]}</span>`;
    }

    inputDisplay.innerHTML = html;
}

function updateStats() {
    // Calculate WPM (Words Per Minute)
    const elapsedSeconds = gameState.totalTime - gameState.timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const wpm = elapsedMinutes > 0 ? Math.round(gameState.correctWords / elapsedMinutes) : 0;
    wpmDisplay.textContent = wpm;

    // Calculate accuracy based on current input
    const currentRomaji = gameState.currentRomaji;
    let currentCorrect = 0;
    for (let i = 0; i < gameState.currentInput.length; i++) {
        if (gameState.currentInput[i] === currentRomaji[i]) {
            currentCorrect++;
        }
    }

    const totalChars = gameState.totalChars + gameState.currentInput.length;
    const correctChars = gameState.correctChars + currentCorrect;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    accuracyDisplay.textContent = accuracy + '%';

    // Update word count
    wordCountDisplay.textContent = gameState.currentWordIndex;
}

function endGame() {
    gameState.isRunning = false;
    clearInterval(gameState.timerId);

    startBtn.disabled = false;

    // Calculate final stats
    const elapsedSeconds = gameState.totalTime - gameState.timeLeft;
    const elapsedMinutes = elapsedSeconds / 60;
    const finalWpm = elapsedMinutes > 0 ? Math.round(gameState.correctWords / elapsedMinutes) : 0;
    
    const currentRomaji = gameState.currentRomaji;
    let currentCorrect = 0;
    for (let i = 0; i < gameState.currentInput.length; i++) {
        if (gameState.currentInput[i] === currentRomaji[i]) {
            currentCorrect++;
        }
    }
    
    const totalChars = gameState.totalChars + gameState.currentInput.length;
    const correctChars = gameState.correctChars + currentCorrect;
    const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

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
    gameState.currentInput = '';
    resultsDiv.style.display = 'none';
    inputDisplay.textContent = '';

    startBtn.disabled = false;

    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '0%';
    timerDisplay.textContent = '60';
    wordCountDisplay.textContent = '0';

    generateWords();
    displayWord();
}
