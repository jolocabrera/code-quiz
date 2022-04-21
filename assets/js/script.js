var mainContentHolder = document.querySelector("#card-holder");
var mainContent = document.querySelector("#main-content");
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector(".submit-btn")
var highScoreButton = document.querySelector("#high-score-link");
var questionNum = 0
var score = 0
var timeLeft = 75
var timerDisplay = document.querySelector("#timer-display");
var finalScore = 0
var highScores = [];

// array of questions with their choices and correct answer
var quizQuestions = [
    {
        question: "JavaScript is a ____-side programming language.",
        answers: ["Client", "Server", "Both", "None"],
        correctAnswer: "option2"
    },
    {
        question: "Which of the following will write the message 'Hello Data Flair!' in an alert box?",
        answers: ["alertBox('Hello DataFlair!');", "alert(Hello DataFlair!);", "msgAlert('Hello DataFlair!');", "alert('Hello DataFlair!');"],
        correctAnswer: "option3"
    },
    {
        question: "How do you find the minimum of x and y using JavaScript",
        answers: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
        correctAnswer: "option1"
    },
    {
        question: "Which JavaScript label catches all the values, except for the ones specified?",
        answers: ["catch", "label", "try", "default"],
        correctAnswer: "option3"
    },
    {
        question: "Which is the correct 'if' statements to execute certain code if 'x' is equal to 2?",
        answers: ["if(x 2)", "if(x=2)", "if(x==2)", "if(x!=2"],
        correctAnswer: "option2"
    },
    {
        question: "What will the code return: Boolean(3<7)",
        answers: ["true", "false", "NaN", "SyntaxError"],
        correctAnswer: "option0"
    },
    {
        question: "How can you get the total number of arguments passed to a function?",
        answers: ["Using args.length property", "Using arguments.length property", "Both of the above", "None of the above"],
        correctAnswer: "option1"
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers: ["last()", "put()", "push()", "None of the above"],
        correctAnswer: "option2"
    },
    {
        question: "Which built-in method returns the calling string value converted to upper case?",
        answers: ["toUpperCase()", "toUpper()", "changeCase(case)", "None of the above"],
        correctAnswer: "option0"
    },
    {
        question: "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
        answers: ["charAt()", "charCodeAt()", "concat()", "indexOf()"],
        correctAnswer: "option1"
    }
]


var startQuiz = function () {
    startTimer(60);
    clearPage();
    newContainer();
    nextQuestion();

};

var clearPage = function () {
    //clear page 
    var mainContent = document.getElementById("main-content")
    mainContent.remove();

}

var newContainer = function () {
    //create new quiz question container
    var questionHolder = document.createElement("div");
    questionHolder.className = "col-10 col-md-7 col-lg-5";
    questionHolder.id = "main-content"
    mainContentHolder.appendChild(questionHolder);
}

var startTimer = function (time) {
    timeLeft = time;
    counter = setInterval(timer, 1000);
    function timer() {
        timerDisplay.textContent = "Time Left: " + timeLeft + "s";
        timeLeft --;
        if (timeLeft < 0) {
            clearInterval(counter);
            timerDisplay.textContent = "Time's Up!"
            clearPage();
            newContainer();
            endQuiz();
        };

        // if (questionNum === quizQuestions.length) {
        //     clearInterval(counter);
        //     timerDisplay.textContent = "Time Left: " + timeLeft + "s";
        // };
    };

}




