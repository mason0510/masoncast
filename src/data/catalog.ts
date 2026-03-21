import type { ContentLane, ContentLaneKey, Show } from '../types/content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const nanduEpisodes = [
  ['01', '第一章', '从书卷世界与人物关系入手，先把那个尚未完全倾覆的学术中国缓缓铺开。'],
  ['02', '第二章', '风雨渐近，城市气氛、校园秩序与人物心境都开始出现不易察觉的变化。'],
  ['03', '第三章', '真正的动荡开始逼近，去留未定的人们第一次被时代推着做出选择。'],
  ['04', '第四章', '离散成为现实之后，迁徙、失序与仓促安顿构成这一章最直接的历史质感。'],
  ['05', '第五章', '在漂泊与战火之间，学人与家庭、职业、理想之间的张力开始同时显形。'],
  ['06', '第六章', '这一章更能听见乱世中的读书声：条件简陋，但学术与人格没有轻易垮下去。'],
  ['07', '第七章', '战争拖长之后，个人命运不再只是背景板，而是一步步被时代重新改写。'],
  ['08', '第八章', '师友、同道与旧交在此重新交织，让历史不只剩大事件，也保留人的温度。'],
  ['09', '第九章', '从讲坛到流亡日常，这一章把知识分子在非常时期的生存方式写得更近。'],
  ['10', '第十章', '局势仍在翻涌，而人物之间的坚持、犹疑与妥协也开始变得更复杂。'],
  ['11', '第十一章', '这一章更像一次回望：在连续震荡中，哪些价值被守住，哪些东西已悄然失落。'],
  ['12', '第十二章', '随着战争深入，学术共同体的韧性与脆弱同时暴露出来，格外值得细听。'],
  ['13', '第十三章', '历史不再只是外部压力，它已经进入每个人的日常、关系与内心判断。'],
  ['14', '第十四章', '从这一章开始，离乱后的秩序重组变得更明显，人物命运也走向新的岔口。'],
  ['16', '第十六章', '旧时代的余绪尚未散尽，新现实却已经压上来，这一章听得到明显的转场感。'],
  ['17', '第十七章', '在更大的历史转折前夜，知识分子的选择不再抽象，而是具体而沉重。'],
  ['18', '第十八章', '这里更适合慢下来听：人与时代的关系，已经从被动承受转为深刻反思。'],
  ['19', '第十九章', '作为后段收束，这一章把漂泊、守望与归去交织起来，留下很长的回声。'],
] as const

