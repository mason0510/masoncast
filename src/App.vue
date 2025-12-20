<script setup>
import { ref, onMounted } from 'vue'
import { usePlayerStore } from './stores/player'
import { podcastAPI } from './api/podcast'
import Player from './components/Player.vue'

const playerStore = usePlayerStore()
const episodes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await podcastAPI.getEpisodes()
    episodes.value = data
  } catch (error) {
    console.error('Failed to load episodes:', error)
  } finally {
    loading.value = false
  }
})

const playEpisode = (episode) => {
  playerStore.play(episode)
  podcastAPI.recordPlay(episode.id)
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>🎙️ MasonCast</h1>
      <p class="subtitle">每日播客，与你分享</p>
    </header>

    <main class="main">
      <div v-if="loading" class="loading">加载中...</div>

      <div v-else-if="episodes.length === 0" class="empty">
        <p>暂无播客内容</p>
        <p class="hint">敬请期待...</p>
      </div>

      <div v-else class="episodes-grid">
        <div
          v-for="episode in episodes"
          :key="episode.id"
          class="episode-card"
          @click="playEpisode(episode)"
        >
          <div class="cover">
            <img :src="episode.cover_url || '/default-cover.jpg'" :alt="episode.title" />
            <div class="play-overlay">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div class="info">
            <h3 class="title">{{ episode.title }}</h3>
            <p class="description">{{ episode.description }}</p>
            <div class="meta">
              <span class="duration">{{ formatDuration(episode.duration) }}</span>
              <span class="date">{{ formatDate(episode.publish_date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Player />
  </div>
</template>

<script>
export default {
  methods: {
    formatDuration(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 120px;
}

.header {
  text-align: center;
  padding: 3rem 1rem;
  color: white;
}

.header h1 {
  font-size: 3rem;
  margin: 0;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading, .empty {
  text-align: center;
  color: white;
  font-size: 1.5rem;
  padding: 4rem 1rem;
}

.hint {
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.episode-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.episode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}

.cover {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.episode-card:hover .play-overlay {
  opacity: 1;
}

.info {
  padding: 1rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.75rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #999;
}
</style>
