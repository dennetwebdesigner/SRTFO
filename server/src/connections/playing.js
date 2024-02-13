import { playing } from "../Servers/Playing";

export function start_play(connection) {
  connection.on("start-play", (dataPlaying) => {
    playing.add_playing(dataPlaying, () => {
      connection.emit("start-play", null);
      connection.broadcast.emit("start-play", null);
    });
  });
}

export function info_playing(connection) {
  connection.on("info-playing", () => {
    const infoPlaying = playing.info_playing();
    if (infoPlaying.one.name && infoPlaying.two.name) {
      connection.emit("info-playing", infoPlaying);
      connection.broadcast.emit("info-playing", infoPlaying);
    }
  });
}

export function change_score(connection) {
  connection.on("change-score", (data) => {
    playing.update_playing(data, (dataUpdated) => {
      connection.emit("change-score", dataUpdated);
      connection.broadcast.emit("change-score", dataUpdated);
    });
  });
}
