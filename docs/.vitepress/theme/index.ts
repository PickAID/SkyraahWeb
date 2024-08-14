// @ts-nocheck
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import vuetify from './vuetify'
import Footer from './components/Footer.vue'
//import ILayout from './Layout.vue'
import './style.css'
import '@mdit/plugin-spoiler/style'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom" : () => h(Footer)
    })
  },
  
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(vuetify);
  },

  // setup() {
  //   Layout
  // }
} satisfies Theme
