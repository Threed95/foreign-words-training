const flipCard = document.querySelector(".flip-card");

const nextButton = document.querySelector("#next");
const backButton = document.querySelector("#back");

flipCard.addEventListener("click", function() {
    flipCard.classList.add("active");
})

let currentIndex = 0;