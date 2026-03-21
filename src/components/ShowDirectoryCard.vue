<script setup lang="ts">
import type { Show } from '../types/content'

defineProps<{
  show: Show
}>()
</script>

<template>
  <RouterLink class="directory-card" :to="`/show/${show.slug}`">
    <div>
      <div class="directory-card-code">{{ show.showNumber }}</div>
      <div class="directory-card-title">{{ show.title }}</div>
      <div class="directory-card-meta">{{ show.categoryLabel }} · {{ show.badges[0] || show.homeTag }}</div>
    </div>
    <span class="directory-card-arrow">→</span>
  </RouterLink>
</template>
