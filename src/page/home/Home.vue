<style scoped>
@import "./home.css";
</style>

<template>
  <main class="container-obs">
    <section class="placar-home">
      <article class="team-one">
        <img :src="resolve_img(team.one.name)" alt="" />
        {{ team.one.name }}
        <span>{{ team.one.score }}</span>
      </article>
      <article>VS</article>
      <article class="team-two">
        <span>{{ team.two.score }}</span>
        {{ team.two.name }}
        <img :src="resolve_img(team.two.name)" alt="" />
      </article>

      <!-- <div class="half">
       
      </div> -->

      <div class="timer">
        <p class="half">{{ half.time }}º</p>
        <p>
          {{ timer.min < 10 ? `0${timer.min}` : timer.min }}:{{
            timer.sec < 10 ? `0${timer.sec}` : timer.sec
          }}
        </p>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { socket } from "../../config/socket";
import { onMounted, reactive } from "vue";
import FXGOL from "../../assets/gol.mp3";
import {
  _timer_paused,
  _timer_reset,
  _timer_start,
} from "@/connections/_timer";
import { iTimer } from "@/functions/Timer";

// import imgLogo from "@/assets/logo.jpg";

const team = reactive({
  one: {
    name: "",
    score: 0,
  },
  two: {
    name: "",
    score: 0,
  },
});

const storage = reactive<any>(
  `${import.meta.env.VITE_HOST_SERVER}static/teams/`
);
const timer = reactive<iTimer>({
  min: 0,
  sec: 0,
  start: false,
});

const half = reactive<{ time: number }>({
  time: 1,
});

function resolve_img(name: string) {
  const key = name.split(" ").join("_").toLowerCase();
  return storage + key + ".png";
}

onMounted(() => {
  _timer_start(timer);
  _timer_paused(timer);
  _timer_reset(timer, {});

  socket.emit("info-playing", null);

  socket.on("info-playing", (data) => {
    team.one = data.one;
    team.two = data.two;
  });

  socket.on("change-score", (data) => {
    team.one.score = data.one.score;
    team.two.score = data.two.score;
  });

  socket.on("sound/gol", () => {
    const gol = new Audio(FXGOL);
    gol.play();
  });
  socket.on("time/change", (data) => {
    half.time = data;
  });
});
</script>
