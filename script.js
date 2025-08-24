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

function displayCard(index) {
    if (arrWords[index]) {
        titleCard.textContent = arrWords[index].english;
        cardBackTitle.textContent = arrWords[index].translation;
        spanCardBack.textContent = arrWords[index].example;
        currentWord.textContent = currentCardIndex + 1;
    }
}

function changeButton() {
    backButton.disabled = currentCardIndex === 0;
    nextButton.disabled = currentCardIndex === arrWords.length - 1;
}

nextButton.addEventListener("click", () => {
    if (currentCardIndex < arrWords.length - 1) {
        currentCardIndex++;
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

const words = arrWords.map(item => item.english);
const translations = arrWords.map(item => item.translation);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
    return array;
}

const shuffleWords = shuffleArray(words);
const shuffleTranslate = shuffleArray(translations);


examination.addEventListener("click", () => {
    studyCards.innerHTML = '';
    shuffleWords.forEach(item => {
        const wordCard = document.createElement('div');
        wordCard.classList.add('card');
        wordCard.textContent = item;
        examCards.appendChild(wordCard);
    })

    shuffleTranslate.forEach(item => {
        const translationCard = document.createElement('div');
        translationCard.classList.add('card');
        translationCard.textContent = item;
        examCards.appendChild(translationCard);
    })
})