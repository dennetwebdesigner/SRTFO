<style scoped>
@import "./admin.css";
</style>

<template>
  <modalResetTimer
    :style="style"
    v-on:modal-close="(e) => (style.display = e)"
  />
  <main class="container-admin">
    <ScoreBoard :teams="teams" />
    <Changescore :teams="teams" />

    <section class="timer">
      <h2>Timer</h2>
      <div>{{ timer.min }} : {{ timer.sec }}</div>
      <button @click="() => _timer_toggle(timer)">
        <span v-if="!timer.start">Iniciar</span>
        <span v-else>Pausar</span>
      </button>
      <button @click="askReset">
        <span>resetar</span>
      </button>
    </section>

    <section class="sound-fx">
      <h2>Efeitos Sonoros</h2>
      <button>gol</button>
      <button>patr1</button>
      <button>patr2</button>
      <button>patr3</button>
      <button>patr4</button>
      <button>patr5</button>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import ScoreBoard from "@/components/admin/Scoreboard.vue";
import modalResetTimer from "@/components/modals/modalResetTimer.vue";
import Changescore from "@/components/admin/Changescore.vue";
import { socket } from "@/config/socket";
import {
  _timer_start,
  _timer_paused,
  _timer_reset,
  _timer_toggle,
} from "@/connections/_timer";
const teams = reactive<{
  one: {
    name: string;
    score: number;
  };
  two: {
    name: string;
    score: number;
  };
}>({
  one: {
    name: "",
    score: 0,
  },
  two: {
    name: "",
    score: 0,
  },
});

const style = reactive({
  display: "none",
});

const timer = reactive<{ min: number; sec: number; start: Boolean }>({
  min: 0,
  sec: 0,
  start: false,
});

function askReset() {
  style.display = "flex";
}

onMounted(() => {
  socket.emit("info-playing", null);

  socket.on("info-playing", (data) => {
    if (teams.one.name == "" || teams.two.name == "") {
      teams.one = data.one;
      teams.two = data.two;
    }
  });

  socket.on("change-score", (data) => {
    teams.one.score = data.one.score;
    teams.two.score = data.two.score;
  });

  _timer_start(timer);
  _timer_paused(timer);
  _timer_reset(timer, style);
});
</script>
