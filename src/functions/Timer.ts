export type iTimer = { min: number; sec: number; start: Boolean };

export function resolveSetTimer(timer: iTimer, data: iTimer) {
  timer.min = data.min;
  timer.sec = data.sec;
  timer.start = data.start;
}
