// create the timer first, must be 60 seconds
var start = document.querySelector("#Start-game");
// var reset = document.getElementById('Reset')
var questionInput = document.querySelector(".Input");
var timeMeter = document.querySelector("#pre");
var timeEl = document.querySelector(".time");
var submit = document.querySelector("#Submit");
// var answers = document.querySelector(".answer")
// these are my questions
var solve = [
  {
    question: "1. What does HTML stand for?",
    answer: [
      "Hypertext Markup Language",
      "Hyper Mark Language",
      "Hype Match Lang",
      "Hyper Marketup language",
    ],
    correctSolution: "Hypertext Markup Language",
  },
  {
    question: "2.What does CSS mean?",
    answer: [
      "Casding Style Sheet",
      "Cascading Style Sheets",
      "Casa Sheets Style",
      "Club Style Sheets",
    ],
    correctSolution: "Cascading Style Sheets",
  },
  {
    question: "3. What does JS stand for?",
    answer: ["Justin Script", "Just Scriptit", "JavaSpit", "JavaScript"],
    correctSolution: "JavaScript",
  },
  {
    question:
      "4. How many licks does it take to get to the center of a tootsie pop ",
    answer: ["252", "364", "411", "144"],
    correctSolution: "252",
  },
];
// the global of the time, how long it will run down
var timeRemain = 60;
// created a boolean since the quiz is not done until true
var quizDone = false;
// a variable start question at  0
var startQuestions = 0;
var score = 0;

// the function time represents the time it has till finished

function time() {
  document.getElementById("time").style.display = "block";
  timeRemain = 60;
  var timeLeft = setInterval(function () {
    timeRemain--;
    timeEl.textContent = "Time remaining: " + timeRemain + " seconds";

    if (timeRemain <= 0) {
      clearInterval(timeLeft);
      endGame();
    }
    if (quizDone) {
      clearInterval(timeLeft);
    }
  }, 1000);
}

// starting the actual quiz
function startQuiz() {
  quizDone = false;
  startQuestions = 0;
  document.getElementById("Start-game").style.display = "none";
  document.getElementById("pre").style.display = "none";
  document.getElementById("questions-Input").style.display = "block";
  time();
  questions();
}
// questions set up

function questions() {
  if (startQuestions === solve.length) {
    endGame();
    //console.log("Score: "  + score)
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
    solveAnswer.setAttribute("id", [i]);
    questionInput.appendChild(solveAnswer);
    solveAnswer.setAttribute("class", "answer");
  }
  var answers = document.querySelectorAll(".answer");
  answers.forEach((button) => {
    button.addEventListener("click", function () {
      if (inquiry.correctSolution === button.innerText) {
        score++;
      } else {
        timeRemain -= 10;
      }
      questions();
    });
  });

  startQuestions++;
}
// function that ends the game
function endGame() {
  quizDone = true;
  document.getElementById("questions-Input").style.display = "none";
  document.getElementById("time").style.display = "none";
  document.getElementById("game-over").style.display = "block";
}
// created an empty string for the player so when the player inputs the name the players name goes here
var player = "";
// scores varible that will capture the user name and user score, the way it appears in the localstorage
var scores = {
  userName: "",
  userScore: 0,
};
// when they submit e score how it will appear and how the game will end
function submitScore() {
  document.getElementById("game-over").style.display = "none";
  var player = document.getElementById("user-name").value;
  // when the game starts, need to see that the user score and score exist in local storage. If it does exist, save that into an object, if it DOES NOT exits create a new user object. WHEN the game is over, add the new score to the existing score
  scores.userName = player;
  scores.userScore = score;
  if (player !== "") {
    if (localStorage.getItem("gameScores") !== null) {
      var stuffFromLocal = localStorage.getItem("gameScores");
      var stuffFromLocalParsed = JSON.parse(stuffFromLocal);
      stuffFromLocalParsed.push(scores);
      localStorage.setItem("gameScores", JSON.stringify(stuffFromLocalParsed));
    } else {
      var scoresArray = [scores];
      localStorage.setItem("gameScores", JSON.stringify(scoresArray));
    }
  }
  console.log(scores);
  //scores = 0;
  document.getElementById("pre").style.display = "block";
  document.getElementById("Start-game").style.display = "block";
}

submit.addEventListener("click", submitScore);
start.addEventListener("click", startQuiz);
