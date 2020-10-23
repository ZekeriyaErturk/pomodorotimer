const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const start = document.querySelector(".btn-start");
const pause = document.querySelector(".btn-pause");
const stop = document.querySelector(".btn-stop");
const breakIndicator = document.querySelector(".break");
const pomodoroIndicator = document.querySelector(".pomodoro");

const RESET_MINUTES = 25;
const RESET_SECONDS = 0;
let clearID;
let minute = 25;
let second = 0;
let pomodoroCounter = 1;
let breakTime = false;

// Button Handlers
const handleStart = () => {
  ticker();
  start.setAttribute("disabled", true);
  pause.removeAttribute("disabled");
  stop.removeAttribute("disabled");
};

const handlePause = () => {
  minutes.innerText = minute < 10 ? `0${minute}` : minute;
  seconds.innerText = second < 10 ? `0${second}` : second;
  start.removeAttribute("disabled");
  clearInterval(clearID);
};

const handleStop = () => {
  start.removeAttribute("disabled");
  pause.setAttribute("disabled", true);
  stop.setAttribute("disabled", true);
  clear();
};

const breaker = () => {
  minute = 5;
  second = 0;
  minutes.innerText = `0${minute}`;
  seconds.innerText = `0${second}`;
};

const changeTime = () => {
  if (second === 0) {
    second = 59;
    seconds.innerText = second;
    minute = minute - 1;
    minute < 10
      ? (minutes.innerText = `0${minute}`)
      : (minutes.innerText = minute);
  } else {
    second = second - 1;
    second < 10
      ? (seconds.innerText = `0${second}`)
      : (seconds.innerText = second);
  }
};

const ticker = () => {
  changeTime();
  clearID = setInterval(() => {
    changeTime();

    if (minute === 0 && second === 0) {
      clear();
      start.removeAttribute("disabled");
      pause.setAttribute("disabled", true);
      stop.setAttribute("disabled", true);
      pomodoroCounter++;
      pomodoroIndicator.innerText = pomodoroCounter;
    }
  }, 1000);
};

const clear = () => {
  clearInterval(clearID);
  minutes.innerText = "25";
  seconds.innerText = "00";
  minute = RESET_MINUTES;
  second = RESET_SECONDS;
};

// Event Listeners
start.addEventListener("click", handleStart);
pause.addEventListener("click", handlePause);
stop.addEventListener("click", handleStop);
pomodoroIndicator.addEventListener("click", () => {
  pomodoroCounter = 1;
  pomodoroIndicator.innerText = pomodoroCounter;
});
