import type { Show } from '../types/content'

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
      '《南渡北归》围绕战争、迁徙、学统与人物命运展开，写的是大时代里一代学人的离散、守望与归来。这里按章节收录全书音频，既适合从头顺听，也适合回到某一章重新进入那一段历史。',
    coverUrl: asset('assets/covers/nandu-beigui-cover.svg'),
    homeTag: 'Longform Audiobook',
    homeDescription:
      '围绕二十世纪中国知识分子的南迁、离散与重聚，把厚重书卷变成可以连续收听的长篇历史音频。',
    badges: ['18 章', 'Longform Audio', '历史叙事'],
    statement:
      '从时代巨变中的学人迁徙，到风雨飘摇中的学术脉络与个人命运，《南渡北归》关注的不是某一个孤立人物，而是一整个时代的精神史、离乱史与回望史。',
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
]

export const showMap = Object.fromEntries(shows.map((show) => [show.slug, show])) as Record<string, Show>
