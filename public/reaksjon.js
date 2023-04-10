let input = {
  repetitions: () => document.getElementById("repetitions"),
  minPause: () => document.getElementById("minPause"),
  maxPause: () => document.getElementById("maxPause")
}

let display = {
  repetitions: () => document.getElementById("repetitions-display"),
  minPause: () => document.getElementById("minPause-display"),
  maxPause: () => document.getElementById("maxPause-display")
}

function updateCount() {
  display.repetitions().innerHTML = input.repetitions().value;
  display.minPause().innerHTML = input.minPause().value;
  display.maxPause().innerHTML = input.maxPause().value;
}

input.repetitions().addEventListener('input', (event) => {
  display.repetitions().innerHTML = event.target.value;
});

input.minPause().addEventListener('input', (event) => {
  display.minPause().innerHTML = event.target.value;
});

input.maxPause().addEventListener('input', (event) => {
  display.maxPause().innerHTML = event.target.value;
});

function updateCurrentRepetitionDisplay(currentRepetition) {
  document.getElementById("currentRepetition-display").innerHTML = currentRepetition;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function startBlinking() {
  startBlinkingTimer(
    input.repetitions().value,
    0,
    input.minPause().value,
    input.maxPause().value
  );
}

function blink(element) {
  element.classList.add('blink');
  setTimeout(function () {
    element.classList.remove('blink');
  }, 500);
}

function blinkFinished(element) {
  setTimeout(function () {
    element.classList.add('finished');
    setTimeout(function () {
      element.classList.remove('finished');
    }, 500);
  }, 1000);
}

function startBlinkingTimer(repetitions, currentRepetition, minPause, maxPause) {

  let element = document.getElementById("blinker");
  let randomPauseMs = () => randomIntFromInterval(minPause, maxPause)*1000

  if (currentRepetition < repetitions) {      
    setTimeout(() => {   
        currentRepetition = currentRepetition + 1               
        updateCurrentRepetitionDisplay(currentRepetition)
        blink(element)        
        startBlinkingTimer(repetitions, currentRepetition, minPause, maxPause)
      }, 
      randomPauseMs()
      );
  } else {
    console.log("Finished!!")
    blinkFinished(document.getElementById("reps"));
  }
}

// Update on load
updateCount()

