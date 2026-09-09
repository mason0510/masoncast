<script setup lang="ts">
import type { Episode } from '../types/content'

const props = defineProps<{
  episode: Episode
  fallbackCover: string
}>()

const metaItems = [props.episode.duration, props.episode.size, ...props.episode.tags].filter(Boolean) as string[]

const openHref = () => {
  if (props.episode.href) window.location.assign(props.episode.href)
}
</script>

<template>
  <article
    class="episode-card panel-subtle"
    :class="{ clickable: Boolean(episode.href) }"
    :role="episode.href ? 'link' : undefined"
    :tabindex="episode.href ? 0 : undefined"
    @click="episode.href ? openHref() : undefined"
    @keydown.enter="episode.href ? openHref() : undefined"
  >
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
      <audio v-if="episode.audioUrl" controls preload="none" @click.stop>
        <source :src="episode.audioUrl" :type="episode.audioUrl.endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg'" />
      </audio>
      <div v-if="episode.audioUrl" class="audio-actions">
        <a :href="episode.audioUrl" target="_blank" rel="noreferrer">{{ episode.external ? '打开音频' : '在线播放' }}</a>
        <a :href="episode.audioUrl" :download="episode.downloadName || true">下载音频</a>
      </div>
      <div v-else class="audio-actions">
        <a v-if="episode.href" :href="episode.href" @click.stop>打开书</a>
        <span v-else>本篇是书。音频随读一段合成。</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.episode-card.clickable { cursor: pointer; }
</style>
