<script setup>
import { ref, computed, watch } from 'vue'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()
const mediaRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const isFullscreen = ref(false)

const progress = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

const isVideo = computed(() => {
  if (!playerStore.currentEpisode?.audio_url) return false
  return /\.(mp4|webm|mov|avi|mkv)$/i.test(playerStore.currentEpisode.audio_url)
})

watch(() => playerStore.currentEpisode, (newEpisode) => {
  if (newEpisode && mediaRef.value) {
    mediaRef.value.src = newEpisode.audio_url
    mediaRef.value.play()
  }
})

watch(() => playerStore.isPlaying, (playing) => {
  if (mediaRef.value) {
    playing ? mediaRef.value.play() : mediaRef.value.pause()
  }
})

const onTimeUpdate = () => {
  if (mediaRef.value) {
    currentTime.value = mediaRef.value.currentTime
  }
}

const onLoadedMetadata = () => {
  if (mediaRef.value) {
    duration.value = mediaRef.value.duration
  }
}

const seek = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const time = percent * duration.value
  if (mediaRef.value) {
    mediaRef.value.currentTime = time
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

const toggleFullscreen = () => {
  if (!mediaRef.value) return

  if (!isFullscreen.value) {
    if (mediaRef.value.requestFullscreen) {
      mediaRef.value.requestFullscreen()
    } else if (mediaRef.value.webkitRequestFullscreen) {
      mediaRef.value.webkitRequestFullscreen()
    }
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    isFullscreen.value = false
  }
}

const skip = (seconds) => {
  if (mediaRef.value) {
    mediaRef.value.currentTime += seconds
  }
}

const changeSpeed = (speed) => {
  if (mediaRef.value) {
    mediaRef.value.playbackRate = speed
    playerStore.playbackRate = speed
  }
}
</script>

<template>
  <div v-if="playerStore.currentEpisode" :class="['player', { 'is-video': isVideo }]">
    <!-- 音频播放器 -->
    <audio
      v-if="!isVideo"
      ref="mediaRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="playerStore.pause"
    ></audio>

    <!-- 视频播放器 -->
    <video
      v-else
      ref="mediaRef"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="playerStore.pause"
      class="video-player"
      :class="{ 'fullscreen': isFullscreen }"
    ></video>

    <!-- 播放器UI -->
    <div class="player-ui">
      <!-- 视频模式提示 -->
      <div v-if="isVideo" class="video-badge">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M1 3a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3zm13 1.5v7a.5.5 0 00.75.433l3-1.714a.5.5 0 000-.866l-3-1.714A.5.5 0 0014 4.5z"/>
        </svg>
        <span>视频播客</span>
      </div>

      <!-- 主控制区 -->
      <div class="player-content">
        <!-- 左侧：播客信息 -->
        <div class="episode-info">
          <img
            :src="playerStore.currentEpisode.cover_url || '/default-cover.jpg'"
            :alt="playerStore.currentEpisode.title"
            class="cover-mini"
          />
          <div class="text">
            <div class="title">{{ playerStore.currentEpisode.title }}</div>
            <div class="time-display">
              <span class="current">{{ formatTime(currentTime) }}</span>
              <span class="separator">/</span>
              <span class="total">{{ formatTime(duration) }}</span>
            </div>
          </div>
        </div>

        <!-- 中间：控制按钮 -->
        <div class="controls">
          <!-- 后退15秒 -->
          <button @click="skip(-15)" class="control-btn" title="后退15秒">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 5a5 5 0 100 10 5 5 0 000-10zM8 10l3-2v4l-3-2z"/>
            </svg>
            <span class="skip-label">15</span>
          </button>

          <!-- 播放/暂停 -->
          <button @click="togglePlay" class="play-btn">
            <svg v-if="!playerStore.isPlaying" width="28" height="28" viewBox="0 0 28 28" fill="white">
              <path d="M10 7v14l11-7z"/>
            </svg>
            <svg v-else width="28" height="28" viewBox="0 0 28 28" fill="white">
              <path d="M9 7h3v14H9V7zm7 0h3v14h-3V7z"/>
            </svg>
          </button>

          <!-- 前进30秒 -->
          <button @click="skip(30)" class="control-btn" title="前进30秒">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 5a5 5 0 110 10 5 5 0 010-10zm1 3l-3 2 3 2V8z"/>
            </svg>
            <span class="skip-label">30</span>
          </button>
        </div>

        <!-- 右侧：高级控制 -->
        <div class="advanced-controls">
          <!-- 倍速 -->
          <div class="speed-control">
            <select
              :value="playerStore.playbackRate"
              @change="changeSpeed(Number($event.target.value))"
              class="speed-select"
            >
              <option value="0.75">0.75x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
            </select>
          </div>

          <!-- 全屏（仅视频） -->
          <button
            v-if="isVideo"
            @click="toggleFullscreen"
            class="control-btn"
            title="全屏"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 3h6v2H5v4H3V3zm14 0h-6v2h4v4h2V3zM3 17h2v-4h2v6H3v-2zm14 0v-2h-2v2h-4v2h6v-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container" @click="seek">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          <div class="progress-thumb" :style="{ left: progress + '%' }"></div>
        </div>
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
  z-index: 1000;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.player.is-video {
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.98) 0%, rgba(0, 0, 0, 1) 100%);
}

.video-player {
  width: 100%;
  max-height: 40vh;
  background: #000;
  display: block;
}

.video-player.fullscreen {
  max-height: 100vh;
}

.player-ui {
  padding: 1rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.video-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(220, 38, 38, 0.9);
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
  margin-bottom: 0.75rem;
}

.player-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
}

/* 播客信息 */
.episode-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.cover-mini {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.text {
  flex: 1;
  min-width: 0;
}

.title {
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.25rem;
}

.time-display {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}

.separator {
  margin: 0 0.25rem;
}

/* 控制按钮 */
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.skip-label {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 0.6rem;
  font-weight: 700;
}

.play-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.play-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
}

.play-btn:active {
  transform: scale(0.98);
}

/* 高级控制 */
.advanced-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.speed-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
}

.speed-select:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 进度条 */
.progress-container {
  cursor: pointer;
  padding: 0.5rem 0;
}

.progress-track {
  position: relative;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: visible;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.1s linear;
  position: relative;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-container:hover .progress-thumb {
  opacity: 1;
}

/* 响应式 */
@media (max-width: 1024px) {
  .player-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .episode-info {
    order: 1;
  }

  .controls {
    order: 2;
  }

  .advanced-controls {
    order: 3;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .player-ui {
    padding: 0.75rem 1rem;
  }

  .cover-mini {
    width: 48px;
    height: 48px;
  }

  .title {
    font-size: 0.85rem;
  }

  .time-display {
    font-size: 0.75rem;
  }

  .control-btn {
    width: 36px;
    height: 36px;
  }

  .play-btn {
    width: 48px;
    height: 48px;
  }
}
</style>
