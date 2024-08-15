//// @ts-nocheck
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import vuetify from './vuetify'
import Footer from './components/Footer.vue'
import Fixer from './components/DarkFixer.vue'
//import ILayout from './Layout.vue'
import './style.css'
import '@mdit/plugin-spoiler/style'
import './styles/index.css'
import "vitepress-markdown-timeline/dist/theme/index.css";

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-top" : () => h(Fixer),
      "layout-bottom" : () => h(Footer),
    })
  },
  
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(vuetify);
  },

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
} satisfies Theme
