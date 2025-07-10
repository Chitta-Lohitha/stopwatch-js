let hours = 0, minutes = 0, seconds = 0;
let interval = null;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const beep = document.getElementById("beep");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.textContent = `${h}:${m}:${s}`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      seconds++;
      beep.play();
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      updateDisplay();
    }, 1000);
  }
}

function stopStopwatch() {
  clearInterval(interval);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(interval);
  isRunning = false;
  hours = minutes = seconds = 0;
  updateDisplay();
}

function recordLap() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  const lapTime = `${h}:${m}:${s}`;

  const li = document.createElement("li");
  li.textContent = `Lap: ${lapTime}`;
  laps.appendChild(li);

  let storedLaps = JSON.parse(localStorage.getItem("lapHistory")) || [];
  storedLaps.push(lapTime);
  localStorage.setItem("lapHistory", JSON.stringify(storedLaps));
}

function clearLaps() {
  laps.innerHTML = "";
  localStorage.removeItem("lapHistory");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

window.onload = () => {
  let storedLaps = JSON.parse(localStorage.getItem("lapHistory")) || [];
  storedLaps.forEach((lap) => {
    const li = document.createElement("li");
    li.textContent = `Lap: ${lap}`;
    laps.appendChild(li);
  });
  updateDisplay();
};
