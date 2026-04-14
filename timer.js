let timer = 600;
let timerInterval;
let timerEnabled = true;

function startTimer() {
  clearInterval(timerInterval);
  if (!timerEnabled) return;

  timerInterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timerInterval);
      endQuiz();
      return;
    }

    timer--;

    document.getElementById("timerDisplay").innerText =
      "Time: " +
      Math.floor(timer / 60) +
      ":" +
      (timer % 60).toString().padStart(2, "0");
  }, 1000);
}

function resetTimer(minutes) {
  timer = minutes * 60;
}

function toggleTimer() {
  timerEnabled = !timerEnabled;

  document.getElementById("timerStatus").innerText =
    timerEnabled ? "ON" : "OFF";

  document.getElementById("timerIndicator").style.background =
    timerEnabled ? "green" : "red";
}

function updateTimer(value) {
  resetTimer(parseInt(value));
  document.getElementById("timerVal").innerText = value;
}
