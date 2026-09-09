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
  document.title = 'MasonCast · 入口站'
})
</script>

<template>
  <main class="shell page-shell">
    <section class="hero">
      <div class="panel hero-copy">
        <span class="kicker">MasonCast / 入口站</span>
        <h1>每天打开，就能读、能听、能往下走。</h1>
        <p class="lead">MasonCast 是我们的节目首页。历史线做长篇与史料，也做沈醉这样的回忆录书；家庭线做写给年轻父母和家里长辈的育儿节目。</p>
        <p class="summary">
          这里不是音频文件夹，也不是临时播放器。书、有声书、专题，都从这一页进去。已经上线《人鬼之间》《南渡北归》《李秀成供词》《家庭育儿系列》。上面先放正在听的，下面按分类列全。以后十档、二十档，还是这个门，不用另起一站。
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
        <p>先认门：历史是一条线，家庭是一条线。新节目按线往里加，不混成一锅。</p>
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
        <p>先看见正在听的。其余节目在下面的目录里。</p>
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
        <p>按分类进节目页。首页只负责领路，听和读都在节目里完成。</p>
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
        <p>同一扇门，两条线。历史读人怎么活；家庭听人怎么带孩子。都不做成一次性播放器。</p>
      </div>
      <div class="callout-list">
        <div class="callout">
          <h4>历史：书、长篇、史料</h4>
          <p>《人鬼之间》是沈醉的回忆录，当书来读。《南渡北归》连续听学人离散。《李秀成供词》把被改过的文本放回现场。</p>
        </div>
        <div class="callout">
          <h4>家庭：给父母，也给长辈</h4>
          <p>《家庭育儿系列》从崔玉涛、鲍秀兰，听到一岁宝宝打完麻腮风后家里最容易误判的事。后面仍按喂养、睡眠、代际分歧往下长。</p>
        </div>
        <div class="callout">
          <h4>这一页只领路</h4>
          <p>看见重点，认清分类，点进节目。节目再多，这里也不会变成一排音频文件。</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div>MasonCast · 入口站</div>
      <div>历史与家庭两条线。书和节目都从这里进。</div>
    </footer>
  </main>
</template>
