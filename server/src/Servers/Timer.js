let timerinterv = null;
export let timer = {
  min: 0,
  sec: 0,
};

export function setTimer(callback) {
  timerinterv = setInterval(() => {
    if (timer.sec >= 59) {
      timer.min++;
      timer.sec = 0;
    }
    timer.sec++;
    callback();
  }, 1000);
}

export function pauseTimer(callback) {
  clearInterval(timerinterv);
  callback();
}

export function resetTimer(callback) {
  clearInterval(timerinterv);
  timer = {
    min: 0,
    sec: 0,
  };
  callback();
}