var nextQuestion = function (event) {
    if (questionNum === quizQuestions.length) {
        endQuiz();
    }

    else {
        //id new question container and footer
        var questionHolder = document.getElementById("main-content");
        var quizFooter = document.getElementById("quiz-footer");

        //select next question from the array
        var selectedQuestion = quizQuestions[questionNum];


        //create and append quiz question
        var quizQuestionEl = document.createElement("h1");
        quizQuestionEl.textContent = selectedQuestion.question;
        quizQuestionEl.className = "mb-3"
        questionHolder.insertBefore(quizQuestionEl, quizFooter);

        //create and append quiz answers
        var multipleChoiceList = document.createElement("ul");
        multipleChoiceList.className = "list-unstyled col-11 col-md-9 col-xl-5";
        for (var i = 0; i < selectedQuestion.answers.length; i++) {
            //create var to hold li item
            var quizAnswer = document.createElement("li");

            //create radio button for answers
            var quizAnswerRadio = document.createElement("input")
            quizAnswerRadio.type = "button";
            quizAnswerRadio.name = "answer";
            quizAnswerRadio.value = (i+1) + ". " + selectedQuestion.answers[i];
            quizAnswerRadio.id = "option" + i;
            quizAnswerRadio.className = "btn btn-primary btn-lg mb-2 text-start text-wrap col-12";
            quizAnswerRadio.setAttribute("onclick", "checkAnswer(this)");

            //append button to quizAnswer li item
            quizAnswer.appendChild(quizAnswerRadio);
            

            //append quizAnswer to the multiple choice list
            multipleChoiceList.appendChild(quizAnswer);
        };
        questionHolder.insertBefore(multipleChoiceList, quizFooter);
    }

};



var checkAnswer = function (answer) {
    clearPage();
    newContainer();
    var mainContent = document.querySelector("#main-content");
    var quizFooter = document.createElement("footer");
    quizFooter.id = "quiz-footer"
    quizFooter.className = "border-top border-dark fs-2 fst-italic text-muted mt-2"
    mainContent.appendChild(quizFooter);
    if (answer.id == quizQuestions[questionNum].correctAnswer) {
        quizFooter.textContent = "Correct!";
        questionNum += 1;
        score += 1

        nextQuestion();
    }

    else {
        questionNum += 1;
        quizFooter.textContent = "Wrong!";
        nextQuestion();
    }
}
var highScoreForm = function (event) {
    var mainContent = document.getElementById("main-content");
    var quizFooter = document.getElementById("quiz-footer");

    //create div to hold initials entry form
    var formHighScore = document.createElement("form");
    formHighScore.id = "high-score-form";

    //"Enter initials text before input form"
    var spanHighScore = document.createElement("span");
    spanHighScore.textContent = "Enter initials: "
    spanHighScore.className = "d-inline mx-1"
    formHighScore.appendChild(spanHighScore);

    //user input form for initials
    var enterHighScoreContainer = document.createElement("div");
    enterHighScoreContainer.className = "form-group d-inline mx-1";
    var enterHighScore = document.createElement("input")
    enterHighScore.type = "text";
    enterHighScore.name = "initials";
    enterHighScore.className = "rounded"
    enterHighScoreContainer.appendChild(enterHighScore);
    formHighScore.appendChild(enterHighScoreContainer);

    //submit button for initials
    var submitHighScoreContainer = document.createElement("div");
    submitHighScoreContainer.className = "form-group d-inline mx-1"
    var submitHighScore = document.createElement("button");
    submitHighScore.className = "btn btn-primary rounded"
    submitHighScore.id = "submit-high-score"
    submitHighScore.type = "button"
    submitHighScore.textContent = "Submit!"
    submitHighScoreContainer.appendChild(submitHighScore);
    formHighScore.appendChild(submitHighScoreContainer);


    //append form to mainContent
    mainContent.insertBefore(formHighScore, quizFooter);
}

var highScoreSubmit = function (event) {
    event.preventDefault();
    //get user input values
    var initialsInput = document.querySelector("input[name='initials']").value;

    //input validation
    if (!initialsInput) {
        alert("Please enter your initials into the form!");
        return false;
    }

    //create object to store high score
    var highScoreObj = {
        initials: initialsInput,
        points: finalScore,
    };

    //store high scores in array
    highScores.push(highScoreObj);

    //sort scores from highest to lowest
    sortScores();

    //save high scores to local storage
    localStorage.setItem("highscores", JSON.stringify(highScores));

    //high score page
    highScorePage();

};

