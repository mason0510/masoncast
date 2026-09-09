<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ShowCard from '../components/ShowCard.vue'
import ShowDirectoryCard from '../components/ShowDirectoryCard.vue'
import { contentLanes, shows } from '../data/catalog'

const publishedShows = computed(() => shows.filter((show) => show.status === 'published'))
const featuredOrder = ['nandu-beigui', 'rengui-zhijian'] as const
const heroCover = computed(
  () => publishedShows.value.find((show) => show.slug === featuredOrder[0])?.coverUrl || publishedShows.value[0]?.coverUrl || '',
)
const showCount = computed(() => publishedShows.value.length)
const episodeCount = computed(() => publishedShows.value.reduce((total, show) => total + show.episodes.length, 0))
const featuredShows = computed(() =>
  featuredOrder
    .map((slug) => publishedShows.value.find((show) => show.slug === slug))
    .filter((show): show is NonNullable<typeof show> => Boolean(show)),
)
const groupedShows = computed(() =>
  contentLanes
    .map((lane) => ({
      ...lane,
      shows: publishedShows.value.filter((show) => show.categoryKey === lane.key),
    }))
    .filter((lane) => lane.shows.length),
)

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  document.title = 'MasonCast · 入口站'
})
</script>

<template>
  <main class="shell page-shell">
    <section class="hero">
      <div class="panel hero-copy">
        <span class="kicker">MasonCast</span>
        <h1>每天打开，就能读、能听。</h1>
        <p class="lead">历史线听学人与史料，也读沈醉的回忆录。家庭线写给年轻父母，也写给家里长辈。</p>
        <p class="summary">
          这是节目首页，不是文件夹，也不是临时播放器。《南渡北归》《人鬼之间》《李秀成供词》《家庭育儿系列》都从这里进。先看两档重点，其余按分类在下面。
        </p>

        <div class="actions">
          <button type="button" class="button primary" @click="scrollToSection('featured-shows')">进入节目</button>
          <button type="button" class="button ghost" @click="scrollToSection('all-shows')">全部目录</button>
        </div>

        <div class="metrics metrics-4">
          <div class="metric"><strong>{{ showCount }}</strong><span>节目</span></div>
          <div class="metric"><strong>2</strong><span>内容线</span></div>
          <div class="metric"><strong>{{ episodeCount }}</strong><span>分集</span></div>
          <div class="metric"><strong>书 / 声</strong><span>都能打开</span></div>
        </div>
      </div>
      <div class="panel hero-cover">
        <img :src="heroCover" alt="MasonCast 节目封面" />
      </div>
    </section>

    <section class="section" id="content-lanes">
      <div class="section-head">
        <div>
          <h2 class="section-title">内容分区</h2>
        </div>
        <p>历史一条线，家庭一条线。</p>
      </div>
      <div class="lane-grid">
        <article v-for="lane in contentLanes" :key="lane.key" class="panel lane-card">
          <div class="lane-top">
            <span class="tag">{{ lane.stateLabel }}</span>
            <span class="lane-count">{{ lane.showCount ? `${lane.showCount} 档` : '等待新增' }}</span>
          </div>
          <h3>{{ lane.title }}</h3>
          <p>{{ lane.description }}</p>
          <div class="lane-entry">{{ lane.entryLabel }}</div>
          <RouterLink v-if="lane.href" class="inline-link lane-link" :to="lane.href">进入这个分区 →</RouterLink>
          <span v-else class="inline-link lane-link muted-link">预留入口，后续补节目</span>
        </article>
      </div>
    </section>

    <section class="section" id="featured-shows">
      <div class="section-head">
        <div>
          <h2 class="section-title">正在听</h2>
        </div>
        <p>《南渡北归》与《人鬼之间》。</p>
      </div>
      <div class="featured-grid">
        <ShowCard v-for="show in featuredShows" :key="show.slug" :show="show" />
      </div>
    </section>

    <section class="section" id="all-shows">
      <div class="section-head">
        <div>
          <h2 class="section-title">节目目录</h2>
        </div>
        <p>点进去听，或打开书。</p>
      </div>
      <div class="catalog-groups">
        <section v-for="group in groupedShows" :key="group.key" class="catalog-group">
          <div class="catalog-group-head">
            <div>
              <h3>{{ group.title }}</h3>
              <p>{{ group.description }}</p>
            </div>
            <span class="catalog-group-count">{{ group.showCount }} 档</span>
          </div>
          <div class="directory-grid">
            <ShowDirectoryCard v-for="show in group.shows" :key="show.slug" :show="show" />
          </div>
        </section>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2 class="section-title">节目方向</h2>
        </div>
        <p>历史读人怎么活过；家庭听人怎么把孩子带大。</p>
      </div>
      <div class="callout-list">
        <div class="callout">
          <h4>历史</h4>
          <p>《南渡北归》长篇听。《人鬼之间》当书读。《李秀成供词》对着被改过的文本听。</p>
        </div>
        <div class="callout">
          <h4>家庭</h4>
          <p>《家庭育儿系列》给年轻父母，也给爷爷奶奶。从判断发烧、发育，听到家里最容易说乱的那几句。</p>
        </div>
        <div class="callout">
          <h4>这一页</h4>
          <p>只负责让人进得去。节目在各自的页里听完、读完。</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div>MasonCast · 入口站</div>
      <div>历史与家庭两条线。书和节目都从这里进。</div>
    </footer>
  </main>
</template>
