<style scoped>
@import "./initAdmin.css";
</style>

<template>
  <modalNewPlay :style-display="style" />
  <main class="container-main">
    <h1>Caldeirão da Bola</h1>
    <h2>Sistema de transmissão remoto</h2>

    <section class="actions">
      <button @click="handleNewPlay">Novo Jogo</button>
      <button>Histórico</button>
      <button>
        <router-link to="/admin/teams" class="link"> Times </router-link>
      </button>
      <button>
        <router-link to="/admin/jogo" class="link"> Partida Atual </router-link>
      </button>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import modalNewPlay from "@/components/modals/modalNewPlay.vue";

const style = reactive<{ display: string }>({ display: "none" });

function handleNewPlay() {
  style.display = "flex";
}
</script>
