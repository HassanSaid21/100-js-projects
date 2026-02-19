
const startScreen = document.getElementById('start-screen')
const resultScreen = document.getElementById('result-screen')
const quizScreen = document.getElementById('quiz-screen')
const startButton = document.getElementById('start-btn')
const questionText = document.getElementById('question-text')
const answersContainer = document.getElementById('answers-container')
const currentQuestion = document.getElementById('current-question')
const totalQuestions = document.getElementById('total-questions')
const score = document.getElementById('score')
const totalScore = document.getElementById('total-score')
const finalScore = document.getElementById('final-score')
const resultMessage = document.getElementById('result-message')
const restartButton = document.getElementById('restart-btn')
const progressBar = document.getElementById('progress')

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];


// bad code but it works
// totalQuestions.textContent = quizQuestions.length + ''
// startButton.addEventListener('click', (e) => {
//     startScreen.classList.toggle('active')
//     quizScreen.classList.toggle('active')
//     checkAnswer()

// })


// function checkAnswer(questionNumber = 0) {
//     answersContainer.innerHTML = null
//     questionText.textContent = quizQuestions[questionNumber].question
//     currentQuestion.textContent = questionNumber + 1 + ''
//     quizQuestions[questionNumber].answers.forEach((ans, i) => {
//         const answerButton = document.createElement('div')
//         answerButton.classList.add('answer-btn')
//         answerButton.textContent = ans.text
//         if (ans.correct) {
//             answerButton.id = 'true'
//         }
//         answersContainer.appendChild(answerButton)

//         answerButton.addEventListener('click', (e) => {
//              const btns  =  answersContainer.querySelectorAll('div')
//              btns.forEach(btn=> btn.style.pointerEvents='none'

//              )

//             if (e.target.id) {
//                 e.target.classList.add('answer-correct')
//                 score.textContent = Number(score.textContent) + 1 + ''
//             }

//             else {
//                 e.target.classList.add('answer-incorrect')
//                 document.getElementById('true').classList.add('answer-correct')
//             }
//             progressBar.style.width = (questionNumber + 1) / quizQuestions.length * 100 + '%'

//  setTimeout(() =>{
//             if (questionNumber === quizQuestions.length-1) {
//                 resultScreen.classList.toggle('active')
//                 quizScreen.classList.toggle('active')
//                 progressBar.style.width = '0'
//                 finalScore.textContent = score.textContent
//                 totalScore.textContent = quizQuestions.length
//                 score.textContent = '0'

//             } else {
//                 checkAnswer(questionNumber + 1)


//            } }, 800)





//         })

//     })
// }



// restartButton.addEventListener('click', (e) => {
//     resultScreen.classList.toggle('active')
//     startScreen.classList.toggle('active')
// })



// states
let currentIndex = 0;
let currentScore = 0;
let answersdisabled = false
const QUESTION_DELAY = 800;

totalQuestions.textContent = quizQuestions.length;
totalScore.textContent = quizQuestions.length

//event listeners
startButton.addEventListener("click", () => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    renderQuestion();
});

restartButton.addEventListener("click", () => {
    currentIndex = 0;
    currentScore = 0;
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
});


answersContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("answer-btn") || answersdisabled) return;
    
    answersdisabled = true
    const isCorrect = e.target.dataset.correct === "true";

    if (isCorrect) {
        e.target.classList.add("answer-correct");
        updateScore()

    } else {
        e.target.classList.add("answer-incorrect");
        answersContainer
            .querySelector('[data-correct="true"]')
            .classList.add("answer-correct");
    }

    updateProgress();

    setTimeout(nextQuestion, QUESTION_DELAY);
});

function renderQuestion() {
    answersdisabled = false
    const question = quizQuestions[currentIndex];

    questionText.textContent = question.question;
    currentQuestion.textContent = currentIndex + 1;

    answersContainer.innerHTML = "";

    question.answers.forEach((ans) => {
        const btn = document.createElement("div");
        btn.classList.add("answer-btn");
        btn.textContent = ans.text;
        btn.dataset.correct = ans.correct;
        answersContainer.appendChild(btn);
    });
}

// function disableAnswers() {
// answersdisabled  = true 
//   const buttons = answersContainer.querySelectorAll(".answer-btn");
//   buttons.forEach((btn) => (btn.style.pointerEvents = "none"));
// }


function updateScore() {
    currentScore++;
    score.textContent = currentScore
}
function updateProgress() {
    progressBar.style.width =
        ((currentIndex + 1) / quizQuestions.length) * 100 + "%";
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex >= quizQuestions.length) {
        showResults();
    } else {
        renderQuestion();
    }
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = currentScore;
    totalScore.textContent = quizQuestions.length;

    progressBar.style.width = "0%";
}

