<template>
  <h3 class="team-title-remove">Deseja Remover o time {{ name }}</h3>
  <section class="team-action-remove">
    <button @click="handleRemove">Sim</button>
  </section>
</template>

<style scoped>
.team-action-remove {
  width: 100%;
  text-align: right;
}

.team-title-remove {
  width: 100%;
  margin: 0.8rem;
  text-align: center;
}
</style>

<script lang="ts" setup>
import { socket } from "@/config/socket";

const { name } = defineProps<{ name: string }>();

function handleRemove() {
  socket.emit("teams/remove", { name });
}
</script>
