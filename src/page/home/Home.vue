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
const timer = reactive({
  min: 0,
  sec: 0,
});

const half = reactive<{ time: number }>({
  time: 1,
});

function resolve_img(name: string) {
  const key = name.split(" ").join("_").toLowerCase();
  console.log(storage + key + ".png");
  return storage + key + ".png";
}

onMounted(() => {
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
