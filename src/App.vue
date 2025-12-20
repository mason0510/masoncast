<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePlayerStore } from './stores/player'
import { podcastAPI } from './api/podcast'
import Player from './components/Player.vue'

const playerStore = usePlayerStore()
const episodes = ref([])
const loading = ref(true)
const activeTab = ref('discover') // discover, subscribed, favorites, trending

const tabs = [
  { id: 'discover', name: '发现', icon: 'compass' },
  { id: 'trending', name: '热门', icon: 'fire' },
  { id: 'subscribed', name: '订阅', icon: 'bookmark' },
  { id: 'favorites', name: '喜欢', icon: 'heart' }
]

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

// 判断是否为视频（通过URL后缀）
const isVideo = (url) => {
  return /\.(mp4|webm|mov|avi|mkv)$/i.test(url)
}

// 根据Tab过滤内容（目前全显示，后续可以添加分类逻辑）
const filteredEpisodes = computed(() => {
  // TODO: 根据activeTab过滤不同内容
  return episodes.value
})

// 获取SVG图标
const getIcon = (iconName) => {
  const icons = {
    compass: 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
    fire: 'M8 0a1 1 0 011 1v5.268l4.562-2.634a1 1 0 011.518.864v5.536a1 1 0 01-1.518.864L9 8.232V13a1 1 0 11-2 0V8.232l-4.562 2.666A1 1 0 011 10.034V4.498a1 1 0 011.518-.864L7 6.268V1a1 1 0 011-1z',
    bookmark: 'M2 2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.777.416L8 13.101l-5.223 2.815A.5.5 0 012 15.5V2z',
    heart: 'M8 14s6-5.686 6-10A6 6 0 002 4c0 4.314 6 10 6 10z'
  }
  return icons[iconName] || icons.compass
}
</script>

<template>
  <div class="app">
    <!-- 顶部导航 -->
    <nav class="nav">
      <div class="nav-content">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="url(#gradient)"/>
            <path d="M14 11v10l8-5z" fill="white"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
          <span class="logo-text">MasonCast</span>
        </div>
        <div class="nav-actions">
          <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Tab导航 -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path :d="getIcon(tab.icon)"/>
            </svg>
            <span>{{ tab.name }}</span>
          </button>
        </div>
        <div class="tab-indicator" :style="{ transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)` }"></div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="main">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 空状态 -->
      <div v-else-if="filteredEpisodes.length === 0" class="empty-state">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="currentColor" stroke-width="2" opacity="0.2"/>
          <path d="M50 45v30l25-15z" fill="currentColor" opacity="0.3"/>
        </svg>
        <h2>暂无播客内容</h2>
        <p v-if="activeTab === 'discover'">敬请期待精彩内容...</p>
        <p v-else-if="activeTab === 'subscribed'">您还没有订阅任何播客</p>
        <p v-else-if="activeTab === 'favorites'">您还没有收藏任何播客</p>
        <p v-else>暂无热门内容</p>
      </div>

      <!-- 内容网格 -->
      <div v-else class="content-wrapper">
        <!-- Tab标题 -->
        <div class="section-header">
          <h2 class="section-title">
            <span v-if="activeTab === 'discover'">🎙️ 最新</span>
            <span v-else-if="activeTab === 'trending'">🔥 热门</span>
            <span v-else-if="activeTab === 'subscribed'">📚 订阅</span>
            <span v-else>❤️ 喜欢</span>
          </h2>
          <div class="section-meta">
            共 {{ filteredEpisodes.length }} 个播客
          </div>
        </div>

        <!-- 正在播放指示 -->
        <div v-if="playerStore.currentEpisode" class="now-playing-indicator">
          <div class="pulse"></div>
          <span>正在播放</span>
        </div>

        <!-- 混排卡片流 -->
        <div class="episodes-grid">
          <div
            v-for="episode in filteredEpisodes"
            :key="episode.id"
            :class="['episode-card', {
              'is-playing': playerStore.currentEpisode?.id === episode.id,
              'is-video': isVideo(episode.audio_url)
            }]"
            @click="playEpisode(episode)"
          >
            <!-- 封面容器 -->
            <div class="cover-container">
              <img
                :src="episode.cover_url || '/default-cover.jpg'"
                :alt="episode.title"
                class="cover-image"
              />

              <!-- 视频标识 -->
              <div v-if="isVideo(episode.audio_url)" class="media-badge video">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M1 3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3zm13 1.5v7a.5.5 0 00.75.433l3-1.714a.5.5 0 000-.866l-3-1.714A.5.5 0 0014 4.5z"/>
                </svg>
              </div>

              <!-- 播放叠加层 -->
              <div class="play-overlay">
                <div class="play-button">
                  <svg v-if="playerStore.currentEpisode?.id !== episode.id" width="32" height="32" viewBox="0 0 32 32" fill="white">
                    <path d="M11 8v16l13-8z"/>
                  </svg>
                  <svg v-else width="32" height="32" viewBox="0 0 32 32" fill="white">
                    <path d="M10 8h4v16h-4V8zm8 0h4v16h-4V8z"/>
                  </svg>
                </div>
              </div>

              <!-- 播放进度条（如果是当前播放） -->
              <div v-if="playerStore.currentEpisode?.id === episode.id" class="progress-indicator">
                <div class="progress-bar"></div>
              </div>
            </div>

            <!-- 内容信息 -->
            <div class="card-content">
              <h3 class="episode-title">{{ episode.title }}</h3>
              <p v-if="episode.description" class="episode-description">{{ episode.description }}</p>

              <div class="episode-meta">
                <span class="meta-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm1 10H6V6h2v4zm0-5H6V3h2v2z"/>
                  </svg>
                  {{ formatDuration(episode.duration) }}
                </span>
                <span class="meta-item">
                  {{ formatDate(episode.publish_date) }}
                </span>
                <span class="meta-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M2 2a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V2z"/>
                  </svg>
                  {{ episode.play_count }} 次
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 全局播放器 -->
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
* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding-bottom: 120px;
}

