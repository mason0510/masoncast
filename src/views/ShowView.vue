<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import EpisodeCard from '../components/EpisodeCard.vue'
import { showMap, shows } from '../data/catalog'

const route = useRoute()
const show = computed(() => showMap[String(route.params.slug || '')])
const otherShows = computed(() => shows.filter((item) => item.slug !== show.value?.slug && item.status === 'published'))

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watchEffect(() => {
  document.title = show.value ? `${show.value.title} · MasonCast` : '节目不存在 · MasonCast'
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>

<template>
  <main class="shell page-shell">
    <template v-if="show">
      <section class="series-hero">
        <div class="cover panel">
          <img :src="show.coverUrl" :alt="show.title" />
        </div>
        <div class="panel copy">
          <span class="kicker">{{ show.showNumber }} / {{ show.categoryLabel }} / {{ show.eyebrow }}</span>
          <h1>{{ show.title }}</h1>
          <p class="lead">{{ show.lead }}</p>
          <p class="summary">{{ show.summary }}</p>
          <div class="actions hero-actions-inline">
            <button type="button" class="button primary" @click="scrollToSection('episodes')">收听全部分集</button>
            <RouterLink class="button ghost" to="/">返回首页</RouterLink>
          </div>
          <div class="badges">
            <span>{{ show.categoryLabel }}</span>
            <span v-for="badge in show.badges" :key="badge">{{ badge }}</span>
          </div>
        </div>
      </section>

      <section class="panel text-card">
        {{ show.statement }}
      </section>

      <section class="section" id="episodes">
        <div class="section-head">
          <div>
            <h2 class="section-title">分集列表</h2>
          </div>
          <p>可直接在线播放；本地音频支持直接下载，远程 R2 音频可打开原文件。</p>
        </div>
        <div class="episodes-grid">
          <EpisodeCard
            v-for="episode in show.episodes"
            :key="episode.id"
            :episode="episode"
            :fallback-cover="show.coverUrl"
          />
        </div>
      </section>

      <section class="section" v-if="otherShows.length">
        <div class="section-head">
          <div>
            <h2 class="section-title">更多节目</h2>
          </div>
          <p>如果你想继续听，也可以直接进入另一档节目。</p>
        </div>
        <div class="grid-2 compact-grid">
          <RouterLink v-for="item in otherShows" :key="item.slug" class="panel archive-card" :to="`/show/${item.slug}`">
            <img :src="item.coverUrl" :alt="item.title" />
            <div class="archive-copy">
              <span class="tag">{{ item.showNumber }} · {{ item.categoryLabel }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.homeDescription }}</p>
              <span class="inline-link">查看这个节目 →</span>
            </div>
          </RouterLink>
        </div>
      </section>
    </template>

    <section v-else class="panel empty-panel">
      <span class="kicker">404 / Show Missing</span>
      <h1>这个节目不存在</h1>
      <p class="summary">你访问的节目 slug 没有对应内容。回首页重新选择，不要在错误路径上空转。</p>
      <div class="actions">
        <RouterLink class="button primary" to="/">返回首页</RouterLink>
      </div>
    </section>
  </main>
</template>
