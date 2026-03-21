<script setup lang="ts">
import type { Episode } from '../types/content'

const props = defineProps<{
  episode: Episode
  fallbackCover: string
}>()

const metaItems = [props.episode.duration, props.episode.size, ...props.episode.tags].filter(Boolean) as string[]
</script>

<template>
  <article class="episode-card panel-subtle">
    <div class="cover-wrap">
      <img :src="episode.coverUrl || fallbackCover" :alt="episode.title" />
      <span class="ep-no">{{ episode.number }}</span>
    </div>
    <div class="body-copy">
      <div class="meta-badges">
        <span v-for="item in metaItems" :key="item">{{ item }}</span>
      </div>
      <h3>{{ episode.title }}</h3>
      <p>{{ episode.summary }}</p>
      <audio controls preload="none">
        <source :src="episode.audioUrl" :type="episode.audioUrl.endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg'" />
      </audio>
      <div class="audio-actions">
        <a :href="episode.audioUrl" target="_blank" rel="noreferrer">{{ episode.external ? '打开音频' : '在线播放' }}</a>
        <a :href="episode.audioUrl" :download="episode.downloadName || true">下载音频</a>
      </div>
    </div>
  </article>
</template>
