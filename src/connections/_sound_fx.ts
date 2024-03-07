import { socket } from "@/config/socket";
import FXGOL from "../assets/gol.mp3";

export function _sound_goal() {
  socket.on("sound/gol", () => {
    const gol = new Audio(FXGOL);
    gol.play();
  });
}
