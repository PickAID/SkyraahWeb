// @ts-nocheck
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import vuetify from './vuetify'
import Footer from './components/Footer.vue'
import Fixer from './components/DarkFixer.vue'
import Layout from './Layout.vue'
import './style.css'
import '@mdit/plugin-spoiler/style'
import '@mdit/plugin-alert/style'
import "vitepress-markdown-timeline/dist/theme/index.css";
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import './styles/index.css'
import 'vitepress-plugin-nprogress/lib/css/index.css'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import vitepressNprogress from 'vitepress-plugin-nprogress'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      slot: () => h(DefaultTheme.Layout, null, {
        "layout-top" : () => h(Fixer),
        'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
        'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu), 
        "layout-bottom" : () => h(Footer),
      })
    })
  },
  
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(vuetify);
    enhanceAppWithTabs(ctx.app);
    vitepressNprogress(ctx);
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
