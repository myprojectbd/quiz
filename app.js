const MyBtn = document.querySelector(".MyBtn button"); 
const RulesBox = document.querySelector(".RulesBox");
const exit = document.querySelector(".Buttons .exitButton");
const continueButton = document.querySelector(".Buttons .continueButton");
const Question = document.querySelector(".Question");
const option_list = document.querySelector('.myoption');
const timecount = document.querySelector(".timecount .second");
const timelines = document.querySelector(".question-header .time-lines");


MyBtn.onclick = ()=>{
    RulesBox.classList.add("activeInfo"); 
}

exit.onclick = ()=>{
    RulesBox.classList.remove("activeInfo"); 
}
continueButton.onclick = ()=>{
    RulesBox.classList.remove("activeInfo");
    Question.classList.add("activeQuiz"); 
    showQuestions(0)

    startTimer(15)

    startTimerLine(0);
}

const nextbtn = document.querySelector(".nextbtn");

const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".buttons .restart1");
const quit_quiz = document.querySelector(".buttons .quit ");


restart_quiz.onclick = ()=>{

    window.location.reload();
    
}

quit_quiz.onclick = ()=>{

    
}





let que_count =0;
let counter;
let timevalue = 15;

let counterLine;
let widthValue = 0;
let userScore  = 0;

nextbtn.onclick= ()=> {
    if(que_count <questions.length -1) {
         que_count++ 
         showQuestions(que_count);
         clearInterval(counter);
         startTimer(timevalue);

         clearInterval(counterLine);
         startTimerLine(widthValue);

         nextbtn.style.display = "none";

         timeOff.textContent = "Time Left";
    }
    else{
        
        showResultBox()
    }
}

function showQuestions(index) {

    const que_text = document.querySelector('.text');
    

    let option_tag = '<div class="option">'+ questions[index].options[0] +'</div>'
    +'<div class="option">'+ questions[index].options[1] +'</div>'
    +'<div class="option">'+ questions[index].options[2] +'</div>' 
    +'<div class="option">'+ questions[index].options[3] +'</div>' ;
    
    

    
  
   let que_tag = "<span>" + questions[index].numb+ '.' + questions[index].question + " </span>"; 
    que_text.innerHTML = que_tag;

     option_list.innerHTML = option_tag;

     const total_ques = document.querySelector(".total_ques");
     let total_queTag  = '<p>' + questions[index].numb + ' Of 5 </p>'
     total_ques.innerHTML = total_queTag;


     const option = option_list.querySelectorAll(".option"); 
     for(let i=0; i<option.length; i++){
         option[i].setAttribute("onclick", "optionSelected(this)"); 
     }

   }

   let tickicon ='<div class="tick_icon"><i class="fa-solid fa-circle-check"></i></div>' ;
   let crossicon='<div class="cross_icon"><i class="fa-solid fa-circle-xmark"></i></div> ' ;
   

function optionSelected(answer) {
     clearInterval(counter);
     clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    
    let alloptions = option_list.children.length;
    
    

    if (userAns == correctAns) {
        userScore +=1;
      answer.classList.add("correct");
      answer.insertAdjacentHTML("beforeend", tickicon);
    }
    
    else{
        answer.classList.add("incorrect");

        answer.insertAdjacentHTML("beforeend", crossicon);
        
        for(let i =0; i<alloptions; i++){
            if(option_list.children[i].textContent == correctAns ){
             option_list.children[i].setAttribute("class", "option correct"); 
             option_list.children[i].insertAdjacentHTML("beforeend", tickicon); 
            }
        }
    }   
    
    
    for(let i=0; i<alloptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    
    nextbtn.style.display = "block";
}    

function showResultBox() {
    RulesBox.classList.remove("activeInfo");
    Question.classList.remove("activeQuiz"); 

    result_box.classList.add("activeResult");
    const scoreText = document.querySelector(".score_text");

    if(userScore >3) {
        let scoreTag = '<span>Congratulations You Got <p>'+ userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore >1) {
        let scoreTag = '<span>Carry On You Got <p>'+ userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else{
        let scoreTag = '<span>Sorry You Got <p>'+ userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
}
   
 
function startTimer(time) {

    counter = setInterval(timer, 1000);
    function timer() {
        timecount.textContent =time;
        time-- ;

        if (time <9) {
            let addZero = timecount.textContent;
            timecount.textContent = 0 + addZero;
        }

        if (time<0) {
            clearInterval(counter);
            timecount.textContent ="00";
            
        }
    }
}   
              
function startTimerLine(time) {
    counterLine = setInterval(timer,50);

    function timer() {
        time +=1;
        timelines.style.width = time + "px";

        if (time >319) {
            clearInterval(counterLine);
        }
    }
}
