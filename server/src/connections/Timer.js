import { pauseTimer, resetTimer, setTimer, timer } from "../Servers/timer";

export function _start_timer(connection) {
  connection.on("start-timer", () => {
    setTimer(() => {
      connection.emit("start-timer", { timer });
      connection.broadcast.emit("start-timer", { timer });
    });
  });
}

export function _paused_timer(connection) {
  connection.on("paused-timer", () => {
    pauseTimer(() => {
      connection.emit("paused-timer", { timer });
      connection.broadcast.emit("paused-timer", { timer });
    });
  });
}

export function _reset_timer(connection) {
  connection.on("reset-timer", () => {
    resetTimer(() => {
      connection.emit("reset-timer", { timer });
      connection.broadcast.emit("reset-timer", { timer });
    });
  });
}
