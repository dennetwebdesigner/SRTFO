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
      <button>
        <router-link to="/admin/teams" class="link-init-play">
          Times
        </router-link>
      </button>
      <button>
        <router-link to="/admin/jogo" class="link-init-play">
          Partida Atual
        </router-link>
      </button>
      <button @click="logout_auth">Sair</button>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import modalNewPlay from "@/components/modals/modalNewPlay.vue";
import { logout_auth, validate_token } from "@/config/firebase";
import { useRouter } from "vue-router";

const style = reactive<{ display: string }>({ display: "none" });
const router = useRouter();
function handleNewPlay() {
  style.display = "flex";
}

onMounted(() => {
  validate_token(router.push);
});
</script>
