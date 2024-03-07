<style scoped>
.modalNewPlay {
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  background-image: linear-gradient(
    to right top,
    #051937,
    #001c4e,
    #001e65,
    #001d7a,
    #05178e
  );
}

.head-modalnewplay {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  font-size: 1.6em;
  color: white;
  height: 10rem;
}

.head-modalnewplay p {
  color: red;
  font-family: sans-serif;
  font-weight: bolder;
}

.info-teams {
  margin-top: -20vh;
  width: 100%;
  padding: 15px;
  height: 15rem;
}

.info-teams fieldset {
  width: 100%;
  border: none;
  margin-bottom: 15px;
}

.info-teams fieldset:last-child {
  display: flex;
  justify-content: end;
}

.info-teams label {
  width: 100%;
  color: white;
}

.info-teams input {
  width: 100%;
  height: 45px;
  padding: 0 10px;
  outline: none;
}

.info-teams button {
  margin: 0 5px;
  padding: 10px 15px;
  background-color: greenyellow;

  border: none;
}

.info-teams button:first-child {
  background-color: brown;
  color: white;
}

.link {
  color: white;
  text-decoration: none;
}

.select-team {
  width: 95%;
  margin: 0 auto 0;
  border: 1 solid white;
  background-color: white;
  overflow-y: auto;
  height: 20rem;
  display: block;
}

.select-team div {
  font-size: 1.2em;
  text-align: center;
  padding: 1rem;
}
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
  findAll.teams = Object.values(data).sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    else return 0;
  });
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
