
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import vuetify from './vuetify'
// import FooterContent from './components/FlexboxCopyrightIcpFooter.vue'
// import Layout from './Layout.vue'
import './style.css'
import '@mdit/plugin-spoiler/style'
import './styles/index.css'

export default {
  extends: DefaultTheme,
//  FooterContent,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      
      //"layout-bottom" : () => h(FooterContent)
    })
  },
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
  
  enhanceApp: (ctx) => {
    DefaultTheme.enhanceApp(ctx);
    //ctx.app.use(vuetify);
    //ctx.app.component(FooterContent);
    //ctx.app.use(Layout);
  },

  // setup() {
  //   Layout
  // }
} satisfies Theme
