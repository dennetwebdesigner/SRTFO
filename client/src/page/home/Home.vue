<style scoped>
@import "./home.css";
</style>

<template>
  <main class="container-obs">
    <section class="placar">
      <img :src="imgLogo" alt="" />
      <article>
        {{ team.one.name }}
        <span>{{ team.one.score }}</span>
      </article>
      <article>VS</article>
      <article>
        <span>{{ team.two.score }}</span>
        {{ team.two.name }}
      </article>
      <div class="timer">
        {{ timer.min < 10 ? `0${timer.min}` : timer.min }}:{{
          timer.sec < 10 ? `0${timer.sec}` : timer.sec
        }}
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { socket } from "../../config/socket";
import { onMounted, reactive } from "vue";
import imgLogo from "@/assets/logo.jpg";
import sounGol from "../../assets/gol.mp3";

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

const timer = reactive({
  min: 0,
  sec: 0,
});

function resolveTimer({ min, sec }: { min: number; sec: number }) {
  timer.min = min;
  timer.sec = sec;
}

socket.on("start-timer", (data: { timer: { min: number; sec: number } }) =>
  resolveTimer(data.timer)
);
socket.on("paused-timer", (data: { timer: { min: number; sec: number } }) =>
  resolveTimer(data.timer)
);
socket.on("reset-timer", (data: { timer: { min: number; sec: number } }) =>
  resolveTimer(data.timer)
);

socket.on("sound-fx", (sound: string) => {
  console.log(sound);
});

onMounted(() => {
  socket.emit("info-playing", null);
  socket.on("info-playing", (data) => {
    console.log(data);
    team.one = data.one;
    team.two = data.two;
  });

  socket.on("change-score", (data) => {
    team.one.score = data.one.score;
    team.two.score = data.two.score;
    const gol = new Audio(sounGol);
    gol.play();
  });
});
</script>
