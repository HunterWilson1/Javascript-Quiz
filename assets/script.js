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

//I gave each screen a variable via an id
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen")
const scoreScreen = document.querySelector("#score-screen")
const leaderboardScreen = document.querySelector("#leaderboard-screen")

//these variables are used a lot
var intervalID;
var time;
var currentQ;


function hideScreens() {
    startScreen.setAttribute("hidden", true);
    questionScreen.setAttribute("hidden", true);
    scoreScreen.setAttribute("hidden", true);
    leaderboardScreen.setAttribute("hidden", true);
}
document.getElementById('start-button').addEventListener('click', startQuiz)

function startQuiz() {
    
    hideScreens();
    //removes the hidden attribute on the questions
    questionScreen.removeAttribute("hidden");
    //sets the current question of the array to 0 and then displays the first question
    currentQ = 0;
    showQuestion();
    //set the time to 30 because I only have 3 questions
    time = 30;
    //starts the countdown and that the timer starts when the startQuiz button is clicked
    intervalID = setInterval(countdownTimer, 1000);
    displayTime();
    
}

//reduces the time by 1 and if the quiz equals less than 0 the quiz should end
function countdownTimer() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

//shows time on screen
const showTime = document.querySelector("#time");
function displayTime() {
    showTime.textContent = time;
}

//shows the qustions and the choices
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

//selcts the div with id of q-choices
document.querySelector("#q-choices").addEventListener("click", checkAnswer);

function correctChoice(choiceButton) {
return choiceButton.textContent === questions[currentQ].answer;
}

//checks answer and takes away time if wrong
function checkAnswer(event){
    let choiceButton = event.target;
    if (correctChoice(choiceButton) === questions[currentQ].answer) {
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


function endQuiz() {
    clearInterval(intervalID)
    hideScreens();
    scoreScreen.removeAttribute("hidden");
}

const submitB = document.querySelector("submit-b")

function saveScore(event) {
    event.preventDefault();

    let highscore = {
        initials: inputElement.value,
        score: time,
    };

    updateHighscore(highscore)
}

function updateHighscore(highscore) {
    let highscoreList = submitHighscore();
    highscoreList.push(highscore);
    localStorage.setItem("highscoreList". JSON.stringify(highscoreList));
}

function submitHighscore() {
    let savedHighsore = localStorage.getItem("highscoreList")
    if (savedHighsore !== null) {
        let highscoreList = JSON.parse(savedHighsore)
        return highscoreList;
    } else {
        savedHighsore = [];
    }
    return savedHighsore
}