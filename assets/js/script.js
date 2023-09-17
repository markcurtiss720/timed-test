var timerEl = document.getElementById('set-timer');
var highscoreEl = document.getElementById('high-score');
var startButton = document.getElementById('start-btn');
var intro = document.getElementById("container");

var secondsLeft = 75;
var newHighScore = 0;
var questionCount = 0;

timerEl.textContent = "Timer: " + secondsLeft;
highscoreEl.textContent = "Highscore: " + newHighScore;




startButton.addEventListener("click", startGame)

function startGame() {
    startTime();
    intro.classList.add("hide");
    
    

}




function startTime() {
    var timerInterval = setInterval(function(){
        timerEl.textContent = "Timer: " + secondsLeft 
        secondsLeft--;

        if(secondsleft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);

            //NEED TO CREATE FUNCTION TO ENTER INITIALS 

        } 

    }, 1000);
}








var questions = [
    question1 = {
        question: "Whats 2 + 2?",
        answer: [
            7,
            12,
            9999,
            4,
        ],
    },
    question2 = {
        question: "WHats 2 + 2 again?",
        answer: [
            4,
            "maybe 7?",
            "8....not wait...10?",
            "IDK"
        ],
    },
]


