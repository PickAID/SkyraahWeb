// @ts-nocheck
import { defineConfig } from 'vitepress'
import { SidebarGenerator } from "./utils/sidebarGenerator"
import { spoiler } from "@mdit/plugin-spoiler"
import { abbr } from "@mdit/plugin-abbr"
import { align } from "@mdit/plugin-align"
import { ins } from "@mdit/plugin-ins"
import { mark } from "@mdit/plugin-mark"
import { ruby } from "@mdit/plugin-ruby"

export default defineConfig({
  title: "椰浆设定集",
  description: "一个专门用于存放设定的地方",
  themeConfig: {
    sidebar : {
      "zh_cn/transdeceit/": [new SidebarGenerator("docs/zh_cn/transdeceit").sidebar],
      "zh_cn/akashic/": [new SidebarGenerator("docs/zh_cn/akashic").sidebar],
    },

    outline: {
      level: [2,6],
      label: "文章目录"
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/skyraah/SkyraahWeb' }
    ],
  },
  markdown: {
    config: (md) => {
      md.use(spoiler);
      md.use(abbr);
      md.use(align);
      md.use(ins);
      md.use(mark);
      md.use(ruby);
    }
  },
  footer: {
    message: '<a href="https://beian.miit.gov.cn/">闽ICP备2023023682号-1</a>.',
    copyright: '<a href="https://beian.mps.gov.cn/#/query/webSearch">闽公网安备35020602002951号</a>.'
  }
})