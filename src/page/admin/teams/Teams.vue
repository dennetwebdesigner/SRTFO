<template>
  <ModalContainer
    v-on:style-modal="onStyleModal"
    :style="modalStyle.add"
    :title="modalInfo.title"
  >
    <component :is="modalInfo.component" v-bind="modalInfo.props" />
  </ModalContainer>
  <button
    class="btn-add"
    @click="() => handleModal('Adicionar Time', ModalTeamAdd, {})"
  >
    Adicionar Time
  </button>
  <div class="teams-table">
    <div
      class="teams-tr"
      v-if="teams.length > 0"
      v-for="team in teams"
      :key="team.name"
      @click="
        () => handleModal('Remover Time', ModalTeamRemove, { name: team.name })
      "
    >
      {{ team.name }}
    </div>
    <div v-else class="teams-tr">
      Nenhum time encontrado (aguarde ou adicione um novo time!)
    </div>
  </div>
</template>

<style scoped>
@import "./teamsStyle.css";
</style>

<script lang="ts" setup>
import { reactive } from "vue";
import { socket } from "@/config/socket";
import ModalContainer from "@/components/modals/ModalsContainer.vue";
import ModalTeamAdd from "@/components/modals/modalTeamAdd.vue";
import ModalTeamRemove from "@/components/modals/modalTeamRemove.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const teams = reactive<{ name: string; cover: string }[]>([]);

const modalStyle = reactive<{ [add: string]: string }>({ add: "none" });
const modalInfo = reactive({ title: "", component: null, props: {} });

function onStyleModal(e: { style: string; name: string }) {
  modalStyle[e.name] = e.style;
  modalInfo.title = "";
  modalInfo.component = null;
  modalInfo.props = {};
}

function handleModal(name: string, component: any, data: any) {
  modalInfo.title = name;
  modalInfo.component = component;
  modalStyle.add = "flex";
  modalInfo.props = data;
}

function resolve_modal_response(data: Boolean, msg: string) {
  let message = "";

  if (data) message = msg;
  else message = "Houve um erro, atualize a página e tente novamente!";
  router.go(0);
  alert(message);
}

socket.emit("teams/findAll", null);
socket.on(
  "teams/findAll",
  (data: { [key: string]: { name: string; cover: string } }) => {
    Object.keys(data).forEach((key: string, index: Number) => {
      teams[index as any] = data[key];
    });
  }
);

socket.on("teams/add", (data) => {
  resolve_modal_response(data, "Adicionado com Sucesso!");
});

socket.on("teams/remove", (data) => {
  resolve_modal_response(data, "Removido com Sucesso!");
});
</script>
