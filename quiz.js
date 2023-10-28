
const data = [
    {
        id: 1,
        question: "Which of these fish is actually a fish",
        answers: [
            { answer: "swordfish", isCorrect: true },
            { answer: "jellyfish", isCorrect: false },
            { answer: "starfish", isCorrect: false },
            { answer: "crayfish", isCorrect: false },
        ]
    },
    {
        id: 2,
        question: "A flutter is a group of:",
        answers: [
            { answer: "bees", isCorrect: false },
            { answer: "penguins", isCorrect: false },
            { answer: "butterflies", isCorrect: true },
            { answer: "camels", isCorrect: false },
        ]
    },
    {
        id: 3,
        question: "A group of which animals is referred to as a wake?",
        answers: [
            { answer: "bats", isCorrect: false },
            { answer: "vultures", isCorrect: true },
            { answer: "ants", isCorrect: false },
            { answer: "wasps", isCorrect: false },
        ]
    },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let questionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
    questionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    total = 0;
    showQuestion(questionIndex)
}
play.addEventListener("click", () => {
    resultScreen.style.display = "none"
    gameScreen.style.display = "block"
    playAgain()
})

const showResult = () => {
    resultScreen.style.display = "block";
    gameScreen.style.display = "none";

    resultScreen.querySelector(".correct").textContent = `Correct answers = ${correctAnswers}`;
    resultScreen.querySelector(".wrong").textContent = `Wrong answers = ${wrongAnswers}`;
    resultScreen.querySelector(".score").textContent = `Total Score = ${(correctAnswers - wrongAnswers) * 10}`;
}

const showQuestion = (qNumber) => {
    if (questionIndex === data.length) return showResult()
    selectedAnswer = null;
    question.textContent = data[qNumber].question

    answersContainer.innerHTML = data[qNumber].answers.map((item, index) =>
        `
    <div class="answer">
        <input name="answer" type="radio" id="${index}" value="${item.isCorrect}" />
        <label for="${index}">${item.answer}</label>
    </div>
    `
    ).join("");
    selectAnswer();
}

const selectAnswer = () => {
    answersContainer.querySelectorAll("input").forEach(
        el => {
            el.addEventListener("click", (e) => {
                selectedAnswer = e.target.value;
                // console.log(e.target.value)
            });
        }
    );
};

const submitAnswer = () => {
    submit.addEventListener("click", () => {
        if (selectedAnswer !== null) {
            selectedAnswer === "true" ? correctAnswers++ : wrongAnswers++;
            questionIndex++;
            showQuestion(questionIndex);
        }
        else alert("Select an answer before submitting!")
    });
};

showQuestion(questionIndex);
submitAnswer();
