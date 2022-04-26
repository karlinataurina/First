const handleQuestionClick = (entryQuestion, entryAnswer) => {
    handleHideOtherQuestions(entryAnswer);

    handleOpenQuestion(entryQuestion);
    handleOpenAnswer(entryAnswer);
};

const getAllAnswers = () => {
    return document.querySelectorAll("#faq .question-container .answer");
};

const getAllQuestions = () => {
    return document.querySelectorAll(
        "#faq .question-container .question"
    );
}

const openAll = () => {
    const answers = getAllAnswers();
    const questions = getAllQuestions()
    console.log(answers);
    answers.forEach((answer) => {
        // answer.style.maxHeight = "initial";
        answer.classList.remove("answer-hidden");
    });

    questions.forEach((q) => {
        q.classList.add("bottom");
    });
};

const closeAll = () => {
    const answers = getAllAnswers();
    const questions = getAllQuestions()
    answers.forEach((answer) => {
        answer.classList.add("answer-hidden");
    });
    questions.forEach((question) => {
        question.classList.remove("bottom");
        question.classList.add("right");
    });
};

const targetQ = document.getElementById("faq");
const buttonToggleAll = document.getElementById("toggle-all");

let stateOfToggle = "closed";

buttonToggleAll.onclick = function () {
    if (stateOfToggle === "closed") {
        openAll();
        stateOfToggle = "opened";
        buttonToggleAll.innerHTML = "Close all questions";
    } else if (stateOfToggle === "opened") {
        closeAll();
        stateOfToggle = "closed";
        buttonToggleAll.innerHTML = "Open all questions";
    }
};

/* HELPER FUNCTIONS */

// Toggle CSS class to show question in HTML
const handleOpenQuestion = (entryQuestion) => {
    // Toggle off className right
    entryQuestion.classList.toggle("right");

    // Toggle on className bottom
    entryQuestion.classList.toggle("bottom");
};

const handleOpenAnswer = (entryAnswer) => {
    // Toggle off className answer-hidden
    entryAnswer.classList.toggle("answer-hidden");
};

/**
 * Find Questions in DOM
 * Toggle class names to make them closed
 */
const handleHideOtherQuestions = (currentAnswer) => {
    const answers = document.querySelectorAll("#faq .question-container");

    answers.forEach((questionContainer) => {
        const question = questionContainer.querySelector(".question");
        const answer = questionContainer.querySelector(".answer");

        // Skip if answer is the current answer
        if (currentAnswer === answer) {
            return;
        }

        // Add answer-hidden to all other answers
        question.classList.remove("bottom");
        question.classList.add("right");
        answer.classList.add("answer-hidden");
    });
};

const getAnswerContainer = (entryQuestion, entryAnswer) => {
    const entryContainer = document.createElement("div");
    entryContainer.className = "question-container";

    entryContainer.append(entryQuestion);
    entryContainer.append(entryAnswer);

    return entryContainer;
};

const getFaqListContainer = () => {
    // Create pseudocontainer,
    // that does not exist in DOM yet for more performant entry append after we have generated all necessary HTML
    return document.createElement("div");
};

const getEntryAnswer = (answer) => {
    const answerElement = document.createElement("div");
    answerElement.className = "answer answer-hidden";
    answerElement.innerHTML = answer;

    return answerElement;
};

const getEntryQuestion = (question) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question chevron right question-interactive";
    questionElement.innerHTML = question;

    return questionElement;
};

const faqList = () => {
    const faqData = [
        {
            question: ` What is a vegan?`,
            answer: `<p>Vegans avoid eating all foods of animal origin: meat, fish, dairy products, eggs, and honey. Veganism was originally defined purely as a dietary choice, but many vegans extend this ethic to shun animal testing and ingredients from all things they consume or wear, including clothing, shoes, personal care items, cosmetics, and medicine.</p>`,
        },
        {
            question: ` Why do people become vegan?`,
            answer: `<p>1) Prevention of Animal Suffering<br>
              Most farm animals are raised on factory farms and experience appalling cruelties throughout
              their lives. Animal slaughter is invariably gory and disturbing to witness, and often the
              animals are clearly frightened and seem to know their death is imminent.</p>
  
          <p>2) Health Benefits<br>
              A vegan diet can eliminate many of your diet's most unhealthful foods, replacing them with
              delicious, nutrient-rich fruits and vegetables, whole grains, beans, and nuts.</p>
  
          <p>3) Environmental Advantages<br>
              Given the staggering amounts of methane produced by livestock, a vegan diet may offer the
              easiest and most effective way to reduce our contribution to climate change. Vegan diets can
              also dramatically reduce land devoted to crops and to pasture, since growing food for farmed
              animals is extraordinarily wasteful compared to growing crops directly for people.</p>`,
        },
        {
            question: ` How hard is it really to become vegan?`,
            answer: `<p>Nearly every single vegan you ask will tell you the transition was much easier than they
              expected. While becoming vegan may sound difficult right now, you'll no doubt be shocked by how
              easy this is.</p>`,
        },
    ];

    /*
      --- BY USING document.createElement WE WOULD LIKE TO RE-CREATE BASIC QA STRUCTURE:
      <div class="question-container">
          <div class="question">QUESTION</div>
          <div class="answer">ANSWER</div>
      </div>
      */
    const faqContainer = getFaqListContainer();

    faqData.forEach((faqEntry) => {
        const { question, answer } = faqEntry;

        const entryAnswer = getEntryAnswer(answer);
        const entryQuestion = getEntryQuestion(question);

        // Add question click
        entryQuestion.onclick = () => {
            handleQuestionClick(entryQuestion, entryAnswer);
        };

        //Add question and answer elements to container:
        const entryContainer = getAnswerContainer(entryQuestion, entryAnswer);

        faqContainer.append(entryContainer);
    });

    // Get the main container from DOM that we will be operating in.
    const faqElement = document.getElementById("faq");
    faqElement.innerHTML = "";

    faqElement.append(faqContainer);
};

faqList();