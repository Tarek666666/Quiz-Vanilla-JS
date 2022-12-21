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




const qsNumberSpan = document.getElementById('qs-number');
const qsContainer = document.querySelector('.Q-container > p');
const answersContainer = document.querySelector('.answers-container');

let currentIndex = 0;


// getting the quistion list from the json file

function getQs(){

  let myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function(){

    if(this.readyState === 4 && this.status === 200){

        let qsObject = JSON.parse(this.responseText);
        let qsCount = qsObject.length;
        
        createBullets(qsCount , qsObject);

        currentIndex ++;
        
       
    }
    
  }

  myReq.open('GET' , "qs.json" , true);
  myReq.send();
}

getQs();

// fucntion to create the questions and the 4 answers options

function createBullets(num , obj){
   
  if (currentIndex == num){
    currentIndex = 0;
  }

  let qsText = obj[currentIndex].title;
  let rightAnswer = obj[currentIndex].right_answer;
  let answersIndex ;
  qsNumberSpan.innerText = currentIndex + 1;
  qsContainer.innerText = qsText;
  answersContainer.innerHTML = ``;  

  for (let i = 1 ; i <= 4 ; i++){
    answersIndex = `answer_${i}`;
    answersContainer.innerHTML += `  

    <div id='option' class=" option-btn ${answersIndex}"> ${obj[currentIndex][answersIndex]}</div>
    
    `

    
  }
  
  const allOptions = document.querySelectorAll('.option-btn');
  console.log(obj[currentIndex])
  // finding the correctAnswer with the 4 options
  const currentCorrectAnswer = obj[currentIndex].right_answer;
  allOptions.forEach(btnOption => {

    if(btnOption.innerHTML == currentCorrectAnswer){

      console.log('wookred')
    }

    btnOption.addEventListener('click' , (e)=>{

      let selectedOption = e.target.innerText;
      let selectedOptionDiv = e.target ;
      
      if(selectedOption == currentCorrectAnswer){

        


         changeAnswersColors(allOptions,currentCorrectAnswer, 'red' ); 
         selectedOptionDiv.style.backgroundColor = 'green';

         
       
      }else {

        changeAnswersColors(allOptions,currentCorrectAnswer, 'red' ); 
        console.log(selectedOptionDiv)
      }

      

    })
    
    
    
  })
  

}


// function to reveal the right answer and change the options colors

function changeAnswersColors(btnOptions ,currentCorrectAnswer, color){
  
  btnOptions.forEach(btn => {
    
    console.log(currentCorrectAnswer)
    if(btn.innerText !== currentCorrectAnswer){

      btn.style.backgroundColor = color;
    } else { btn.style.backgroundColor = 'red'; }
    
  })


};


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