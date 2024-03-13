<style lang="css" scoped>
@import "./login.css";
</style>

<template>
  <section class="container-login">
    <article class="login">
      <h2>Sistema de Transmissão - CdB</h2>
      <fieldset>
        <label for="">Email</label>
        <input type="text" v-model="data.email" />
      </fieldset>
      <fieldset>
        <label for="">Senha</label>
        <input type="password" v-model="data.password" />
      </fieldset>
      <fieldset>
        <button @click="set_sign_in">Entrar</button>
      </fieldset>
    </article>
  </section>
</template>
<script setup lang="ts">
import { login_auth } from "@/config/firebase";
import { reactive } from "vue";

const data = reactive<{ email: string; password: string }>({
  email: "",
  password: "",
});

function set_sign_in() {
  if (!data.email && !data.password) {
    alert("Preencha os campos corretamente!");
    return;
  }

  login_auth(data.email, data.password);
}
</script>
