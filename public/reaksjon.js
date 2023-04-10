let input = {
  repetitions: () => document.getElementById("repetitions").value,
  minPause: () => document.getElementById("minPause").value,
  maxPause: () => document.getElementById("maxPause").value
}
// const repetitions = () => document.getElementById("repetitions").value;

function updateCount() {
  document.getElementById("repetitions-display").innerHTML = input.repetitions();
  document.getElementById("minPause-display").innerHTML = input.minPause();
  document.getElementById("maxPause-display").innerHTML = input.maxPause();
}

function updateCurrentRepetitionDisplay(currentRepetition) {
  document.getElementById("currentRepetition-display").innerHTML = currentRepetition;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function startBlinking() {
  startBlinkingTimer(
    input.repetitions(),
    0,
    input.minPause(),
    input.maxPause()
  );
}

function blink(element) {
  element.classList.add('blink');
  setTimeout(function () {
    element.classList.remove('blink');
  }, 500);
}

function startBlinkingTimer(repetitions, currentRepetition, minPause, maxPause) {

  let element = document.getElementById("blinker");
  // let randomPauseMs = () => randomIntFromInterval(minPause, maxPause)*1000

  if (currentRepetition < repetitions) {      
    setTimeout(() => {   
        currentRepetition = currentRepetition + 1               
        updateCurrentRepetitionDisplay(currentRepetition)
        blink(element)        
        startBlinkingTimer(repetitions, currentRepetition, minPause, maxPause)
      }, 
      randomIntFromInterval(minPause, maxPause)*1000
      );
  }
}

// Update on load
updateCount()
