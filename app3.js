/*-----
Spanizer
- Wraps letters with spans, for css animations
-----*/
(function ($) {
    var s,
        spanizeLetters = {
            settings: {
                letters: $(".js-spanize"),
            },
            init: function () {
                s = this.settings;
                this.bindEvents();
            },
            bindEvents: function () {
                s.letters.html(function (i, el) {
                    //spanizeLetters.joinChars();
                    var spanizer = $.trim(el).split("");
                    return "<span>" + spanizer.join("</span><span>") + "</span>";
                });
            },
        };
    spanizeLetters.init();
})(jQuery);

// getting all needed elements

const animatedTextBox = document.querySelector(".animated-text");
const quizMainBox = document.querySelector(".main-Container");
const startBtn = document.querySelector(".start-quiz-btn");
const questionContainer = document.querySelector(".Q-container p");
const answersContainer = document.querySelector(".answers-container");
const nextQeuButton = document.querySelector(".giveup-btn");
let currentCorrectAnswer;
let currentQuesionIndex = 0;
let userScore = document.querySelector(".score-display");
let userScoreText = 0;
let qsNumberText = document.querySelector(".qs-number");
let timerP = document.querySelector(".timer");
let timerContainer = document.querySelector(".timer-Container");
let scoreContainer = document.querySelector(".score-container");
let quesAmountContainer = document.querySelector(".qs-Amount");
let userSpentTime = 0;
let restartBtn = document.querySelector(".restart_quiz");

// when user clicks on start button , hide the animated text box and show the main quiz box
// disable Next question button until user select option
startBtn.addEventListener("click", () => {
    quizMainBox.classList.add("active");
    animatedTextBox.classList.add("inactive");
    // timerP.innerText = 15;
    getQs();
});

// getting the quistion list from the json file
// disable the next question button until user select option
// calling the function createQesution()
function getQs() {
    let myReq = new XMLHttpRequest();
    myReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let qsObject = JSON.parse(this.responseText);
            let qsCount = qsObject.length;
            nextQeuButton.classList.add("disabled");
            timerP.innerText = 15;
            createQeustion(qsObject, qsCount);
            //calling the timer to start countdown from 15 to 0 every time when new question shows
            counter = 15;
            myInterval = setInterval(timer, 1000);
            answersContainer.classList.remove("disabled");
        }
    };

    myReq.open("GET", "qs.json", true);
    myReq.send();
}

// getting the first question from the object
// getting data from qsobject and create the questions tag and the answer tags
function createQeustion(qsObj, qsCount) {
    let answerIndex;

    //only when the current question index is less than the questions array
    if (currentQuesionIndex <= qsCount - 1) {
        currentCorrectAnswer = qsObj[currentQuesionIndex].right_answer;
        questionContainer.innerText = qsObj[currentQuesionIndex].title;
        let questionsTag = ` <div id='option' class=" option-btn"> ${qsObj[currentQuesionIndex].answer_1}</div>
        <div id='option' class=" option-btn "> ${qsObj[currentQuesionIndex].answer_2}</div>
        <div id='option' class=" option-btn "> ${qsObj[currentQuesionIndex].answer_3}</div>
        <div id='option' class=" option-btn "> ${qsObj[currentQuesionIndex].answer_4}</div> `;
        answersContainer.innerHTML = questionsTag;
        // the current question index
        qsNumberText.innerText = currentQuesionIndex;
        qsNumberText.innerText = currentQuesionIndex + 1;
        //increasing the current question index by 1 each time a the function is called
        currentQuesionIndex++;
        //selecting all questions elements and looping throuw them to add selectedOption() funtion to each element as an attribute
        let options = answersContainer.querySelectorAll(".option-btn");
        for (let i = 0; i < options.length; i++) {
            options[i].setAttribute("onclick", "selectedOption(this , currentCorrectAnswer)");
            options[i].setAttribute(
                "right_answer",
                `${qsObj[currentQuesionIndex - 1].right_answer}`
            );
        }
    } else {
        //restart current question index to start from 0
        //giving the result of the user when the test ends
        currentQuesionIndex = 10;
        timerP.classList.add("hidden");
        //center the score box and show the result
        clearInterval(myInterval);
        answersContainer.innerHTML = ``;
        userScore.classList.add("hidden");
        timerContainer.classList.add("hidden");
        scoreContainer.classList.add("hidden");
        quesAmountContainer.classList.add("hidden");
        questionContainer.innerHTML = `<div> Quiz Finished !!  your socre is <span class="result_span">${userScoreText}</span> out of 10. <br> <hr> You Spent <span class="result_span"> ${userSpentTime} </span> seconds To answer th Questions !!</div> 
                                      `;
        questionContainer.classList.add("active");
        restartBtn.classList.remove("restart_quiz");
        restartBtn.classList.add("restart_btn_active");
        nextQeuButton.classList.add("hidden");
    }
}

// getting the user's answer , and showing the correct answer
// enable next question button after the user has selected

function selectedOption(answer, currentCorrectAnswer) {
    if (answer.innerText == currentCorrectAnswer) {
        answer.classList.add("correct");
        answersContainer.classList.add("disabled");
        userScoreText++;
        userScore.innerText = userScoreText;
        userScore.style.color = "#32CD32";
        userScore.style.backgroundColor = "#202020";
        nextQeuButton.classList.remove("disabled");
        clearInterval(myInterval);
        timerP.innerText = timerP.innerText;
        // calculate the whole time spent by user
        userSpentTime += 15 - timerP.innerText;
    } else {
        
        answersContainer.classList.add("disabled");
        nextQeuButton.classList.remove("disabled");
        answer.classList.add("wrong");
        userScoreText == userScore;
        userScore.innerText = userScoreText;
        userScore.style.color = "red";
        userScore.style.backgroundColor = "#202020";
        clearInterval(myInterval);
        timerP.innerText = timerP.innerText;
        // calculate the whole time spent by user
        userSpentTime += 15 - timerP.innerText;
    }
}

// get the next question when user clicks on next que button
nextQeuButton.addEventListener("click", () => {
    timerP.innerText = 15;
    timerP.style.backgroundColor = "transparent";
    answersContainer.classList.remove("disabled");
    getQs();
});

function timer() {
    counter--;

    timerP.style.backgroundColor = "#2C5E1A";
    timerP.innerText = counter;
    if (counter <= 6) {
        timerP.style.backgroundColor = "red";
        timerP.innerText = counter;
    }
    if (counter == 0) {
        clearInterval(myInterval);
        counter = 15;
        timerP.style.backgroundColor = "transparent";
        answersContainer.classList.add("disabled");
        nextQeuButton.classList.add("disabled");
        userScore.innerText = userScoreText;

        //function to show right answers to user
        let btnOptionRight;

        document.querySelectorAll(".option-btn").forEach((btn) => {
            btnOptionRight = btn.getAttribute("right_answer");
            if (btnOptionRight == btn.innerText) {
                btn.classList.add("correct");
                questionContainer.innerText = "Time is Over , Right answer is ";
            } else {
                btn.classList.add("wrong");
                questionContainer.innerText = "Time is Over , Right answer is ";
            }
        });

        setTimeout(function () {
            nextQeuButton.classList.remove("disabled");
        }, 3000);
    }
}

// restart the quiz
restartBtn.addEventListener("click", function () {
    window.location.reload();
});
