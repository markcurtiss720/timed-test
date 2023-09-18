

//sections to hide and reveal
var intro = document.getElementById("container");
var quizContainer = document.getElementById("container2");
var endGame = document.getElementById("container3");
var scoreBoard = document.getElementById("container4");


var questionEl = document.getElementById("questions");
var isTrue = document.getElementById("isTrue");
var initialsInput = document.getElementById("initials")
var scoreListEl = document.getElementById("score-list");
var scoreList = [];

//buttons
var viewHighscore = document.getElementById("view-highscore")
var startButton = document.getElementById('start-btn');
var answerBtn = document.querySelectorAll('.answer-btn')
var submitScore = document.getElementById("submit-score");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var reset = document.getElementById("reset");
var restart = document.getElementById("restart");

//sets question counter back to zero
var questionCount = 0;

//Timer and highscore
var timerEl = document.getElementById('set-timer');
var finalScore = document.getElementById("final-score");
var secondsLeft = 75;
timerEl.textContent = "Timer: " + secondsLeft;




//This functions will start the timer and countdown till zero or all answeres answered
function startTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        
        if(secondsLeft === 0 || questionCount === questionArray.length) {
        clearInterval(timerInterval);
        quizContainer.classList.add("hide");
        endGame.classList.remove("hide");
        finalScore.textContent = secondsLeft;
            //NEED TO CREATE FUNCTION TO ENTER INITIALS ;
        }
    }, 1000);
}




//starts the quiz
function startGame() {
    intro.classList.add("hide");
    quizContainer.classList.remove("hide");
    questionCount = 0;
    startTime();
    setQuestions(questionCount)
}


//Array of questions to pull from and their() spot in the array
var questionArray = [
    {
        // first question
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. curly brackets", "2. quotes", "3. commmas", "4. parentheses"],
        correctAnswer: "1" 
    },
    {
        // Second question
        question: "Commonly used data types do NOT include:",
        answers: ["1. alerts", "2. booleans", "3. numbers", "4. strings"],
        correctAnswer: "0" 
    },
    {
        // Third question
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. console.log", "3. for loops", "4. terminal/bash"],
        correctAnswer: "2"
    },
    {
        // Forth question
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. other arrays", "2. booleans", "3. numbers and strings", "4. all of the above"],
        correctAnswer: "3" 
    },
    {
        // Fith question
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. square brackets", "2. quotes", "3. curly brackets", "4. parentheses"],
        correctAnswer: "2" 
    },
];

//displays the current question 
function setQuestions(qc) {
    if (qc < questionArray.length) {
        questionEl.textContent = questionArray[qc].question;
        answer1.textContent = questionArray[qc].answers[0];
        answer2.textContent = questionArray[qc].answers[1];
        answer3.textContent = questionArray[qc].answers[2];
        answer4.textContent = questionArray[qc].answers[3];
    }
}


//Check if selected answer is the correct one.
function answerTrue(event) {
    event.preventDefault();

    //set up the comment to say whether or not your choice was correct
    isTrue.style.display = "block";
    let p = document.createElement("p");
    isTrue.appendChild(p)

    setTimeout(function() {
        p.style.display = "none";
    }, 1000);

//checks answer and tell you if answer was correct or not.
    if (questionArray[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questionArray[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect";
    }
    
//increase count to display next question.
    if(questionCount < questionArray.length) {
        questionCount++
    }

//sets the next question up 
    setQuestions(questionCount);
}


//Adds score to a scoreboard and remembers the highest score
function addScore(event) {
    event.preventDefault();

    endGame.classList.add("hide");
    scoreBoard.classList.remove("hide");

    var initials = initialsInput.value.toUpperCase();
    console.log(initials)
    scoreList.push({
        initials: initials,
        score: secondsLeft
    });  
    console.log(scoreList)

    scoreList = scoreList.sort(function(a, b) {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListEl.textContent = "";
    for(var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoreList[i].initials + " " + scoreList[i].score;
        scoreListEl.append(li);
    }

    storeScore();
    displayScore();
}

//stores score in local storage
function storeScore() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList))
}


//displays scores on scorboard section of page
function displayScore() {
    var storedScores = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScores !== null) {
        scoreList = storedScores;
    }
}


//clears all scores
function resetScore() {
    localStorage.clear();
    scoreListEl.textContent = "";
}



//Event listeners and buttons


//displays or hides highest score made
viewHighscore.addEventListener("click", function(){
    if(scoreBoard.classList.contains("hide")) {
        scoreBoard.classList.remove("hide");
    } else if (!scoreBoard.classList.contains("hide")) {
        scoreBoard.classList.add("hide");
    } else {
        return alert("No Score")
    }
});

//starts game
startButton.addEventListener("click", startGame);


answerBtn.forEach(item => {
    item.addEventListener('click', answerTrue);
});

//submits score and adds it to scoreboard
submitScore.addEventListener("click", addScore);

//button to reset scores
reset.addEventListener("click", resetScore);


//brings you back to intro section to play again
restart.addEventListener("click", function(){
    scoreBoard.classList.add("hide");
    intro.classList.remove("hide");
    secondsLeft = 75;
    timerEl.textContent = "Time: " + secondsLeft;
}) 

