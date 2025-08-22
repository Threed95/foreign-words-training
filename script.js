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

function displayCard(index) {
    if (arrWords[index]) {
        titleCard.textContent = arrWords[index].english;
        cardBackTitle.textContent = arrWords[index].translation;
        spanCardBack.textContent = arrWords[index].example;
    }
}

nextButton.addEventListener("click", () => {
    if (currentCardIndex < arrWords.length - 1) {
        currentCardIndex++;
        displayCard(currentCardIndex);
    }
})

backButton.addEventListener("click", () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard(currentCardIndex);
    }
})

displayCard(currentCardIndex);

flipCard.addEventListener("click", function() {
    flipCard.classList.add("active");

})