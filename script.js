const arrWords = [
    { english: "hello", translation: "привет", example: "Hello, my name is Dasha!" },
    { english: "dog", translation: "собака", example: "dog is man's best friend." },
    { english: "hand", translation: "рука", example: "Give me your hand." },
    { english: "night", translation: "ночь", example: "Good night, my friend." },
    { english: "watermelon", translation: "арбуз", example: "This watermelon is very tasty." }
]


const flipCard = document.querySelector(".flip-card");

const nextButton = document.querySelector("#next");
const backButton = document.querySelector("#back");

flipCard.addEventListener("click", function() {
    flipCard.classList.add("active");
})

let currentIndex = 0;