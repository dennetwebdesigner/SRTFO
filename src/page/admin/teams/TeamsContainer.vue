<style>
@import "./teamsStyle.css";
.link-back {
  position: absolute;
  right: 1rem;
  top: 0.4rem;
  color: white;
  font-size: 1em;
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
