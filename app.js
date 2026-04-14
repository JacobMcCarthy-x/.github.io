const home = document.getElementById("home");
const quizSetup = document.getElementById("quizSetup");
const quiz = document.getElementById("quiz");
const review = document.getElementById("review");

const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const reviewList = document.getElementById("reviewList");
const progressDisplay = document.getElementById("progressDisplay");
const qCount = document.getElementById("qCount");

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let totalQuestions = 10;
let incorrectAnswers = [];

let totalAnswered = 0;
let totalCorrect = 0;

function goHome(){
  review.style.display="none";
  quiz.style.display="none";
  quizSetup.style.display="none";
  home.style.display="block";
}

function openQuizSetup(){
  home.style.display="none";
  quizSetup.style.display="block";
}

function updateQCount(v){
  totalQuestions = parseInt(v);
  qCount.innerText = v;
}

function startQuiz(){
  quizSetup.style.display="none";
  quiz.style.display="block";

  currentIndex = 0;
  score = 0;
  incorrectAnswers = [];

  resetTimer(parseInt(document.getElementById("timerVal").innerText));

  shuffledQuestions = [...A1QuizData].sort(() => Math.random() - 0.5);

  startTimer();
  loadQuestion();
}

function loadQuestion(){
  if(currentIndex >= totalQuestions || currentIndex >= shuffledQuestions.length){
    endQuiz();
    return;
  }

  const q = shuffledQuestions[currentIndex];

  progressDisplay.innerText = `Question ${currentIndex+1} of ${totalQuestions}`;
  questionText.innerText = q.q;

  answers.innerHTML = "";

  q.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, opt, q);
    answers.appendChild(btn);
  });
}

function checkAnswer(btn, ans, q){
  totalAnswered++;

  document.querySelectorAll("#answers button").forEach(b => b.disabled = true);

  if(ans === q.correct){
    btn.classList.add("correct");
    score++;
    totalCorrect++;
  } else {
    btn.classList.add("incorrect");

    document.querySelectorAll("#answers button").forEach(b => {
      if(b.innerText === q.correct) b.classList.add("correct");
    });

    incorrectAnswers.push({question:q, selected:ans});
  }

  setTimeout(() => {
    currentIndex++;
    loadQuestion();
  }, 1000);
}

function endQuiz(){
  clearInterval(timerInterval);

  quiz.style.display="none";
  review.style.display="block";

  const total = Math.min(totalQuestions, shuffledQuestions.length);
  const percent = ((score / total) * 100).toFixed(1);

  reviewList.innerHTML = `<p>Score: ${score}/${total} (${percent}%)</p>`;

  incorrectAnswers.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    let html = `<p>${item.question.q}</p>`;

    item.question.options.forEach(opt => {
      if(opt === item.question.correct){
        html += `<div class='correct'>${opt}</div>`;
      } else if(opt === item.selected){
        html += `<div class='incorrect'>${opt}</div>`;
      } else {
        html += `<div>${opt}</div>`;
      }
    });

    div.innerHTML = html;
    reviewList.appendChild(div);
  });
}

function toggleStatsBar(){
  const bar = document.getElementById("statsBar");
  bar.style.display = bar.style.display === "none" ? "block" : "none";

  const accuracy = totalAnswered
    ? ((totalCorrect / totalAnswered) * 100).toFixed(1)
    : 0;

  document.getElementById("statAnswers").innerText = "Answers Completed: " + totalAnswered;
  document.getElementById("statCorrect").innerText = "Answers Correct: " + totalCorrect;
  document.getElementById("statPercent").innerText = "Accuracy: " + accuracy + "%";
}

function startMode(){
  alert("Not built yet");
}

window.onload = goHome;
