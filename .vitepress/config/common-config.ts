import { DefaultTheme, UserConfig } from 'vitepress'
import { markdown } from './markdown-plugins';
import { getSidebarSync, sidebarPlugin } from '../utils/sidebar/';
import { resolve } from 'path';
import { fileURLToPath } from "node:url";
import {
    groupIconVitePlugin,
    localIconLoader,
} from "vitepress-plugin-group-icons";

export const commonConfig :UserConfig<DefaultTheme.Config> = {
    lang: "zh-CN",
    srcDir: "./docs",
    title: "设定集",
    description: "一个专门用于存放设定的地方",
    cleanUrls:true,
    themeConfig: {
        sidebar : getSidebarSync(""),
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
    markdown: {...markdown},
    vite: {
        optimizeDeps: {
            exclude: [
                "@nolebase/vitepress-plugin-git-changelog",
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-inline-link-preview",
                "shiki-magic-move",
                "virtual:nolebase-git-changelog"
            ],
            include: [
                'vue',
                '@vueuse/core',
                'mermaid',
                'vitepress-plugin-nprogress',
                'vitepress-plugin-tabs/client',
                '@lite-tree/vue'
            ]
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['vue'],
                        ui: ['vuetify'],
                        charts: ['mermaid', 'echarts'],
                        markdown: ['markdown-it', 'shiki-magic-move']
                    }
                }
            },
            chunkSizeWarningLimit: 1000,
            target: 'esnext',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        ssr: {
            noExternal: [
                "vuetify",
                "@nolebase/*",
                "vitepress-plugin-tabs",
                "shiki-magic-move"
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern",
                },
            },
        },
        plugins: [
            sidebarPlugin({
                languages: [''],
                debug: process.env.NODE_ENV === 'development',
                docsDir: './docs',
                cacheDir: './.vitepress/cache/sidebar'
            }),
            groupIconVitePlugin({
                customIcon: {
                    mcmeta: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/minecraft.svg"
                    ),
                    json: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/json.svg"
                    ),
                    md: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/markdown.svg"
                    ),
                    kubejs: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/kubejs.svg"
                    ),
                    js: "logos:javascript",
                    sh: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/powershell.svg"
                    ),
                    npm: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/npm.svg"
                    ),
                    neoforge: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/neoforge.svg"
                    ),
                    forge: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/forge.svg"
                    ),
                    fabric: localIconLoader(
                        import.meta.url,
                        "../../docs/public/svg/fabric.svg"
                    ),
                    ts: "logos:typescript-icon-round",
                    java: "logos:java",
                    css: "logos:css-3",
                    git: "logos:git-icon",
                },
            })
        ],
        resolve: {
            alias: [
                {
                    find: "@utils",
                    replacement: resolve(__dirname, "../utils"),
                },
                {
                    find: "@components",
                    replacement: resolve(__dirname, "../theme/components"),
                },
            ],
        }       
    },
    ignoreDeadLinks: true,
    transformHead({ assets }) {
        const preloadLinks = [];
        
        const scFontFile = assets.find(file => /HarmonyOS_Sans_SC_Regular\.[\w-]+\.ttf/.test(file));
        console.log(scFontFile);
        if (scFontFile) {
            preloadLinks.push([
                'link',
                {
                    rel: 'preload',
                    href: scFontFile,
                    as: 'font',
                    type: 'font/ttf',
                    crossorigin: ''
                }
            ]);
        }

        const tcFontFile = assets.find(file => /HarmonyOS_Sans_TC_Regular\.[\w-]+\.ttf/.test(file));
        if (tcFontFile) {
            preloadLinks.push([
                'link',
                {
                    rel: 'preload',
                    href: tcFontFile,
                    as: 'font',
                    type: 'font/ttf',
                    crossorigin: ''
                }
            ]);
        }

        return [
            ...preloadLinks,
            // ["link", { rel: "icon", href: "https://docs.mihono.cn/favicon.ico" }],
        ];
    },
}