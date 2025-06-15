import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

import {commonConfig} from "./config/common-config"

/**
 * VitePress configuration with Mermaid support
 * Combines common configuration with locale-specific settings
 */
export default withMermaid(
    defineConfig({
        ...commonConfig
    })
);