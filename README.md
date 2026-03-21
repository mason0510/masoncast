# MasonCast

一个基于 Vue 3 + Vite 的历史播客静态站。

当前站点结构：

- Home：节目入口页
- Show Page：
  - 《南渡北归》
  - 《李秀成供词》
- Episode Cards：直接播放 / 下载

## 本地开发

```bash
pnpm install
pnpm dev
```

默认本地地址：

```bash
http://127.0.0.1:4173/
```

## 构建

```bash
pnpm build
pnpm exec vue-tsc --noEmit
```

## 部署

GitHub Actions 会在 `main` 分支 push 后自动部署到 GitHub Pages。

## 内容资产来源

- 《南渡北归》章节音频：R2 外链
- 《李秀成供词》：本地封面 + 本地 m4a 音频

## 当前产品原则

1. 首页只做节目级入口
2. 节目页承接分集
3. 不把站点做成音频仓库或单页工具页
