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
      <h2>Temporizador</h2>
      <div>{{ timer.min }} : {{ timer.sec }}</div>
      <button @click="() => _timer_toggle(timer)">
        <span v-if="!timer.start">Iniciar</span>
        <span v-else>Pausar</span>
      </button>
      <button @click="askReset">
        <span>resetar</span>
      </button>
    </section>
    <div class="opt-temp">
      <button @click="start_goal_sound">GOL</button>
      <router-link to="/admin" class="back">Voltar Menu</router-link>
    </div>
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

function start_goal_sound() {
  socket.emit("sound/gol", null);
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
