// Quiz Questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis"
        ],
        correctAnswer: 0
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        correctAnswer: 1
    },
    {
        question: "Which of these is not a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Django"],
        correctAnswer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Computer Style Sheets",
            "Creative Style Sheets"
        ],
        correctAnswer: 0
    },
    {
        question: "Which HTML tag is used for creating a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        correctAnswer: 1
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "--"],
        correctAnswer: 0
    },
    {
        question: "Which of these is a valid way to declare a JavaScript variable?",
        options: ["variable x;", "var x;", "v x;", "let = x;"],
        correctAnswer: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: [
            "alertBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "msgBox('Hello World');"
        ],
        correctAnswer: 2
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');
const currentScore = document.getElementById('current-score');
const timeDisplay = document.getElementById('time');
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');
const correctAnswers = document.getElementById('correct-answers');
const timeTaken = document.getElementById('time-taken');

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let quizStarted = false;
let selectedOption = null;

// Initialize the quiz
function initQuiz() {
    totalQuestions.textContent = quizQuestions.length;
    maxScore.textContent = quizQuestions.length;
}

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    quizStarted = true;
    startTimer();
    showQuestion();
}

// Show current question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', selectOption);
        optionsContainer.appendChild(optionElement);
    });
    
    nextBtn.classList.add('hide');
    selectedOption = null;
}

// Select an option
function selectOption(e) {
    if (selectedOption !== null) return;
    
    selectedOption = parseInt(e.target.dataset.index);
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    e.target.classList.add('selected');
    
    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
        e.target.classList.add('correct');
        score++;
        currentScore.textContent = score;
    } else {
        e.target.classList.add('wrong');
        // Highlight correct answer
        options[currentQuestion.correctAnswer].classList.add('correct');
    }
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    nextBtn.classList.remove('hide');
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Timer function
function startTimer() {
    timeDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    const timeUsed = 60 - timeLeft;
    finalScore.textContent = score;
    correctAnswers.textContent = score;
    timeTaken.textContent = timeUsed;
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    quizStarted = false;
    selectedOption = null;
    
    currentScore.textContent = '0';
    resultScreen.classList.add('hide');
    startScreen.classList.remove('hide');
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize the quiz when page loads
window.addEventListener('DOMContentLoaded', initQuiz);