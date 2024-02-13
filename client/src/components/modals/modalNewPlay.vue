<style scoped>
@import "@/page/admin/init/initAdmin.css";
</style>

<template>
  <section class="modalNewPlay" :style="{ ...styleDisplay }">
    <article class="head-modalnewplay">
      <h3>Criar Novo Jogo</h3>
      <p @click="closedModal">x</p>
    </article>

    <article class="info-teams">
      <fieldset>
        <label for="">Time 1</label>
        <input type="text" placeholder="Nome do time 1" v-model="teams.one" />
      </fieldset>
      <fieldset>
        <label for="">Time 2</label>
        <input type="text" placeholder="Nome do time 2" v-model="teams.two" />
      </fieldset>
      <fieldset>
        <button @click="closedModal">Desfazer</button>
        <button @click="submitTeamsName">Iniciar</button>
      </fieldset>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { socket } from "@/config/socket";
const { styleDisplay } = defineProps<{ styleDisplay: { display: string } }>();

const teams = reactive<{
  one: string;
  two: string;
}>({
  one: "",
  two: "",
});

const router = useRouter();

socket.on("start-play", () => {
  setTimeout(() => {
    router.push("/adm/jogo");
  }, 1000);
});

function closedModal() {
  styleDisplay.display = "none";
}

function submitTeamsName() {
  socket.emit("start-play", teams);
}
</script>
