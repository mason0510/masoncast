<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ShowCard from '../components/ShowCard.vue'
import ShowDirectoryCard from '../components/ShowDirectoryCard.vue'
import { contentLanes, shows } from '../data/catalog'

const publishedShows = computed(() => shows.filter((show) => show.status === 'published'))
const featuredOrder = ['rengui-zhijian', 'family-parenting', 'li-xiucheng', 'nandu-beigui'] as const
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
  document.title = 'MasonCast · Podcast Website'
})
</script>

<template>
  <main class="shell page-shell">
    <section class="hero">
      <div class="panel hero-copy">
        <span class="kicker">MasonCast / Podcast Website</span>
        <h1>把节目做成真正可持续收听的入口站。</h1>
        <p class="lead">MasonCast 现在同时有历史与家庭育儿两条内容线：一边做长篇历史与史料专题，一边做写给年轻父母和家里长辈的育儿节目。</p>
        <p class="summary">
          这里不是音频文件夹，也不是临时播放器，而是 MasonCast 的节目首页。当前已经上线《南渡北归》《李秀成供词》《家庭育儿系列》，首页先突出重点节目，完整目录与分类放在下方承接；以后节目增加到十档、二十档，结构也不用重做。
        </p>

        <div class="actions">
          <button type="button" class="button primary" @click="scrollToSection('featured-shows')">立即收听</button>
          <button type="button" class="button ghost" @click="scrollToSection('content-lanes')">先看分类</button>
        </div>

        <div class="metrics metrics-4">
          <div class="metric"><strong>{{ showCount }}</strong><span>已上线节目</span></div>
          <div class="metric"><strong>{{ contentLanes.length }}</strong><span>内容分区</span></div>
          <div class="metric"><strong>{{ episodeCount }}</strong><span>已收录章节 / 分集</span></div>
          <div class="metric"><strong>Mobile</strong><span>手机端同步适配</span></div>
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
        <p>先把入口做清楚：历史线继续做深，家庭 / 育儿线已经正式上线第一档节目，后续新增仍然按分区往里长。</p>
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
          <h2 class="section-title">推荐收听</h2>
        </div>
        <p>首页首屏只放重点节目，不让信息一上来就失控；完整目录交给下一屏承接。</p>
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
        <p>先按分类看，再进入具体节目页。节目继续增加时，首页仍然只负责入口，完整收听交给节目页。</p>
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
        <p>每条内容线各做各的，不混成一锅；但在同一个站里，都有稳定入口、节目页和可下载音频。</p>
      </div>
      <div class="callout-list">
        <div class="callout">
          <h4>历史内容继续做深</h4>
          <p>《南渡北归》负责长篇连续收听，《李秀成供词》负责专题密度，历史区继续沿着近代中国这一条主线往下长。</p>
        </div>
        <div class="callout">
          <h4>家庭 / 育儿先做成系列</h4>
          <p>《家庭育儿系列》已经从崔玉涛一路展开到鲍秀兰、发育焦虑与一岁宝宝打完麻腮风后的家庭误判，后面继续沿着喂养、睡眠、代际分歧和高频育儿场景往下长。</p>
        </div>
        <div class="callout">
          <h4>Home 只做入口，不做堆砌</h4>
          <p>首页负责给人看到重点节目、理解分类，然后自然进入节目页；节目变多以后，也不会退化成一页音频文件清单。</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div>Podcast website: MasonCast</div>
      <div>当前已上线 3 档节目，内容分成历史与家庭 / 育儿两条线。</div>
    </footer>
  </main>
</template>
