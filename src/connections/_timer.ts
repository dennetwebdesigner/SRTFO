import { socket } from "@/config/socket";
import { iTimer, resolveSetTimer } from "@/functions/Timer";

export function _timer_toggle(timer: iTimer) {
  if (!timer.start) socket.emit("start-timer", "");
  else socket.emit("paused-timer", "");
}

export function _timer_start(timer: iTimer) {
  socket.on("start-timer", (data: { timer: { min: number; sec: number } }) => {
    resolveSetTimer(timer, { ...data.timer, start: true });
  });
}

export function _timer_paused(timer: iTimer) {
  socket.on("paused-timer", (data: { timer: { min: number; sec: number } }) => {
    resolveSetTimer(timer, { ...data.timer, start: false });
  });
}

export function _timer_reset(timer: iTimer, style: { display: string }) {
  socket.on("reset-timer", (data: { timer: { min: number; sec: number } }) => {
    resolveSetTimer(timer, { ...data.timer, start: false });
    style.display = "none";
  });
}
