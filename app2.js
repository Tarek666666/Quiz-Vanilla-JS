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

const qsNumberSpan = document.getElementById("qs-number");
const qsContainer = document.querySelector(".Q-container > p");
const answersContainer = document.querySelector(".answers-container");
let userScore = 0;
let currentIndex = 0;
let scoreDisplay = document.querySelector('.score-display');



// getting the quistion list from the json file

function getQs() {
    let myReq = new XMLHttpRequest();
    myReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let qsObject = JSON.parse(this.responseText);
            let qsAmount = qsObject.length;
            answersContainer.innerHTML = ``;
            createBullets(qsAmount, qsObject);
            currentIndex++;
        }
    };

    myReq.open("GET", "qs.json", true);
    myReq.send();
}

getQs();

// fucntion to create the questions and the 4 answers options

function createBullets(qsAmount, obj) {
    if (currentIndex == qsAmount) {
        currentIndex = 0;
        scoreDisplay.innerText = '0';
        console.log('you finished the quiz, ur score' , userScore)
    }

    let qsText = obj[currentIndex].title;
    let rightAnswer = obj[currentIndex].right_answer;
    let optionsArray = [obj[currentIndex]];
    let currentCorrectAnswer;
    let currentPossibleOptions = [];
    let optionsData;
    let listOptions = [];
    qsNumberSpan.innerText = currentIndex + 1;
    qsContainer.innerText = qsText;
    //console.log(optionsArray)

    for (let i = 1; i <= 4; i++) {
        answersIndex = `answer_${i}`;
        optionsData = document.createElement("div");
        optionsData.dataset.correct = rightAnswer;
        optionsData.dataset.possible = obj[currentIndex][`answer_${i}`];
        optionsData.classList.add("option-btn");
        optionsData.innerText = optionsData.dataset.possible;
        answersContainer.appendChild(optionsData);
        currentCorrectAnswer = optionsData.dataset.correct;
        listOptions.push(optionsData);
    }

    listOptions.forEach(optionBtn =>{


        optionBtn.addEventListener('click' , (e)=>{

            if(e.target.innerText == currentCorrectAnswer) {
                 
                changeAnswersColors(currentCorrectAnswer, listOptions);
                
                increaseScore(userScore);
                console.log(userScore)
                
                getQs();
                
                

            }else {

                changeAnswersColors(currentCorrectAnswer, listOptions);
                decreaseScore(userScore)
                
                getQs();
                
            }

            
            
        })

       
    })

    
    
    //console.log(testOptions)
}


function checkUserAnswer(){


}


// this function will change the colors of the options background
function changeAnswersColors(userAnswer, listOptions) {
    listOptions.forEach((option) => {

        isCorrect = option.dataset.correct == option.innerText;
        !isCorrect
            ? (option.style.backgroundColor = "red")
            : (option.style.backgroundColor = "green");

            
    });
}

function increaseScore(score){
    score + 1 ;
    console.log(score)
   scoreDisplay.innerHTML = score;
    

}
function decreaseScore(score){
    score - 1 ;
    console.log(score)
   scoreDisplay.innerHTML = score;
   

}

// function to reveal the right answer and change the options colors

/* let selectedOption = e.target;
      if(selectedOption.innerText == rightAnswer){

        test.forEach(btn => {
          btn.style.backgroundColor = 'red';
        })
        selectedOption.style.backgroundColor = "green";

        console.log('right' , selectedOption)
      }else {
        
        let correctAnswer = test.filter(btn => btn.innerHTML = rightAnswer);
        console.log('wrong' , correctAnswer)}

      console.log(e.target.innerText , rightAnswer)*/
