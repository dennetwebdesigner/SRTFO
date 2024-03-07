<template>
  <section class="placar">
    <article>
      {{ teams.one.name }}
      <span>{{ teams.one.score }}</span>
    </article>
    <article>VS</article>
    <article>
      {{ teams.two.name }}
      <span>{{ teams.two.score }}</span>
    </article>
  </section>
</template>

<script lang="ts" setup>
const { teams } = defineProps<{
  teams: {
    one: {
      name: string;
      score: number;
    };
    two: {
      name: string;
      score: number;
    };
  };
}>();
</script>
