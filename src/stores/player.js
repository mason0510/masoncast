import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const currentEpisode = ref(null)
  const isPlaying = ref(false)
  const volume = ref(0.8)
  const playbackRate = ref(1.0)
  const progress = ref(0)
  const duration = ref(0)
  
  const play = (episode) => {
    currentEpisode.value = episode
    isPlaying.value = true
  }
  
  const pause = () => {
    isPlaying.value = false
  }
  
  const setProgress = (val) => {
    progress.value = val
  }
  
  const setPlaybackRate = (rate) => {
    playbackRate.value = rate
  }
  
  return {
    currentEpisode,
    isPlaying,
    volume,
    playbackRate,
    progress,
    duration,
    play,
    pause,
    setProgress,
    setPlaybackRate
  }
})
