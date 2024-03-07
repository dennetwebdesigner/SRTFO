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
import {
  _change_half_time,
  _timer_paused,
  _timer_reset,
  _timer_start,
} from "@/connections/_timer";
import { iTimer } from "@/functions/Timer";
import { _info_playing, _score_change, iTeams } from "@/connections/_play";
import { resolve_img } from "@/functions/play";
import { _sound_goal } from "@/connections/_sound_fx";

// import imgLogo from "@/assets/logo.jpg";

const team = reactive<iTeams>({
  one: {
    name: "",
    score: 0,
  },
  two: {
    name: "",
    score: 0,
  },
});

const timer = reactive<iTimer>({
  min: 0,
  sec: 0,
  start: false,
});

const half = reactive<{ time: number }>({
  time: 1,
});

onMounted(() => {
  _timer_start(timer);
  _timer_paused(timer);
  _timer_reset(timer, {});
  _change_half_time(half);

  _info_playing(team);
  _score_change(team);

  _sound_goal();
});
</script>
