const allQuestions = [
    { question: "هُوَ", options: ["او (مرد)", "او (زن)", "آن دو (مرد)", "ما"], correct: 0 },
    { question: "هُمَا", options: ["آن دو (مرد/زن)", "شما (دختر)", "آنها (مرد)", "من"], correct: 0 },
    { question: "هُم", options: ["آنها (مردان)", "شما (مردان)", "آن دو (زن)", "او (زن)"], correct: 0 },
    { question: "هِيَ", options: ["او (زن)", "او (مرد)", "آنها (زنان)", "ما"], correct: 0 },
    { question: "هُنَّ", options: ["آنها (زنان)", "آن دو (زن)", "شما (زنان)", "تو (زن)"], correct: 0 },
    { question: "أَنْتَ", options: ["تو (مرد)", "تو (زن)", "او (مرد)", "من"], correct: 0 },
    { question: "أَنْتُمَا", options: ["شما دو نفر (مرد/زن)", "شما (مردان)", "آن دو (مرد)", "ما"], correct: 0 },
    { question: "أَنْتُمْ", options: ["شما (مردان)", "شما (زنان)", "آنها (مردان)", "تو (مرد)"], correct: 0 },
    { question: "أَنْتِ", options: ["تو (زن)", "تو (مرد)", "او (زن)", "شما (زنان)"], correct: 0 },
    { question: "أَنْتُنَّ", options: ["شما (زنان)", "آنها (زنان)", "شما (مردان)", "تو (زن)"], correct: 0 },
    { question: "أَنَا", options: ["من", "ما", "تو (مرد)", "او (مرد)"], correct: 0 },
    { question: "نَحْنُ", options: ["ما", "من", "شما (مردان)", "آنها (مردان)"], correct: 0 },
];



const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");


let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let isGameOver = false;



function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function startQuiz() {
    questions = shuffleArray([...allQuestions]);
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = score;
    nextBtn.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    nextBtn.classList.add("hide");
    optionsContainer.innerHTML = "";

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    let shuffledOptions = shuffleArray([...currentQuestion.options]);
    let correctAnswerText = currentQuestion.options[currentQuestion.correct];

    shuffledOptions.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");

        button.addEventListener("click", () => selectAnswer(option, correctAnswerText, button));
        optionsContainer.appendChild(button);
    });
}


function selectAnswer(selectedOption, correctAnswer, selectedButton) {
    const allButtons = optionsContainer.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
        scoreElement.innerText = score;
    } else {
        selectedButton.classList.add("wrong");

        allButtons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }
    nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
    if (isGameOver) {
        isGameOver = false;
        nextBtn.innerText = "سوال بعدی";
        startQuiz();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            isGameOver = true;
            questionElement.innerText = "بازی تموم شد! امتیاز تو:   " + score + "  از  " + questions.length;
            optionsContainer.innerHTML = "";
            nextBtn.innerText = "دوباره بازی کن";
            nextBtn.classList.remove("hide");
        }
    }
});


startQuiz();
