<style scoped>
@import "./PanelStatistic.css";
</style>
<template>
  <section class="statistic-panel">
    <article class="statistic-header">Estatisticas do Jogo</article>

    <section class="statistic-list left">
      <article>{{ data.one.kick }} ({{ data.one.goal }})</article>
      <article>{{ data.one.fouls }}</article>
      <article>{{ data.one.cornerKick }}</article>
      <article>{{ data.one.Churaltes }}</article>
      <article>{{ data.one.CardYellow }}</article>
      <article>{{ data.one.CardRed }}</article>
    </section>

    <section class="statistic-list mid">
      <article>Chutes (a gol)</article>
      <article>Faltas</article>
      <article>Escanteios</article>
      <article>Churaltes</article>
      <article>Cartões Amarelos</article>
      <article>Cartões Vermelhos</article>
    </section>

    <section class="statistic-list right">
      <article>{{ data.two.kick }} ({{ data.two.goal }})</article>
      <article>{{ data.two.fouls }}</article>
      <article>{{ data.two.cornerKick }}</article>
      <article>{{ data.two.Churaltes }}</article>
      <article>{{ data.two.CardYellow }}</article>
      <article>{{ data.two.CardRed }}</article>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const data = reactive({
  one: {
    goal: 0,
    kick: 0,
    fouls: 0,
    cornerKick: 0,
    Churaltes: 0,
    CardYellow: 0,
    CardRed: 0,
  },
  two: {
    goal: 0,
    kick: 0,
    fouls: 0,
    cornerKick: 0,
    Churaltes: 0,
    CardYellow: 0,
    CardRed: 0,
  },
});
</script>
