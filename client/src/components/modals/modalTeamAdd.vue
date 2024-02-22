<template>
  <fieldset class="modal-add-field">
    <label for="">Nome do Time</label>
    <input type="text" v-model="data.name" />
  </fieldset>
  <fieldset class="modal-add-field">
    <label for="">Emblema do time</label>
    <input type="text" v-model="data.cover" />
  </fieldset>
  <fieldset class="modal-add-field">
    <button @click="handleAdd">Adicionar</button>
  </fieldset>
</template>

<style scoped>
.modal-add-field {
  border: none;
  padding: 0 0.5rem;
  display: flex;
  flex-wrap: wrap;
  widows: 100%;
  position: relative;
  margin: 0.7rem 0;
  font-family: sans-serif;
}
.modal-add-field label {
  width: 100%;
  text-align: left;
}
.modal-add-field input {
  width: 100%;
  height: 2rem;
  padding: 0.4rem;
  outline-style: none;
}

.modal-add-field button {
  position: absolute;
  right: -2rem;
}
</style>

<script lang="ts" setup>
import { reactive } from "vue";
import { socket } from "@/config/socket";

const data = reactive<{ name: string; cover: string }>({
  name: "",
  cover: "",
});

function handleAdd() {
  socket.emit("teams/add", data);
}
</script>
