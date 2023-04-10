let punch = new Audio('punch-sound-effect.mp3'); // 0:01 sec
let ding = new Audio('ding-sound-effect.mp3'); // 0:04 sec

let input = {
  repetitions: () => document.getElementById("repetitions"),
  minPause: () => document.getElementById("minPause"),
  maxDuration: () => document.getElementById("maxDuration")
}

let display = {
  repetitions: () => document.getElementById("repetitions-display"),
  minPause: () => document.getElementById("minPause-display"),
  maxDuration: () => document.getElementById("maxDuration-display")
}

input.repetitions().addEventListener('input', (event) => {
  display.repetitions().innerHTML = event.target.value;
  updateCurrentRepetitionDisplay(0)
});

input.minPause().addEventListener('input', (event) => {
  display.minPause().innerHTML = event.target.value;
});

input.maxDuration().addEventListener('input', (event) => {
  display.maxDuration().innerHTML = event.target.value;
});

function updateCurrentRepetitionDisplay(currentRepetition) {
  document.getElementById("currentRepetition-display").innerHTML = currentRepetition;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function playBlinkSound () {
	punch.play();
}

function playStartedSound () {
	ding.play();
}

function playFinishedSound () {
	ding.play();
}

function startBlinking() {
  playStartedSound();
  updateCurrentRepetitionDisplay(0)
  startBlinkingTimer(
    input.repetitions().value,
    0,
    input.minPause().value,
    input.maxDuration().value
  );
}

function blink(element) {
  element.classList.add('blink');
  setTimeout(function () {
    playBlinkSound()    
  }, 400);
  setTimeout(function () {
    element.classList.remove('blink');
    playBlinkSound()    
  }, 500);
}

function finished() {
  let element = document.getElementById("reps")
  setTimeout(function () {
    element.classList.add('finished');
    playFinishedSound()
    setTimeout(function () {
      element.classList.remove('finished');
    }, 500);
  }, 1000);
}

function startBlinkingTimer(repetitions, currentRepetition, minPause, maxDuration) {

  let element = document.getElementById("blinker");
  let randomPauseMs = () => minPause*1000 + randomIntFromInterval(0, maxDuration*1000)

  if (currentRepetition < repetitions) {   
    const durationPause = randomPauseMs();   
    setTimeout(() => {           
        currentRepetition = currentRepetition + 1
        console.log("Repetition: " + currentRepetition + ". Random pause: " + durationPause)        
        updateCurrentRepetitionDisplay(currentRepetition)
        blink(element)    
        startBlinkingTimer(repetitions, currentRepetition, minPause, maxDuration)
      }, 
      durationPause
      );
  } else {
    finished();
  }
}

function init() {
  punch.preload = "auto"
  ding.preload = "auto"

  display.repetitions().innerHTML = input.repetitions().value;
  display.minPause().innerHTML = input.minPause().value;
  display.maxDuration().innerHTML = input.maxDuration().value;
}


init()

