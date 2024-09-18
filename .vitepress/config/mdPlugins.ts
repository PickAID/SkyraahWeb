//@ts-nocheck
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
import { MarkdownOptions } from "vitepress"

export const mdPlugins: MarkdownOptions = {
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
}