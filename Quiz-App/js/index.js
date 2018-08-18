var questionNum = 0;
var correctAnswers = 0;

const questions = [
  {
    number: 1,
    question: `What region do Tolkien's stories take place in?`,
    answer1: `Alderaan`,
    answer2: `Middle-Earth`,
    answer3: `Arakis`,
    answer4: `Rohan`,
    answer: `Middle-Earth`,
  },
  {
    number: 2,
    question: `Frodo is a Baggins of __?`,
    answer1: `Mordor`,
    answer2: `Minas Tirith`,
    answer3: `Hobbit`,
    answer4: `Bag-End`,
    answer: `Bag-End`,
  },
  {
    number: 3,
    question: `Gandalf recommends Bilbo to accompany a group of dwarves for his skills as a __?`,
    answer1: `Burglar`,
    answer2: `Swordsman`,
    answer3: `Cook`,
    answer4: `Gardener`,
    answer: `Burglar`,
  },
  {
    number: 4,
    question: `Aragorn is destined to be king of what realm?`,
    answer1: `Rohan`,
    answer2: `Gondor`,
    answer3: `The Shire`,
    answer4: `Moria`,
    answer: `Gondor`,
  },
  {
    number: 5,
    question: `When Gandalf frees King Theoden from Saruman's grasp, he reveals himself as what?`,
    answer1:`Gandalf the Gray`,
    answer2: `He-Who-Must-Not-Be-Named`,
    answer3: `The magician`,
    answer4: `Gandalf the White`,
    answer: `Gandalf the White`,
  },
  {
    number: 6,  
    question: `Legolas originates from what elvish realm?`,
    answer1: `Rivendell`,
    answer2:`Woodland`,
    answer3: `Lothlorien`,
    answer4: `Isengard`,
    answer: `Woodland`,
  },
  {
    number: 7,
    question: `Who defeated Sauron at the battle of Dagorlad?`,
    answer1: `Aragorn`,
    answer2: `Frodo`,
    answer3: `Dumbledore`,
    answer4: `Isildur`,
    answer: `Isildur`,
  },
  {
    number: 8,
    question: `The One ring has the power to render the wearer__?`,
    answer1: `Invisible`,
    answer2: `Invincible`,
    answer3: `Increase or decrease in size`,
    answer4: `Move backwards in time`,
    answer: `Invisible`,
  },
  {
    number: 9,
    question: `Who saved Thorin and his party of dwarves from the clutches of the Great Goblin in the Misty Mountains?`,
    answer1: `Bilbo`,
    answer2: `Legolas`,
    answer3: `Radagast`,
    answer4: `Gandalf`,
    answer: `Gandalf`,
  },
  {
    number: 10,
    question: `Gollum is also known by which name?`,
    answer1: `Smeagol`,
    answer2: `Grima`,
    answer3: `My precious`,
    answer4: `Radagast`,
    answer: `Smeagol`,
  },
]

// const answers = [
//    `Middle-Earth`,
//    `Bag-End`,
//    `Burgalur`,
//    `Gondor`,
//    `Gandalf the White`,
//    `Woodland`,
//    `Isildur`,
//    `Invisible`,
//    `Gandalf`,
//    `Smeagol`,
// ]

function generateQuestion(correctAnswers, question, questionsAnswered) {
  return `
    <div class="question-page" role="main">
    <h2 id="question">${questions[questionNum].question}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" value="${questions[questionNum].answer1}" name="option" checked></input>
          <span>${questions[questionNum].answer1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" value="${questions[questionNum].answer2}" name="option"></input>
          <span>${questions[questionNum].answer2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" value="${questions[questionNum].answer3}" name="option"></input>
          <span>${questions[questionNum].answer3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" value="${questions[questionNum].answer4}" name="option"></input>
          <span>${questions[questionNum].answer4}</span>
        </label>
      </fieldset>  
      <button class="submitButton">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${questions[questionNum].number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function startQuizButton() {
  $('.startButton').click(function(event) {
    nextQuestion();
  });
}

function submitButton() {
      $('main').on('click', '.submitButton', function(event) {
        event.preventDefault();

        const answer = $('input:checked').val();

        const userIsCorrect = checkUserAnswer(answer);

        if (userIsCorrect) {
            console.log("correct");
            generateCorrectFeedback();
        } else {
            console.log("incorrect");
            generateIncorrectFeedback();
        }
      });
    }
   
function checkUserAnswer(answer) {
    if(answer === questions[questionNum].answer) {
        return true;
    } else {
        return false;
    };
}
    
function nextButton() {
  $('main').on('click', '.nextButton', function(event) {
    
    if (questionNum === 10) {
        createResultsPage(correctAnswers);
    } else {
        iterateQuestion();
        nextQuestion();
    }
  });
}

function restartButton() {
  $('main').on('click', '.restartButton', function(event) {

    questionNum = 0;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questions[questionNum - 1];

  const questionsAnswered = questionNum;

  $('main').html(generateQuestion(correctAnswers, question, questionsAnswered));
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Great Job! You're answer is Correct!</h2>
    <img src="https://media.giphy.com/media/zGnnFpOB1OjMQ/giphy.gif" alt="hobbits applauding">
    <button type="button" class="nextButton">Next</button>
  </section>
`;

function generateCorrectFeedback() {
  $('main').html(correctFeedback);
  iterateCorrectAnswers();
}

function generateIncorrectFeedback() {
  $('main').html(incorrectFeedbackTemplate(questionNum));
    
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Sorry, you're answer was incorrect. The correct answer was ${questions[questionNum].answer}!</h2>
      <img src="https://i0.wp.com/gifrific.com/wp-content/uploads/2017/11/you-shall-not-pass-gandalf-lotr.gif?ssl=1" alt="Gandalf stopping you from crossing the bridge">
      <button type="button" class="nextButton">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('main').html(`
    <div class="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button type="submit" class="restartButton">Try Again?</button>
    </section>
  `);
}

function allButtons() {
  startQuizButton();
  submitButton();
  nextButton();
  restartButton();
}

allButtons();





