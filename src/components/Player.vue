<script setup>
import { ref, computed, watch } from 'vue'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()
const audio = ref(null)
const currentTime = ref(0)
const duration = ref(0)

const progress = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

watch(() => playerStore.currentEpisode, (newEpisode) => {
  if (newEpisode && audio.value) {
    audio.value.src = newEpisode.audio_url
    audio.value.play()
  }
})

watch(() => playerStore.isPlaying, (playing) => {
  if (audio.value) {
    playing ? audio.value.play() : audio.value.pause()
  }
})

const onTimeUpdate = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
  }
}

const onLoadedMetadata = () => {
  if (audio.value) {
    duration.value = audio.value.duration
  }
}

const seek = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const time = percent * duration.value
  if (audio.value) {
    audio.value.currentTime = time
  }
}

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  playerStore.isPlaying ? playerStore.pause() : playerStore.resume()
}
</script>

<template>
  <div v-if="playerStore.currentEpisode" class="player">
    <audio
      ref="audio"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="playerStore.pause"
    ></audio>

    <div class="player-content">
      <div class="episode-info">
        <img
          :src="playerStore.currentEpisode.cover_url || '/default-cover.jpg'"
          :alt="playerStore.currentEpisode.title"
          class="cover-mini"
        />
        <div class="text">
          <div class="title">{{ playerStore.currentEpisode.title }}</div>
          <div class="time">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </div>
        </div>
      </div>

      <div class="controls">
        <button @click="togglePlay" class="play-btn">
          <svg v-if="!playerStore.isPlaying" width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        </button>
      </div>

      <div class="progress-bar" @click="seek">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #1e1e1e 0%, #000 100%);
  padding: 1rem;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
}

.player-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
}

.episode-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cover-mini {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.text {
  flex: 1;
  min-width: 0;
}

.title {
  color: white;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
  color: #999;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.play-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.play-btn:hover {
  transform: scale(1.05);
}

.play-btn:active {
  transform: scale(0.95);
}

.progress-bar {
  grid-column: 1 / -1;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: width 0.1s;
}

@media (max-width: 768px) {
  .player-content {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .controls {
    justify-content: center;
  }
}
</style>
