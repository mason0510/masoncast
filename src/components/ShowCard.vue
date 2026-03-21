<script setup lang="ts">
import type { Show } from '../types/content'

defineProps<{
  show: Show
}>()
</script>

<template>
  <RouterLink class="panel review-card" :to="`/show/${show.slug}`">
    <img :src="show.coverUrl" :alt="show.title" />
    <div class="review-card-content">
      <span class="tag">{{ show.showNumber }} · {{ show.categoryLabel }}</span>
      <div class="review-card-meta">{{ show.homeTag }}</div>
      <h3>{{ show.title }}</h3>
      <p>{{ show.homeDescription }}</p>
      <span class="inline-link">查看节目 →</span>
    </div>
  </RouterLink>
</template>
