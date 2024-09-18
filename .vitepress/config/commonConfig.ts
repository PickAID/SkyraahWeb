import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { Sidebar } from "../sidebar"
import { mdPlugins } from './mdPlugins';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

export const commonConfig :UserConfig<DefaultTheme.Config> = {
    srcDir: "./docs",
    title: "椰浆设定集",
    description: "一个专门用于存放设定的地方",
    themeConfig: {
        sidebar : {...Sidebar()},

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
        },

        nav: [
            { text: "小组项目设定", items: [
                {text: "首页", link: "/private"},
                {text: "整合包", link: "/private/modpack"}
            ]},
            { text: "组员私人设定集", items: [
                { text: "椰浆", link: '/skyraah'}
            ]}
        ]
    },
    markdown: {...mdPlugins},
    vite: {
        ssr: {
            noExternal: ['vuetify','@nolebase/vitepress-plugin-enhanced-readabilities',],
        },
        optimizeDeps: {
            exclude: [ 
                '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
            ], 
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
}