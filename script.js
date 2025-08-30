const arrWords = [
    { english: "hello", translation: "привет", example: "Hello, my name is Dasha!" },
    { english: "dog", translation: "собака", example: "dog is man's best friend." },
    { english: "hand", translation: "рука", example: "Give me your hand." },
    { english: "night", translation: "ночь", example: "Good night, my friend." },
    { english: "watermelon", translation: "арбуз", example: "This watermelon is very tasty." }
]

let currentCardIndex = 0;

const flipCard = document.querySelector(".flip-card");
const titleCard = document.querySelector("#card-front h1");
const cardBackTitle = document.querySelector("#card-back h1");
const spanCardBack = document.querySelector("#card-back span");
const nextButton = document.querySelector("#next");
const backButton = document.querySelector("#back");
const currentWord = document.querySelector("#current-word");
const examination = document.querySelector("#exam");
const examCards = document.querySelector("#exam-cards");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const studyCards = document.querySelector(".study-cards");
const wordsProgress = document.querySelector("#words-progress");
const examMode = document.querySelector("#exam-mode");
const correctPercent = document.querySelector("#correct-percent");
const examProgress = document.querySelector("#exam-progress");
const studyMode = document.querySelector("#study-mode");
const resultsModal = document.querySelector(".results-modal");

let viewedWords = 1;
const totalWords = arrWords.length;

function updateWordsProgress() {
    const percentWords = (viewedWords / totalWords) * 100;
    wordsProgress.textContent = `${Math.round(percentWords)}%`;

}

function updateCurrentWord() {
    const percentViewedWords = (viewedWords / arrWords.length) * 100;
    wordsProgress.value = percentViewedWords;
    wordsProgress.textContent = percentViewedWords + "%";
}

function displayCard(index) {
    if (arrWords[index]) {
        titleCard.textContent = arrWords[index].english;
        cardBackTitle.textContent = arrWords[index].translation;
        spanCardBack.textContent = arrWords[index].example;
        currentWord.textContent = currentCardIndex + 1;
        const currentWordData = JSON.stringify(arrWords[index]);
        localStorage.setItem('currentViewedWord', currentWordData);
        updateWordsProgress()
        updateCurrentWord();
    }
}

function changeButton() {
    backButton.disabled = currentCardIndex === 0;
    nextButton.disabled = currentCardIndex === arrWords.length - 1;
}

nextButton.addEventListener("click", () => {
    if (currentCardIndex < arrWords.length - 1) {
        currentCardIndex++;
        viewedWords++;
        displayCard(currentCardIndex);
        changeButton();
    }
})

backButton.addEventListener("click", () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard(currentCardIndex);
        changeButton();
    }
})

displayCard(currentCardIndex);

flipCard.addEventListener("click", function() {
    flipCard.classList.toggle("active");

})

function saveShuffleArray(arr) {
    localStorage.setItem('shuffledCards', JSON.stringify(arr));

}


function shuffleCards() {
    arrWords.sort(() => Math.random() - 0.5);
    displayCard(currentCardIndex);
    saveShuffleArray(arrWords);
}


const newWords = [];
const arrTranslation = [];
let selectedCards = [];
let matchPairs = 0;
let correctAnswer = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
    return array;
}

function updateProgress() {
    const percentAnswer = (matchPairs / totalWords) * 100;
    correctPercent.textContent = `${percentAnswer.toFixed(0)}%`;
    examProgress.value = percentAnswer;
    examProgress.textContent = percentAnswer + "%";
}

function testingCard() {
    studyCards.innerHTML = '';
    examMode.classList.remove('hidden');
    studyMode.classList.add('hidden');
    shuffleWords.forEach(card => {
        const wordCard = document.createElement('div');
        wordCard.classList.add('card');
        wordCard.textContent = card.value;
        wordCard.dataset.type = card.type;
        wordCard.dataset.id = card.id;
        examCards.appendChild(wordCard);
    })

    shuffleTranslation.forEach(card => {
        const translationCard = document.createElement('div');
        translationCard.classList.add('card');
        translationCard.textContent = card.value;
        translationCard.dataset.type = card.type;
        translationCard.dataset.id = card.id;
        examCards.appendChild(translationCard);
    })

}

arrWords.forEach(item => {
    newWords.push({ value: item.english, type: 'word', id: item.english + item.translation });
    arrTranslation.push({ value: item.translation, type: 'translation', id: item.english + item.translation });
});

const shuffleWords = shuffleArray(newWords);
const shuffleTranslation = shuffleArray(arrTranslation);

examination.addEventListener("click", testingCard);

const buttonShuffle = document.querySelector("#shuffle-words");


buttonShuffle.addEventListener("click", shuffleCards);

const timer = document.querySelector("#time");
let seconds = 0;
let minutes = 0;
let timerInterval;

function startTimer() {
    timerInterval = setTimeout(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    const formateSeconds = String(seconds).padStart(2, '0');
    const formatMinutes = String(minutes).padStart(2, '0');
    timer.textContent = `${formatMinutes} : ${formateSeconds}`;
}

function stopTimer() {
    clearTimeout(timerInterval);
}


examCards.addEventListener("click", (event) => {
    let correctCount = JSON.parse(localStorage.getItem('correctCardChoose')) || 0;
    let wrongCount = JSON.parse(localStorage.getItem('wrongCardChoose')) || 0;
    startTimer();
    let firstCard = false;
    const clickedCard = event.target;
    if (firstCard || clickedCard.classList.contains('correct')) {
        return
    }
    clickedCard.classList.add('correct');
    firstCard = true;
    clickedCard.classList.add('active');
    selectedCards.push(clickedCard);

    if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;
        if (card1.dataset.id === card2.dataset.id && card1.dataset.type !== card2.dataset.type) {
            card1.classList.add('fade-out');
            card2.classList.add('fade-out');
            matchPairs++;
            correctCount++;
            localStorage.setItem('correctCardChoose', JSON.stringify(correctCount));
            correctPercent.textContent = `${matchPairs}`;
            updateProgress();
            selectedCards = [];

            if (matchPairs === arrWords.length) {
                stopTimer();
                setTimeout(() => {
                    alert('Вы выйграли!');
                }, 1000);
            }

        } else {
            card2.classList.add('wrong');
            wrongCount++;
            localStorage.setItem('wrongCardChoose', JSON.stringify(wrongCount));
            setTimeout(() => {
                card2.classList.remove('wrong');
            }, 1000);
            setTimeout(() => {
                card1.classList.remove('active');
                card2.classList.remove('active');
                card1.classList.remove('correct');
                card2.classList.remove('correct');
            }, 500);
            selectedCards = [];
        }
    }
})