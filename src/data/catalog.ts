import type { Show } from '../types/content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const nanduEpisodes = [
  ['01', '第一章'], ['02', '第二章'], ['03', '第三章'], ['04', '第四章'], ['05', '第五章'],
  ['06', '第六章'], ['07', '第七章'], ['08', '第八章'], ['09', '第九章'], ['10', '第十章'],
  ['11', '第十一章'], ['12', '第十二章'], ['13', '第十三章'], ['14', '第十四章'],
  ['16', '第十六章'], ['17', '第十七章'], ['18', '第十八章'], ['19', '第十九章'],
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
    episodes: nanduEpisodes.map(([number, title]) => ({
      id: `nandu-${number}`,
      number: `EP${number}`,
      title,
      summary:
        '按原章节顺序收录《南渡北归》音频，便于连续收听，也便于从某一章重新进入这部关于时代与学人的长篇叙事。',
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