export const shows: Show[] = [
  {
    showNumber: '节目 01',
    slug: 'nandu-beigui',
    title: '南渡北归',
    eyebrow: 'Longform Audiobook / History Narrative',
    lead: '一部围绕二十世纪中国知识分子命运展开的长篇有声节目。',
    summary:
      '《南渡北归》围绕战争、迁徙、学统与人物命运展开，写的是大时代里一代学人的离散、守望与归来。这里按章节顺序收录全书音频，既适合连续收听，也适合从某一章重新进入。',
    coverUrl: asset('assets/covers/nandu-beigui-cover.svg'),
    homeTag: 'Longform Audiobook',
    homeDescription:
      '围绕二十世纪中国知识分子的南迁、离散与重聚，把厚重书卷变成可以连续收听的长篇历史音频。',
    badges: ['18 章', 'Longform Audio', '历史叙事'],
    statement:
      '从时代巨变中的学人迁徙，到风雨飘摇中的学术脉络与个人命运，《南渡北归》关注的不是某一个孤立人物，而是一整个时代的精神史、离乱史与回望史。',
    categoryKey: 'history',
    categoryLabel: '历史',
    status: 'published',
    episodes: nanduEpisodes.map(([number, title, summary]) => ({
      id: `nandu-${number}`,
      number: `EP${number}`,
      title,
      summary,
      audioUrl: `https://pub-87cd59069cf0444aad048f7bddec99af.r2.dev/audio/2025-12-28/nandu_beigui_${number}.mp3`,
      tags: [`Chapter ${number}`, '有声书', 'R2 音频'],
      external: true,
    })),
  },
  {
    showNumber: '节目 02',
    slug: 'li-xiucheng',
    title: '李秀成供词',
    eyebrow: 'Special Series / Late Qing Archives',
    lead: '围绕李秀成自述、删改痕迹与狱中手稿展开的晚清历史播客。',
    summary:
      '这是一组 5 集专题，围绕李秀成供词、曾国藩朱笔删改、绝笔缺页与狱中手稿展开，试图把一份被反复改写的晚清文本重新放回历史现场。',
    coverUrl: asset('assets/covers/li-xiucheng-series-cover-v2.png'),
    homeTag: 'Historical Podcast Series',
    homeDescription:
      '从供词删改、缺页残稿到朱笔批校与狱中遗稿，重返李秀成最后的书写现场。',
    badges: ['5 集', '约 99 分钟', '晚清手稿视觉母版'],
    statement:
      '李秀成留下的，不只是败亡者的一篇供词，也是晚清权力如何改写文本、塑造记忆的一处现场。五集节目沿着删改、缺页、批校与遗稿层层推进，把这份史料重新读给今天的人听。',
    categoryKey: 'history',
    categoryLabel: '历史',
    status: 'published',
    episodes: [
      {
        id: 'li-01',
        number: 'EP01',
        title: '曾国藩删改供词',
        summary: '从供词原文出发，追踪谁动了笔、删掉了什么，以及这些删改如何改变后人理解太平天国与李秀成的方式。',
        audioUrl: asset('assets/li-xiucheng/audio/ep01.m4a'),
        coverUrl: asset('assets/covers/li-xiucheng-ep01-cover.png'),
        duration: '17:34',
        size: '32 MB',
        tags: ['删改供词', '晚清史料', '可下载'],
        downloadName: '李秀成供词-EP01-曾国藩删改供词.m4a',
      },
      {
        id: 'li-02',
        number: 'EP02',
        title: '李秀成绝笔中消失的一万字',
        summary: '围绕残稿、缺页和被抽离的关键段落，讨论为什么最重要的内容会恰好消失。',
        audioUrl: asset('assets/li-xiucheng/audio/ep02.m4a'),
        coverUrl: asset('assets/covers/li-xiucheng-ep02-cover.png'),
        duration: '21:24',
        size: '39 MB',
        tags: ['缺页真相', '晚清史料', '可下载'],
        downloadName: '李秀成供词-EP02-李秀成绝笔中消失的一万字.m4a',
      },
      {
        id: 'li-03',
        number: 'EP03',
        title: '曾国藩红笔下的李秀成自述',
        summary: '朱笔删线、圈点与旁批压在原始自述之上，直接呈现作者原声与权力改写之间的文本斗争。',
        audioUrl: asset('assets/li-xiucheng/audio/ep03.m4a'),
        coverUrl: asset('assets/covers/li-xiucheng-ep03-cover.png'),
        duration: '21:28',
        size: '40 MB',
        tags: ['红笔批校', '文本斗争', '可下载'],
        downloadName: '李秀成供词-EP03-曾国藩红笔下的李秀成自述.m4a',
      },
      {
        id: 'li-04',
        number: 'EP04',
        title: '李秀成亲笔复盘太平天国崩塌',
        summary: '不是宏大叙事，而是败亡者自己的复盘：战争如何崩塌，局势如何失控，文字又如何被后人重新包装。',
        audioUrl: asset('assets/li-xiucheng/audio/ep04.m4a'),
        coverUrl: asset('assets/covers/li-xiucheng-ep04-cover.png'),
        duration: '20:54',
        size: '38 MB',
        tags: ['败局复盘', '太平天国', '可下载'],
        downloadName: '李秀成供词-EP04-李秀成亲笔复盘太平天国崩塌.m4a',
      },
      {
        id: 'li-05',
        number: 'EP05',
        title: '李秀成狱中手稿真相',
        summary: '回到最安静也最残酷的一层：狱中留下的手稿，到底还剩多少真实，又有哪些段落被重新定义。',
        audioUrl: asset('assets/li-xiucheng/audio/ep05.m4a'),
        coverUrl: asset('assets/covers/li-xiucheng-ep05-cover.png'),
        duration: '18:45',
        size: '35 MB',
        tags: ['狱中遗稿', '手稿真相', '可下载'],
        downloadName: '李秀成供词-EP05-李秀成狱中手稿真相.m4a',
      },
    ],
  },
  {
    showNumber: '节目 03',
    slug: 'family-parenting',
    title: '家庭育儿系列',
    eyebrow: 'Family / Parenting / Practical Care',
    lead: '写给年轻父母，也写给爷爷奶奶。',
    summary:
      '这条内容线围绕常见病、发育、喂养、家庭分歧与养育判断展开，不把育儿做成碎片问答，而是做成一家人都能反复收听、逐步形成共识的节目。',
    coverUrl: asset('assets/covers/family-parenting-series-cover.svg'),
    homeTag: 'Family / Parenting',
    homeDescription:
      '从崔玉涛、鲍秀兰，到一岁宝宝打完麻腮风后的家庭误判，把发烧、发育与家庭分歧做成适合长期收听的节目。',
    badges: ['3 集', '约 21 分钟', '写给父母与长辈'],
    statement:
      '家庭育儿系列不想把养娃问题做成零碎问答，也不想把任何一个医生神化成唯一答案。更实际的目标，是把常见病、发育、喂养、代际分歧和家庭判断做成可回听的节目，让年轻父母与家里长辈能在同一套语言里讨论孩子。',
    categoryKey: 'family',
    categoryLabel: '家庭 / 育儿',
    status: 'published',
    episodes: [
      {
        id: 'family-01',
        number: 'EP01',
        title: '为什么这一代家长几乎都绕不开崔玉涛',
        summary:
          '这一期不神化，也不否定，只讨论一件更实在的事：崔玉涛为什么会成为一代中国家庭的公共参考，以及普通家庭到底该怎么正确使用这一路内容。',
        audioUrl: asset('assets/parenting/audio/ep01-cuiyutao/ep01-cuiyutao.mp3'),
        duration: '10:01',
        size: '9.6 MB',
        tags: ['崔玉涛', '家庭判断', '可下载'],
        downloadName: '家庭育儿系列-EP01-为什么这一代家长几乎都绕不开崔玉涛.mp3',
      },
      {
        id: 'family-02',
        number: 'EP02',
        title: '为什么发育焦虑型家庭更容易走向鲍秀兰',
        summary:
          '这期不讨论谁更权威，而是讨论另一件更关键的事：为什么一旦家庭的核心痛点变成发育、筛查和窗口，内容路线就会从常见病判断，慢慢切到发育焦虑与早期识别。',
        audioUrl: asset('assets/parenting/audio/ep02-baoxiulan/ep02-baoxiulan.mp3'),
        duration: '5:43',
        size: '5.5 MB',
        tags: ['鲍秀兰', '发育焦虑', '可下载'],
        downloadName: '家庭育儿系列-EP02-为什么发育焦虑型家庭更容易走向鲍秀兰.mp3',
      },
      {
        id: 'family-03',
        number: 'EP03',
        title: '一岁宝宝打完麻腮风后发烧，家里最容易误判什么',
        summary:
          '把第八天发烧、轻疹、贫血、传染性和联合疫苗风险这些最容易被家里说乱的点拆开讲：哪些仍可能落在典型接种反应时间窗里，哪些不能粗暴归因给疫苗。',
        audioUrl: asset('assets/parenting/audio/ep03-mmr-fever/ep03-mmr-fever.mp3'),
        duration: '5:35',
        size: '5.4 MB',
        tags: ['麻腮风', '疫苗后发热', '可下载'],
        downloadName: '家庭育儿系列-EP03-一岁宝宝打完麻腮风后发烧，家里最容易误判什么.mp3',
      },
    ],
  },
]

