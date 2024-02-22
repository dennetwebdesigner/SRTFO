import fs from "fs";

export function _find_all_team(connection) {
  connection.on("teams/findAll", () => {
    const t = fs.readFileSync("./src/data/Teams.json");
    const response = JSON.parse(t);

    connection.emit("teams/findAll", response);
  });
}

export function _add_team(connection) {
  connection.on("teams/add", (data) => {
    const t = fs.readFileSync("./src/data/Teams.json");
    const response = JSON.parse(t);

    const key = data.name.split(" ").join("_").toLowerCase();

    if (response[key]) {
      connection.emit("teams/add", false);
      return;
    }

    response[key] = data;
    const to_string = JSON.stringify(response);
    fs.writeFileSync("./src/data/Teams.json", to_string);

    const f = fs.readFileSync("./src/data/Teams.json");
    const finish = JSON.parse(f);
    connection.emit("teams/add", finish[key].name == data.name ? true : false);
  });
}

export function _remove_team(connection) {
  connection.on("teams/remove", (data) => {
    const t = fs.readFileSync("./src/data/Teams.json");
    const response = JSON.parse(t);

    const key = data.name.split(" ").join("_").toLowerCase();

    if (!response[key]) {
      connection.emit("teams/remove", false);
      return;
    }

    delete response[key];
    const to_string = JSON.stringify(response);
    fs.writeFileSync("./src/data/Teams.json", to_string);

    const f = fs.readFileSync("./src/data/Teams.json");
    const finish = JSON.parse(f);
    connection.emit("teams/add", !finish[key] ? true : false);
  });
}
