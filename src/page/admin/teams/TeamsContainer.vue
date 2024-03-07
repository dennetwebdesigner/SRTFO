<style>
@import "./teamsStyle.css";
.link-back {
  position: absolute;
  top: -2rem;
  left: 2rem;
  color: white;
  font-size: 0.3em;
}
</style>
<template>
  <section class="container-teams">
    <h1 class="title">
      Times
      <span class="back">
        <router-link class="link-back" to="/admin">voltar</router-link>
      </span>
    </h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts" setup></script>