const laneMeta: Record<ContentLaneKey, Omit<ContentLane, 'showCount' | 'stateLabel' | 'entryLabel' | 'href'>> = {
  history: {
    key: 'history',
    title: '历史',
    description: '当前主内容区。收录《南渡北归》《李秀成供词》这类围绕近代中国、人物命运与文本现场展开的节目。',
  },
  family: {
    key: 'family',
    title: '家庭 / 育儿',
    description: '当前已上线《家庭育儿系列》。围绕常见病、发育、喂养与代际分歧，把最容易把人搞乱的育儿问题整理成能反复收听的节目。',
  },
}

export const contentLanes: ContentLane[] = (Object.keys(laneMeta) as ContentLaneKey[]).map((key) => {
  const laneShows = shows.filter((show) => show.categoryKey === key && show.status === 'published')

  return {
    ...laneMeta[key],
    showCount: laneShows.length,
    stateLabel: laneShows.length ? `已上线 ${laneShows.length} 档` : '筹备中',
    entryLabel: laneShows.length ? laneShows.map((show) => show.title).join(' / ') : '预留给未来新增节目',
    href: laneShows[0] ? `/show/${laneShows[0].slug}` : undefined,
  }
})

export const showMap = Object.fromEntries(shows.map((show) => [show.slug, show])) as Record<string, Show>
