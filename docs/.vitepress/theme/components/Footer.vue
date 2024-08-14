<template>
    <v-footer style="background: transparent;">
        <v-row justify="center" align="end" no-gutters>
            <v-btn
            v-for="link in links"
            :key="link.code"
            class="mx-0 bold-text"
            color="grey-darken-1"
            rounded="xl"
            variant="text"
            :href="link.link"
            >
                <v-sheet class="pa-0 ma-0" color="transparent">
                    <v-icon :color="isDark ? 'grey-lighten-2' : 'primary'" size="14" :icon="link.icon" /> {{ link.code }}
                </v-sheet>
            </v-btn>
            <v-col style="color: grey" class="text-center text-large bold-text mt-2" cols="12">
                版权所有©{{ currentYear }}-{{beginYear}} {{author.code}}
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { useData } from 'vitepress';
export default {
    setup() {
        const { isDark } = useData();
        return { isDark };
    },
    data: () => ({
        links: [icp, police, support],
        currentYear,
        beginYear,
        author,
        support,
    }),
}
  
const currentYear = new Date().getFullYear()
const beginYear = '2024'
const author = {
    code: '椰浆',
    icon: 'mdi-copyright',
}
// ICP 备案
const icp = {
    code: '闽ICP备2023023682号-1',
    link: 'https://beian.miit.gov.cn/',
    icon: 'mdi-monitor',
}
// 公安备案
const police = {
    code: '闽公网安备35020602002951号',
    link: 'https://beian.mps.gov.cn/#/query/webSearch',
    icon: 'mdi-police-badge-outline',
}
const support = {
    code: '技术支持 厦门破碎工坊网络科技有限公司',
    link: 'https://www.crash.work/',
    icon: 'mdi-wrench-outline',
}
</script>
<style>
.text-large {
    font-size: 14px; /* 根据需要设置大小 */
}
.bold-text {
    font-weight: 400; /* 粗体 */
}
</style>
  