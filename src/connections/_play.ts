import { socket } from "@/config/socket";

export type iTeams = {
  one: {
    name: string;
    score: number;
  };
  two: {
    name: string;
    score: number;
  };
};

export function _info_playing(team: iTeams) {
  socket.emit("info-playing", null);

  socket.on("info-playing", (data: iTeams) => {
    team.one = data.one;
    team.two = data.two;
  });
}

export function _score_change(team: iTeams) {
  socket.on(
    "change-score",
    (data: { one: { score: 0 }; two: { score: 0 } }) => {
      team.one.score = data.one.score;
      team.two.score = data.two.score;
    }
  );
}
