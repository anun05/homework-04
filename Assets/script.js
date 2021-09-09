// create the timer first, must be 60 seconds 
var start = document.querySelector("#Start-game");
// var reset = document.getElementById('Reset')
var questionInput = document.querySelector(".Input");
var timeMeter = document.querySelector(".Pre")
var timeEl = document.querySelector(".time")
var submit = document.querySelector("#Submit")
// var answers = document.querySelector(".answer")

var score = 0;

var solve = [
    {
        question: "1. What does HTML stand for?",
        answer: ["Hypertext Markup Language", "Hyper Mark Language", "Hype Match Lang", "Hyper Marketup language"],
        correctSolution: "Hypertext Markup Language",
    },
    {
        question: "2.What does CSS mean?",
        answer: ["Casding Style Sheet", "Cascading Style Sheets", "Casa Sheets Style", "Club Style Sheets"],
        correctSolution: "Cascading Style Sheets",
    },
    {
        question: "3. What does JS stand for?",
        answer: ["Justin Script", "Just Scriptit", "JavaSpit", "JavaScript"],
        correctSolution: "JavaScript",
    },
    {
        question: "4. How many licks does it take to get to the center of a tootsie pop ",
        answer: ["252", "364", "411", "144"],
        correctSolution: "252",
    },

];

var timeRemain = 60;
var quizDone = false;

function time() {
    document.getElementById("time").style.display = "block";
    timeRemain = 60;
    var timeLeft = setInterval(function () {
        timeRemain--;
        timeEl.textContent = "Time remaining: " + timeRemain + " seconds";

        if (timeRemain <= 0) {
            clearInterval(timeLeft);
            endGame()
        }
        if (quizDone) {
            clearInterval(timeLeft)
            
        }
    }, 1000);
}
var startQuestions = 0;
function startQuiz() {
    quizDone = false;
    startQuestions = 0;
    document.getElementById("Start-game").style.display = "none";
    document.getElementById("Pre").style.display = "none";
    document.getElementById("questions-Input").style.display = "block";
    time();
    questions();
}

function questions() {
    if (startQuestions === solve.length) {
        endGame();
        console.log("Score: "  + score)
        return;
    }
    questionInput.innerHTML = "";
    var inquiry = solve[startQuestions];
    var questName = document.createElement("h1");
    questName.textContent = inquiry.question;
    questionInput.appendChild(questName);

    for (var i = 0; i < inquiry.answer.length; i++) {
        var solveAnswer = document.createElement("button");
        solveAnswer.textContent = inquiry.answer[i];
        solveAnswer.setAttribute("id", [i])
        questionInput.appendChild(solveAnswer);
        solveAnswer.setAttribute("class", "answer");
        console.log("test")
    }
    var answers = document.querySelectorAll(".answer")
    answers.forEach((button) => {
        button.addEventListener("click", function() {
            if (inquiry.correctSolution === button.innerText) {
                score++;
            }
            else {
                timeRemain -= 10;
            }
            questions();
        })
    })

    startQuestions++;
}

function endGame() {
    quizDone = true;
    document.getElementById("questions-Input").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("game-over").style.display = "block";

}
var player = ""

var scores = {
    userName: "",
    userScore: 0
};

function submitScore() {
    document.getElementById("game-over").style.display = "none"
    player = document.getElementById("user-name").value
    scores.userName = player;
    scores.userScore = score;
    if (player !== "") {
        if (localStorage.getItem("gameScores") !== null) {
            var stuffFromLocal = localStorage.getItem("gameScores");
            var stuffFromLocalParsed = JSON.parse(stuffFromLocal);
            stuffFromLocalParsed.push(scores);
            localStorage.setItem("gameScores", JSON.stringify(stuffFromLocalParsed));
        }
        else {
            var scoresArray = [scores];
            localStorage.setItem("gameScores", JSON.stringify(scoresArray));
        }
    }
    scores = 0;
    document.getElementById("Pre").style.display = "block";
    document.getElementById("Start-game").style.display = "block";
}
 
submit.addEventListener("click", submitScore)
start.addEventListener("click", startQuiz)

