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

    <div class="select-team">
      <div
        v-for="t in findAll.teams"
        :key="t.name"
        @click="() => handleSelectTeam(t.name)"
      >
        {{ t.name }}
      </div>
    </div>
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

const findAll = reactive<{ teams: { name: string; cover: string }[] }>({
  teams: [],
});

const router = useRouter();

socket.on("start-play", () => {
  setTimeout(() => {
    router.push("/admin/jogo");
  }, 1000);
});

socket.emit("teams/findAll", null);

socket.on("teams/findAll", (data: { name: string; cover: string }[]) => {
  console.log(data);
  findAll.teams = data;
});

function handleSelectTeam(name: string) {
  if (teams.one == "" && teams.two != name) teams.one = name;
  else if (teams.two == "" && teams.one != name) teams.two = name;
  else alert("O time esta repetido ou os dois já estão selecionados!");
}

function closedModal() {
  styleDisplay.display = "none";
}

function submitTeamsName() {
  socket.emit("start-play", teams);
}
</script>
