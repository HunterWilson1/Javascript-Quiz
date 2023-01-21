const questions = [
    {
        questionT: 'What do you enclose a string variable in? ',
        choices: ["1. quotes", "2. brackets", "3. dashes", "4. asterisks"],
        answer: "1. quotes"
    },

    {
        questionT: "At what number does an array start at?",
        choices: ["1. 9", "2. 7", "3. 1", "4. 0"],
        answer: "4. 0"
    },

    {
        questionT: "What does DOM mean?",
        choices: ["1. Dominos", "2. Document Object Model", "3. It's just a name", "4. none of the above"],
        answer: "2. Document Object Model"
    }
];

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen")

var intervalID;
var time;
var currentQ;

document.getElementById('start-button').addEventListener('click', startQuiz)

function startQuiz() {
    questionScreen.removeAttribute("hidden");
    currentQ = 0;
    showQuestion();
    time = 60;
    intervalID = setInterval(countdownTimer, 1000);
    displayTime
    
}

function countdownTimer() {
    time --;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

const showTime = document.querySelector("#time");
function displayTime() {
    showTime.textContent = time;
}

function showQuestion () {
    let question = questions[currentQ];
    let choices = question.choices;

    let h2QuestionElement = document.querySelector("#q-text");
    h2QuestionElement.textContent = question.questionT;

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let choiceButton = document.querySelector("#choice" + i);
        choiceButton.textContent = choice;
    }
}

document.querySelector("#q-choices").addEventListener("click", checkAnswer);

function checkAnswer(event){
    let selected = event.target.id;
    if (selected === questions[currentQ].answer) {
        alert("Correct!");
    } else {
        alert("Incorrect!");
        time -= 10;
        displayTime();
    }
    currentQ++;
    if (currentQ === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}



