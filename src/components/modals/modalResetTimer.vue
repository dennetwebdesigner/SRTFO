<style>
@import "@/page/admin/playingCentral/admin.css";
</style>

<template>
  <div class="resetTimerModal" :style="{ display: style.display }">
    <section>
      <h2>Resetar Temporizador?</h2>
      <div>
        <button @click="setResetTimer">Sim</button>
        <button @click="() => emit('modalClose', 'none')">Não</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { socket } from "@/config/socket";

const emit = defineEmits(["modalClose"]);

const { style } = defineProps<{
  style: { display: string };
}>();

function setResetTimer() {
  socket.emit("reset-timer", null);
}
</script>
