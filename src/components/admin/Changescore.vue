<style>
@import "@/page/admin/playingCentral/admin.css";
</style>

<template>
  <section class="change-score">
    <h2>Alterar Placar</h2>
    <fieldset>
      <label>{{ teams.one.name }}</label>
      <input
        type="number"
        v-model="teamChangeScore.one.score"
        :style="{ backgroundColor: 'white' }"
      />
    </fieldset>
    <fieldset>
      <label>{{ teams.two.name }}</label>
      <input
        type="number"
        v-model="teamChangeScore.two.score"
        :style="{ backgroundColor: 'white' }"
      />
    </fieldset>
    <button @click="handleSendScore">Salvar</button>
  </section>
</template>

<script lang="ts" setup>
import { socket } from "../../config/socket";
import { reactive, watch } from "vue";

const teamChangeScore = reactive({
  one: { score: 0 },
  two: { score: 0 },
});

const { teams } = defineProps<{
  teams: {
    one: {
      name: string;
      score: number;
    };
    two: {
      name: string;
      score: number;
    };
  };
}>();

watch([teams], () => {
  teamChangeScore.one.score = teams.one.score;
  teamChangeScore.two.score = teams.two.score;
});

function handleSendScore() {
  teams.one.score = teamChangeScore.one.score;
  teams.two.score = teamChangeScore.two.score;

  socket.emit("change-score", {
    one: { score: teamChangeScore.one.score },
    two: { score: teamChangeScore.two.score },
  });
}
</script>
