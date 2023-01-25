const questions = [
  {
    questionT: "What do you enclose a string variable in? ",
    choices: ["1. quotes", "2. brackets", "3. dashes", "4. asterisks"],
    answer: "1. quotes",
  },

  {
    questionT: "At what number does an array start at?",
    choices: ["1. 9", "2. 7", "3. 1", "4. 0"],
    answer: "4. 0",
  },

  {
    questionT: "What does DOM mean?",
    choices: [
      "1. Dominos",
      "2. Document Object Model",
      "3. It's just a name",
      "4. none of the above",
    ],
    answer: "2. Document Object Model",
  },
];

//I gave each screen a variable via an id

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const scoreScreen = document.querySelector("#score-screen");
const leaderboardScreen = document.querySelector("#leaderboard-screen");
const backBtn = document.querySelector("#back");
const submitB = document.getElementById("submit-b");
const inputElement = document.querySelector("#initials");
const showTime = document.querySelector("#time");
const clearBtn = document.querySelector("#clear");
const scoreList = document.getElementById("player-list");

//these variables are used a lot
var intervalID;
var time;
var currentQ;

let scoreStorage = JSON.parse(localStorage.getItem("score")) || [];

//Made this function to hide screens and can call later to hide all of the screens.
function hideScreens() {
  startScreen.setAttribute("hidden", true);
  questionScreen.setAttribute("hidden", true);
  scoreScreen.setAttribute("hidden", true);
  leaderboardScreen.setAttribute("hidden", true);
}

function startQuiz() {
  hideScreens();
  //removes the hidden attribute on the questions
  questionScreen.removeAttribute("hidden");
  //sets the current question of the array to 0 and then displays the first question
  currentQ = 0;
  showQuestion();
  //set the time to 30 because I only have 3 questions
  time = 60;
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
function displayTime() {
  showTime.textContent = time;
}

//shows the qustions and the choices
function showQuestion() {
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

//checks answer and takes away time if wrong
function checkAnswer(event) {
  let choiceButton = event.target.innerHTML;
  if (choiceButton === questions[currentQ].answer) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
    time -= 10;
    displayTime();
    console.log(event.target);
    console.log(choiceButton);
    console.log(questions[currentQ].answer);
  }
  
  //if the current question is the last one then it ends the quiz. If not it moves to next question
  currentQ++;
  if (currentQ === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

//function clears the time and rehides the screens and then shows the score and highscore screen. also showing the time left/score
function endQuiz() {
  clearInterval(intervalID);
  hideScreens();
  scoreScreen.removeAttribute("hidden");
  leaderboardScreen.removeAttribute("hidden");

  let finalScore = document.querySelector("#score");
  finalScore.textContent = time;
}

//shows highscores and sorts them.
function displayLeaderBoard() {

  scoreList.textContent = ""

  let sortedStorage = scoreStorage.sort(function(a,b){
    return b.score - a.score
  })

  sortedStorage.forEach(function (user, index) {
    console.log(user, index);

    const li = document.createElement("li");
    li.textContent = user.initials + ": " + user.score;

    scoreList.appendChild(li);
  });
}

//saves the score once the submit button is clicked
function saveScore(event) {
  event.preventDefault();

  const score = {
    initials: inputElement.value,
    score: time,
  };

  scoreStorage.push(score);

  localStorage.setItem("score", JSON.stringify(scoreStorage));

  displayLeaderBoard();
}

//clears the leaderboard
function clearStorage() {
localStorage.clear();
displayLeaderBoard();
scoreList.textContent = ""
}

//brings back to start
function rtnToStartScreen() {
  time = undefined;
  displayTime();
  window.location = 'https://hunterwilson1.github.io/Javascript-Quiz/'
}

backBtn.addEventListener("click", rtnToStartScreen);
submitB.addEventListener("click", saveScore);
document.getElementById("start-button").addEventListener("click", startQuiz);
//selcts the div with id of q-choices
document.querySelector("#q-choices").addEventListener("click", checkAnswer);
clearBtn.addEventListener("click", clearStorage);

displayLeaderBoard();
