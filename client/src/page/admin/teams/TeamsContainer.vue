<style>
@import "./teamsStyle.css";
</style>
<template>
  <section class="container-teams">
    <h1 class="title">
      Times
      <span class="back">
        <router-link class="link" to="/admin">voltar</router-link>
      </span>
    </h1>
    <router-view></router-view>
  </section>
</template>

<script lang="ts" setup></script>
