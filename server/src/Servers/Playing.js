class Playing {
  constructor() {
    this.one = {
      name: "",
      score: 0,
    };
    this.two = {
      name: "",
      score: 0,
    };
  }

  add_playing(play, callback) {
    this.one.name = play.one;
    this.two.name = play.two;
    callback({
      one: this.one,
      two: this.two,
    });
  }

  info_playing() {
    return { one: this.one, two: this.two };
  }

  update_playing(play, callback) {
    this.one.score = play.one.score;
    this.two.score = play.two.score;
    callback({
      one: { score: this.one.score },
      two: { score: this.two.score },
    });
  }

  remove_playing() {
    this.one = {
      name: "",
      score: 0,
    };
    this.two = {
      name: "",
      score: 0,
    };
  }
}

export const playing = new Playing();