var highScorePage = function () {
    clearPage();
    newContainer();
    var mainContent = document.getElementById("main-content");
    
    //create high score header
    var highScoreHeader = document.createElement("h1");
    highScoreHeader.textContent = "High Scores"
    mainContent.appendChild(highScoreHeader);
    
    //create high score list
    var highScoreList = document.createElement("ul");
    highScoreList.className = "list-unstyled col-6"
    highScoreList.id = "high-score-list";
    
    //pull high scores from local storage and append them to the list
    for (var i = 0; i < highScores.length; i++) {
        var highScoreListItem = document.createElement("li");
        highScoreListItem.className = "high-score-list-item bg-primary bg-opacity-50 mb-2 p-1";
        highScoreListItem.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].points
        highScoreList.appendChild(highScoreListItem);
    }
    mainContent.appendChild(highScoreList);
    
    //create div to hold go back button and clear high scores button
    var buttonContainer = document.createElement("div");
    
    
    //create go back button
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go back";
    goBackButton.className = "btn btn-primary me-1"
    
    buttonContainer.appendChild(goBackButton);
    
    //create clear high scores button
    var clearScoresButton = document.createElement("button");
    clearScoresButton.textContent = "Clear High Scores"
    clearScoresButton.className = "btn btn-danger ms-1"
    buttonContainer.appendChild(clearScoresButton);
    
    mainContent.appendChild(buttonContainer);
    goBackButton.addEventListener("click", goHome);
    clearScoresButton.addEventListener("click", clearScores);
    
    
    clearInterval(counter);
};

var loadHighScores = function () {
    // get scores from local storage
    var savedScores = localStorage.getItem("highscores")

    if (!savedScores) {
        highScores = [];
        return false;
    }

    savedScores = JSON.parse(savedScores);

    for (i = 0; i < savedScores.length; i++) {
        highScores.push(savedScores[i]);
    }

}

var goHome = function () {
    clearPage();
    homePage();

}

var resetStats = function () {
    questionNum = 0;
    score = 0;
}

var homePage = function () {
    resetStats();
    timerDisplay.textContent = "Time Left: "
    newContainer();
    var mainContent = document.getElementById("main-content");

    //create home page header
    var homePageHeader = document.createElement("h1");
    homePageHeader.textContent = "Coding Quiz Challenge";
    homePageHeader.className = "d-flex col-12 justify-content-center";
    homePageHeader.id = "home-page-title";
    mainContent.appendChild(homePageHeader);

    //create home page description
    var homePageDescription = document.createElement("p");
    homePageDescription.id = "home-page-description";
    homePageDescription.className = "d-flex-inline col-12 text-center fw-bold";
    homePageDescription.textContent = "You will have 1 minute to answer these ten questions on Javascript Fundamentals.  Your score will be the time you have left multiplied by the number of correct answers you have. Good luck!"
    mainContent.appendChild(homePageDescription);


    //create start quiz button container
    var quizButtonContainer = document.createElement("div");
    quizButtonContainer.className = "text-center"
    //create start quiz button
    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Begin Quiz!";
    startQuizButton.id = "start-btn";
    startQuizButton.type = "button";
    startQuizButton.className = "btn btn-primary btn-lg"
    quizButtonContainer.appendChild(startQuizButton);
    mainContent.appendChild(quizButtonContainer);

    var startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", startQuiz);

}

var sortScores = function () {
    highScores.sort(function (a, b) {
        return a.points - b.points;
    });
    highScores.reverse();
}

var clearScores = function () {
    highScores = [];
    localStorage.setItem("highscores", JSON.stringify(highScores));
    var highScoreList = document.querySelector("#high-score-list");
    highScoreList.remove();


}

var endQuiz = function () {
    clearInterval(counter);
    var mainContent = document.getElementById("main-content");
    var quizFooter = document.getElementById("quiz-footer");
    //calculate final score
    finalScore = score * timeLeft

    // create and insert final message
    var finalMessage = document.createElement("h2");
    finalMessage.textContent = "You're All Done!"
    mainContent.insertBefore(finalMessage, quizFooter);

    // create and insert final score
    var correctAnswersMsg = document.createElement("p");
    correctAnswersMsg.textContent = "You answered " + score + " questions correctly!";
    mainContent.insertBefore(correctAnswersMsg, quizFooter);

    var finalScoreMsg = document.createElement("p");
    finalScoreMsg.textContent = "Your final score is " + finalScore + "."
    mainContent.insertBefore(finalScoreMsg, quizFooter);

    //create highscore form
    highScoreForm();

    // add event listener to form button

    var submitHighScoreButton = document.getElementById("submit-high-score");
    submitHighScoreButton.addEventListener("click", highScoreSubmit);

};

loadHighScores();

highScoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    highScorePage();
});

startButton.addEventListener("click", startQuiz);
