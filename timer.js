let timer = 600;
let timerInterval;
let timerEnabled = true;

function startTimer(){
  clearInterval(timerInterval);
  if(!timerEnabled) return;

  timerInterval = setInterval(()=>{
    if(timer <= 0){
      clearInterval(timerInterval);
      endQuiz();
      return;
    }

    timer--;

    const display = document.getElementById("timerDisplay");
    if(display){
      display.innerText =
        "Time: " +
        Math.floor(timer/60) + ":" +
        (timer%60).toString().padStart(2,'0');
    }
  },1000);
}

function toggleTimer(){
  timerEnabled = !timerEnabled;

  document.getElementById("timerStatus").innerText =
    timerEnabled ? "ON" : "OFF";

  document.getElementById("timerIndicator").style.background =
    timerEnabled ? "green" : "red";
}

function updateTimer(v){
  timer = parseInt(v) * 60;
  document.getElementById("timerVal").innerText = v;
}

function resetTimer(minutes){
  timer = minutes * 60;
}
