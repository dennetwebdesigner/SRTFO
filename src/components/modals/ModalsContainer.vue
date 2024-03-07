<style escoped>
@import "@/page/admin/playingCentral/admin.css";
.resetTimerModal {
  flex-wrap: wrap;
}
.h-modal {
  width: 100%;
  margin: 0.1rem 0;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.h-modal h2 {
  font-size: 1.5rem;
}
.h-modal p {
  color: red;
  font-weight: bolder;
  font-size: 1.5em;
  font-family: sans-serif;
}

.slot {
  height: 88vh;
  width: 100%;
  padding: 0.8rem;
}
</style>
<template>
  <div class="resetTimerModal" :style="{ display: style }">
    <section class="h-modal">
      <h2>{{ title }}</h2>
      <p @click="handleClose">x</p>
    </section>
    <section class="slot">
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["styleModal"]);
const { style, title } = defineProps<{
  style: string;
  title: string;
}>();
function handleClose() {
  emit("styleModal", { name: "add", style: "none" });
}
</script>
