const questions = [
    {
        question: 'What do you enclose a string variable in? ',
        choices: ["a. quotes", "b. brackets", "c. dashes", "d. asterisks"],
        answer: "a. quotes"
    },

    {
        question: "At what number does an array start at?",
        choices: ["a. 9", "b. 7", "c. 1", "d. 0"],
        answer: "d. 0"
    },

    {
        question: "What does DOM mean?",
        choices: ["a. Dominos", "b. Document Object Model", "c. It's just a name", "d. none of the above"],
        answer: "b. Document Object Model"
    }
];
const highSores = [];
let timeRemaining = 60;
let currentQuestion = 0;

document.getElementById('start-button').addEventListener('click', startQuiz)

function startQuiz() {
    
}