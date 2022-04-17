var mainContentHolder = document.querySelector("#card-holder");
var mainContent = document.querySelector("#main-content");
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector(".submit-btn")
var questionNum = 0

// array of questions with their choices and correct answer
var quizQuestions = [
    {
        question : "JavaScript is a ____-side programming language.",
        answers : ["Client", "Server", "Both", "None"],
        correctAnswer : "option2"
    },
    {
        question : "Which of the following will write the message 'Hello Data Flair!' in an alert box?",
        answers : ["alertBox('Hello DataFlair!');", "alert(Hello DataFlair!);", "msgAlert('Hello DataFlair!');", "alert('Hello DataFlair!');"],
        correctAnswer : "option3"
    },
    {
        question : "How do you find the minimum of x and y using JavaScript",
        answers : ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
        correctAnswer : "option1"
    },
    {
        question : "Which JavaScript label catches all the values, except for the ones specified?",
        answers : ["catch", "label", "try", "default"],
        correctAnswer : "option3"
    },
    {
        question : "Which is the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        answers : ["if(x 2)", "if(x=2)", "if(x==2)", "if(x!=2"],
        correctAnswer : "option2"
    },
    {
        question : "What will the code return: Boolean(3<7)",
        answers : ["true", "false", "NaN", "SyntaxError"],
        correctAnswer : "option0"
    },
    {
        question : "How can you get the total number of arguments passed to a function?",
        answers : ["Using args.length property", "Using arguments.length property", "Both of the above", "None of the above"],
        correctAnswer : "option1"
    },
    {
        question : "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers : ["last()", "put()", "push()", "None of the above"],
        correctAnswer : "option2"
    },
    {
        question : "Which built-in method returns the calling string value converted to upper case?",
        answers : ["toUpperCase()", "toUpper()", "changeCase(case)", "None of the above"],
        correctAnswer : "option0"
    },
    {
        question : "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
        answers : ["charAt()", "charCodeAt()", "concat()", "indexOf()"],
        correctAnswer : "option1"
    }
]


var startQuiz = function(event) {
   clearPage();
   newContainer();
   nextQuestion();

};

var clearPage = function() {
    //clear page 
    var mainContent= document.getElementById("main-content")
    mainContent.remove();

}

var newContainer = function() {
     //create new quiz question container
     var questionHolder = document.createElement("div");
     questionHolder.className = "col-10 col-md-7 col-lg-5";
     questionHolder.id = "main-content"
     mainContentHolder.appendChild(questionHolder);
}


var nextQuestion = function(event) {
    if (quizQuestions.length < 1) {
        endQuiz();
    }
    

     //create new quiz question container
    //  var questionHolder = document.createElement("div");
    //  questionHolder.className = "col-10 col-md-7 col-lg-5";
    //  questionHolder.id = "main-content"
    //  mainContentHolder.insertBefore(questionHolder, mainContentHolder.firstChild);
    //id new question container and footer
    var questionHolder = document.getElementById("main-content");
    var quizFooter = document.getElementById("quiz-footer");

     //select next question from the array
     var selectedQuestion = quizQuestions[questionNum];

 
     //create and append quiz question
     var quizQuestionEl = document.createElement("h2");
     quizQuestionEl.textContent = selectedQuestion.question;
     questionHolder.insertBefore(quizQuestionEl, quizFooter);
 
     //create and append quiz answers
     var multipleChoiceList = document.createElement("ul");
     for (var i = 0; i < selectedQuestion.answers.length; i++) {
         //create var to hold li item
         var quizAnswer = document.createElement("li");
         
         //create radio button for answers
         var quizAnswerRadio = document.createElement("input")
         quizAnswerRadio.type = "radio";
         quizAnswerRadio.name = "answer";
         quizAnswerRadio.value = selectedQuestion.answers[i];
         quizAnswerRadio.id = "option" + i;
         quizAnswerRadio.setAttribute("onclick", "checkAnswer(this)");
         
         //create label for radio button
         var label = document.createElement("label");
         label.htmlFor = "option" + i;
         label.textContent = selectedQuestion.answers[i];
         
         
         //append radio button and label to quizAnswer li item
         quizAnswer.appendChild(quizAnswerRadio);
         quizAnswer.appendChild(label);
         
         //append quizAnswer to the multiple choice list
         multipleChoiceList.appendChild(quizAnswer);
     };
     questionHolder.insertBefore(multipleChoiceList, quizFooter);
};



var checkAnswer = function(answer) {
    clearPage();
    newContainer();
    console.log(answer.id);
    console.log(quizQuestions[questionNum].correctAnswer);
    var mainContent = document.querySelector("#main-content");
    var quizFooter = document.createElement("footer");
    quizFooter.id = "quiz-footer"
    mainContent.appendChild(quizFooter);
    if (answer.id == quizQuestions[questionNum].correctAnswer){
        console.log("Correct!");
        console.log(mainContent);
        quizFooter.textContent = "Correct!";
        questionNum += 1;
        
        nextQuestion();
    }
    
    else {
        console.log("that's the wrong answer");
        questionNum += 1;
        quizFooter.textContent = "Wrong!";
        nextQuestion();
    }
}


startButton.addEventListener("click", startQuiz);