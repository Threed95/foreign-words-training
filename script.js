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


let newWords = [];
let arrTranslation = [];
let selectedCards = [];
let matchPairs = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
    return array;
}

arrWords.forEach(item => {
    newWords.push({ value: item.english, type: 'word', id: item.english + item.translation });
    arrTranslation.push({ value: item.translation, type: 'translation', id: item.english + item.translation });
});
const shuffleWords = shuffleArray(newWords);
const shuffleTranslation = shuffleArray(arrTranslation);


examination.addEventListener("click", () => {
    studyCards.innerHTML = '';
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


});

examCards.addEventListener("click", (event) => {
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
            selectedCards = [];

            if (matchPairs === arrWords.length) {
                alert('Вы выйграли!')
            }
        } else {
            card2.classList.add('wrong');
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

function shuffleCards() {
    arrWords.sort(() => Math.random() - 0.5);
    displayCard(currentCardIndex);
}

const buttonShuffle = document.querySelector("#shuffle-words");

buttonShuffle.addEventListener("click", shuffleCards);