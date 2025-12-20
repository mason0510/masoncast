import axios from 'axios'

const API_BASE = import.meta.env.PROD 
  ? 'https://podcast-api.aihang365.com/api'
  : '/api'

export const podcastAPI = {
  async getEpisodes() {
    const { data } = await axios.get(`${API_BASE}/episodes`)
    return data
  },
  
  async getEpisode(id) {
    const { data } = await axios.get(`${API_BASE}/episodes/${id}`)
    return data
  },
  
  async recordPlay(id) {
    await axios.post(`${API_BASE}/episodes/${id}/play`)
  }
}
