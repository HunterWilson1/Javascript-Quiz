const questions = [
    {
        question: 'What do you enclose a string variable in? ',
        choices: ["1. quotes", "2. brackets", "3. dashes", "4. asterisks"],
        answer: "1. quotes"
    },

    {
        question: "At what number does an array start at?",
        choices: ["1. 9", "2. 7", "3. 1", "4. 0"],
        answer: "4. 0"
    },

    {
        question: "What does DOM mean?",
        choices: ["1. Dominos", "2. Document Object Model", "3. It's just a name", "4. none of the above"],
        answer: "2. Document Object Model"
    }
];

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen")

document.getElementById('start-button').addEventListener('click', startQuiz)

function startQuiz() {
    questionScreen.removeAttribute("hidden");
    currentQ = 0;
    showQuestion();
}

function showQuestion () {
    let question = questions[currentQ];
    let choices = question.choices;

    let h2QuestionElement = document.querySelector("#q-text");
    h2QuestionElement.textContent = question.question;

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let choiceButton = document.querySelector("#choice" + i);
        choiceButton.textContent = choice;

    }
}

document.querySelector("#q-choices").addEventListener("click", checkAnswer);

function countdownTimer() {
    time --;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

