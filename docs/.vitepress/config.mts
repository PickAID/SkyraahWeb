//// @ts-nocheck
import { defineConfig } from 'vitepress'
import { SidebarGenerator } from "./utils/sidebarGenerator"

import { spoiler } from "@mdit/plugin-spoiler"
import { abbr } from "@mdit/plugin-abbr"
import { align } from "@mdit/plugin-align"
import { ins } from "@mdit/plugin-ins"
import { mark } from "@mdit/plugin-mark"
import { ruby } from "@mdit/plugin-ruby"
import timeline from "vitepress-markdown-timeline"; 
import { alert } from "@mdit/plugin-alert";
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { tasklist } from "@mdit/plugin-tasklist"
import { dl } from "@mdit/plugin-dl";

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  title: "椰浆设定集",
  description: "一个专门用于存放设定的地方",
  themeConfig: {
    sidebar : {
      "zh_cn/transdeceit/": [new SidebarGenerator("docs/zh_cn/transdeceit").sidebar],
      "zh_cn/akashic/": [new SidebarGenerator("docs/zh_cn/akashic").sidebar],
      "zh_cn/lying_world/": [new SidebarGenerator("docs/zh_cn/lying_world").sidebar],
    },

    outline: {
      level: [2,6],
      label: "文章目录"
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/skyraah/SkyraahWeb' }
    ],

    docFooter:{
      prev: "上一页",
      next: "下一页"
    }
  },
  markdown: {
    math:true,
    config: (md) => {
      md.use(spoiler);
      md.use(abbr);
      md.use(align);
      md.use(ins);
      md.use(mark);
      md.use(ruby);
      md.use(timeline);
      md.use(alert);
      md.use(tabsMarkdownPlugin);
      md.use(tasklist);
      md.use(dl);
    }
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    plugins: [
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
    ],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    },
  },
})