/* 导航栏 */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* Tab导航 */
.tabs-container {
  position: sticky;
  top: 65px;
  z-index: 90;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tabs-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  position: relative;
  padding: 0.875rem 1.25rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
}

.tab svg {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.9);
}

.tab:hover svg {
  opacity: 1;
}

.tab.active {
  color: #fff;
}

.tab.active svg {
  opacity: 1;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: calc(100% / 4);
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 主内容区 */
.main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-meta {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
}

/* 加载和空状态 */
.loading-state, .empty-state {
  text-align: center;
  padding: 6rem 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state h2 {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 正在播放指示 */
.now-playing-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #667eea;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* 卡片网格 */
.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.episode-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.episode-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(102, 126, 234, 0.2);
}

.episode-card.is-playing {
  border-color: rgba(102, 126, 234, 0.6);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

/* 封面容器 */
.cover-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.episode-card:hover .cover-image {
  transform: scale(1.05);
}

.episode-card.is-playing .cover-image {
  animation: breathing 3s ease-in-out infinite;
}

@keyframes breathing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* 媒体标识 */
.media-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.media-badge.video {
  background: rgba(220, 38, 38, 0.9);
}

/* 播放叠加层 */
.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.episode-card:hover .play-overlay,
.episode-card.is-playing .play-overlay {
  opacity: 1;
}

.play-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.9);
  transition: transform 0.2s;
}

.episode-card:hover .play-button {
  transform: scale(1);
}

/* 进度指示器 */
.progress-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
}

.progress-bar {
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  animation: progress 2s linear infinite;
}

@keyframes progress {
  0% { width: 30%; }
  50% { width: 70%; }
  100% { width: 30%; }
}

/* 卡片内容 */
.card-content {
  padding: 1.25rem;
}

.episode-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.episode-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}

.episode-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .nav-content, .tabs-wrapper {
    padding: 1rem;
  }

  .main {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .episodes-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }

  .card-content {
    padding: 1rem;
  }

  .episode-title {
    font-size: 1rem;
  }
}
</style>
