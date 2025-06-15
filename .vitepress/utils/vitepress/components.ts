import type { App } from 'vue';
import {
    ArticleMetadata,
    Linkcard,
    ResponsibleEditor,
    MdDialog,
    MdMultiPageDialog,
    CustomAlert
} from "../../theme/components/content";
import { YoutubeVideo, BilibiliVideo, PdfViewer } from "../../theme/components/media";
import { Footer, MNavLinks } from "../../theme/components/navigation";
import {
    Carousels,
    Animation,
    Preview,
    NotFound,
} from "../../theme/components/ui";
import MagicMoveContainer from "../../theme/components/ui/MagicMoveContainer.vue";
import { defineAsyncComponent } from 'vue';
import { LiteTree } from "@lite-tree/vue";

// Async components
const MinecraftAdvancedDamageChart = defineAsyncComponent(() => import("../../theme/components/content/minecraft-advanced-damage-chart.vue"));

// Component registry
const components = {
    MdCarousel: Carousels,
    YoutubeVideo,
    BilibiliVideo,
    DamageChart: MinecraftAdvancedDamageChart,
    ArticleMetadata,
    Linkcard,
    MNavLinks,
    PdfViewer,
    LiteTree,
    MagicMoveContainer,
    ResponsibleEditor,
    Animation,
    Preview,
    NotFound,
    // Vuetify components
    MdDialog,
    MdMultiPageDialog,
    CustomAlert
};

export const registerComponents = (app: App) => {
    // Register all components
    Object.entries(components).forEach(([name, component]) => {
        if (component) {
            app.component(name, component);
        }
    });
}; 