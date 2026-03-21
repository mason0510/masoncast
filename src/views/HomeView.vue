<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ShowCard from '../components/ShowCard.vue'
import ShowDirectoryCard from '../components/ShowDirectoryCard.vue'
import { shows } from '../data/catalog'

const heroCover = shows.find((show) => show.slug === 'li-xiucheng')?.coverUrl || ''
const showCount = computed(() => shows.length)
const featuredShows = computed(() => shows.slice(0, 2))
const allShows = computed(() => shows)

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  document.title = 'MasonCast · 历史播客实验'
})
</script>

<template>
  <main class="shell page-shell">
    <section class="hero">
      <div class="panel hero-copy">
        <span class="kicker">MasonCast / Historical Audio</span>
        <h1>历史，不只适合阅读，也适合被听见。</h1>
        <p class="lead">围绕近代中国的书写、手稿、人物与时代，把沉在书页里的历史变成可以反复收听的声音。</p>
        <p class="summary">
          这里收录《南渡北归》与《李秀成供词》。一边是知识分子与时代巨变的群像，一边是晚清手稿、删改供词与败亡者自述的回声。
        </p>

        <div class="actions">
          <button type="button" class="button primary" @click="scrollToSection('featured-shows')">立即收听</button>
          <button type="button" class="button ghost" @click="scrollToSection('all-shows')">浏览全部节目</button>
        </div>

        <div class="metrics metrics-4">
          <div class="metric"><strong>{{ showCount }}</strong><span>档节目</span></div>
          <div class="metric"><strong>{{ featuredShows.length }}</strong><span>已上线</span></div>
          <div class="metric"><strong>18 + 5</strong><span>章节 / 分集</span></div>
          <div class="metric"><strong>Audio</strong><span>可播放 / 可下载</span></div>
        </div>
      </div>
      <div class="panel hero-cover">
        <img :src="heroCover" alt="李秀成供词封面" />
      </div>
    </section>

    <section class="section" id="featured-shows">
      <div class="section-head">
        <div>
          <h2 class="section-title">推荐收听</h2>
        </div>
        <p>从这里进入两档节目：《南渡北归》与《李秀成供词》。</p>
      </div>
      <div class="grid-2">
        <ShowCard v-for="show in featuredShows" :key="show.slug" :show="show" />
      </div>
    </section>

    <section class="section" id="all-shows">
      <div class="section-head">
        <div>
          <h2 class="section-title">全部节目</h2>
        </div>
        <p>按节目浏览，进入各自的分集与音频。</p>
      </div>
      <div class="directory-grid">
        <ShowDirectoryCard v-for="show in allShows" :key="show.slug" :show="show" />
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2 class="section-title">节目主题</h2>
        </div>
        <p>从书卷世界到晚清残局，从人物命运到文本改写。</p>
      </div>
      <div class="callout-list">
        <div class="callout">
          <h4>知识分子与时代</h4>
          <p>《南渡北归》聚焦民国前后的学人群像，把历史中的相遇、离散与转折写成一部长篇声音史。</p>
        </div>
        <div class="callout">
          <h4>手稿、删改与缺页</h4>
          <p>《李秀成供词》追索李秀成供词、绝笔残稿与曾国藩红笔批校，让文本本身重新回到叙事中央。</p>
        </div>
        <div class="callout">
          <h4>适合慢慢听</h4>
          <p>两档节目都保留完整分集，适合通勤、夜读，或在某一章、某一集停下后再回来继续听。</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div>Podcast website: MasonCast</div>
      <div>近代中国的书写、人物与回声。</div>
    </footer>
  </main>
</template>
