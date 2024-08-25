// docs/.vitepress/config.mts
import { defineConfig } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0_axios@1.7.3_markdown-it-math_3wiucddyivl5zofkttytugf674/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/utils/sidebarGenerator.ts
import path from "path";
import fs from "fs";
import matter from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
var __vite_injected_original_dirname = "G:\\minecraft\\projects\\SkyraahWeb\\docs\\.vitepress\\utils";
var SidebarGenerator = class _SidebarGenerator {
  dirPath;
  correctedPathname;
  pathname;
  items;
  _sidebar;
  isTop;
  static DIR_PATH = path.resolve();
  static BLACK_LIST = [
    ".vitepress",
    "node_modules",
    "assets"
  ];
  constructor(pathname, isTop) {
    this._sidebar = {
      text: "",
      items: []
    };
    this.pathname = pathname;
    this.dirPath = path.join(_SidebarGenerator.DIR_PATH, pathname);
    this.items = this.filterOutWhiteList(fs.readdirSync(this.dirPath), _SidebarGenerator.BLACK_LIST);
    this.correctedPathname = this.pathname.replace(/^docs\//, "/");
    this.isTop = isTop;
    this.builder();
    this.logger(JSON.stringify(this._sidebar, null, 2));
  }
  get sidebar() {
    return this._sidebar;
  }
  builder() {
    if (this.isTop) this._sidebar.items.unshift({
      text: "\u56DE\u5230\u4E0A\u7EA7",
      link: ".."
    });
    const root = this.indexReader()?.root;
    if (root) {
      const rootTitle = root.title;
      const subDirs = root.subDir;
      this._sidebar.text = rootTitle;
      this._sidebar.collapsed = root.collapsed;
      subDirs.forEach((subDir) => {
        const subSideBar = {
          text: "",
          items: []
        };
        const subDirPath = path.join(this.dirPath, subDir.path);
        if (this.isDir(subDirPath)) {
          subSideBar.text = subDir.title;
          subSideBar.collapsed = subDir.collapsed;
          this._sidebar.items.push(subSideBar);
          const subDirContainer = new _SidebarGenerator(`${this.pathname}/${subDir.path}`, false);
          subDirContainer._sidebar.items.forEach((item) => {
            subSideBar.items.push(item);
          });
        }
      });
    }
    this.items.forEach((item) => {
      const filePath = path.join(this.dirPath, item);
      const file = this.fileReader(filePath);
      if (!this.isDir(filePath) && !file?.noguide) {
        const itemWithoutMd = item.replace(/\.md$/i, "");
        this._sidebar.items.push({
          text: file?.title || itemWithoutMd,
          link: `${this.correctedPathname}/${itemWithoutMd}`
        });
      }
    });
  }
  isDir(path2) {
    return fs.lstatSync(path2).isDirectory();
  }
  fileReader(filePath) {
    try {
      const fileObject = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileObject);
      if (data) {
        return data;
      } else {
        throw new Error("Invalid file format");
      }
    } catch (error) {
      return null;
    }
  }
  indexReader() {
    try {
      const indexPath = path.join(this.dirPath, "index.md");
      const indexFile = fs.readFileSync(indexPath, "utf8");
      const { data } = matter(indexFile);
      if (data.root && Array.isArray(data.root.subDir)) {
        return data;
      } else {
        throw new Error("Invalid index file format");
      }
    } catch (error) {
      return null;
    }
  }
  logger(string) {
    fs.writeFileSync(path.join(__vite_injected_original_dirname, "dev.log"), `${string}
`, { flag: "a+" });
  }
  filterOutWhiteList = (files, blackList) => files.filter((file) => !blackList.includes(file));
};

// docs/.vitepress/config.mts
import { spoiler } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-spoiler@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-spoiler/lib/index.js";
import { abbr } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-abbr@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-abbr/lib/index.js";
import { align } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-align@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-align/lib/index.js";
import { ins } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-ins@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-ins/lib/index.js";
import { mark } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-mark@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-mark/lib/index.js";
import { ruby } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-ruby@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-ruby/lib/index.js";
import timeline from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/vitepress-markdown-timeline@1.2.1/node_modules/vitepress-markdown-timeline/dist/cjs/index.cjs.js";
import { alert } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-alert@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-alert/lib/index.js";
import { tabsMarkdownPlugin } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__oeu3ekvxpxth7poccrppbgtnwu/node_modules/vitepress-plugin-tabs/dist/index.js";
import { tasklist } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-tasklist@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-tasklist/lib/index.js";
import { dl } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/@mdit+plugin-dl@0.13.0_markdown-it@14.1.0/node_modules/@mdit/plugin-dl/lib/index.js";
import AutoImport from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/unplugin-auto-import@0.18.2_@vueuse+core@10.11.1_vue@3.4.37_typescript@5.5.4___rollup@4.20.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { TDesignResolver } from "file:///G:/minecraft/projects/SkyraahWeb/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.js";
var config_default = defineConfig({
  title: "\u6930\u6D46\u8BBE\u5B9A\u96C6",
  description: "\u4E00\u4E2A\u4E13\u95E8\u7528\u4E8E\u5B58\u653E\u8BBE\u5B9A\u7684\u5730\u65B9",
  themeConfig: {
    sidebar: {
      "transdeceit/": [new SidebarGenerator("docs/transdeceit", true).sidebar],
      "akashic/": [new SidebarGenerator("docs/akashic", true).sidebar],
      "private/modpack/": [new SidebarGenerator("docs/private/modpack", true).sidebar],
      "private/modpack/lying_world/": [new SidebarGenerator("docs/private/modpack/lying_world", true).sidebar]
    },
    outline: {
      level: [2, 6],
      label: "\u6587\u7AE0\u76EE\u5F55"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/skyraah/SkyraahWeb" }
    ],
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    }
  },
  markdown: {
    math: true,
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
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"]
    },
    plugins: [
      AutoImport({
        resolvers: [TDesignResolver({
          library: "vue-next"
        })]
      }),
      Components({
        resolvers: [TDesignResolver({
          library: "vue-next"
        })]
      })
    ],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3V0aWxzL3NpZGViYXJHZW5lcmF0b3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxtaW5lY3JhZnRcXFxccHJvamVjdHNcXFxcU2t5cmFhaFdlYlxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXG1pbmVjcmFmdFxcXFxwcm9qZWN0c1xcXFxTa3lyYWFoV2ViXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9HOi9taW5lY3JhZnQvcHJvamVjdHMvU2t5cmFhaFdlYi9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiOy8vLy8gQHRzLW5vY2hlY2tcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcbmltcG9ydCB7IFNpZGViYXJHZW5lcmF0b3IgfSBmcm9tIFwiLi91dGlscy9zaWRlYmFyR2VuZXJhdG9yXCJcblxuaW1wb3J0IHsgc3BvaWxlciB9IGZyb20gXCJAbWRpdC9wbHVnaW4tc3BvaWxlclwiXG5pbXBvcnQgeyBhYmJyIH0gZnJvbSBcIkBtZGl0L3BsdWdpbi1hYmJyXCJcbmltcG9ydCB7IGFsaWduIH0gZnJvbSBcIkBtZGl0L3BsdWdpbi1hbGlnblwiXG5pbXBvcnQgeyBpbnMgfSBmcm9tIFwiQG1kaXQvcGx1Z2luLWluc1wiXG5pbXBvcnQgeyBtYXJrIH0gZnJvbSBcIkBtZGl0L3BsdWdpbi1tYXJrXCJcbmltcG9ydCB7IHJ1YnkgfSBmcm9tIFwiQG1kaXQvcGx1Z2luLXJ1YnlcIlxuaW1wb3J0IHRpbWVsaW5lIGZyb20gXCJ2aXRlcHJlc3MtbWFya2Rvd24tdGltZWxpbmVcIjsgXG5pbXBvcnQgeyBhbGVydCB9IGZyb20gXCJAbWRpdC9wbHVnaW4tYWxlcnRcIjtcbmltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tdGFicydcbmltcG9ydCB7IHRhc2tsaXN0IH0gZnJvbSBcIkBtZGl0L3BsdWdpbi10YXNrbGlzdFwiXG5pbXBvcnQgeyBkbCB9IGZyb20gXCJAbWRpdC9wbHVnaW4tZGxcIjtcblxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IFREZXNpZ25SZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcIlx1NjkzMFx1NkQ0Nlx1OEJCRVx1NUI5QVx1OTZDNlwiLFxuICBkZXNjcmlwdGlvbjogXCJcdTRFMDBcdTRFMkFcdTRFMTNcdTk1RThcdTc1MjhcdTRFOEVcdTVCNThcdTY1M0VcdThCQkVcdTVCOUFcdTc2ODRcdTU3MzBcdTY1QjlcIixcbiAgdGhlbWVDb25maWc6IHtcbiAgICBzaWRlYmFyIDoge1xuICAgICAgXCJ0cmFuc2RlY2VpdC9cIjogW25ldyBTaWRlYmFyR2VuZXJhdG9yKFwiZG9jcy90cmFuc2RlY2VpdFwiLCB0cnVlKS5zaWRlYmFyXSxcbiAgICAgIFwiYWthc2hpYy9cIjogW25ldyBTaWRlYmFyR2VuZXJhdG9yKFwiZG9jcy9ha2FzaGljXCIsIHRydWUpLnNpZGViYXJdLFxuICAgICAgXCJwcml2YXRlL21vZHBhY2svXCI6IFtuZXcgU2lkZWJhckdlbmVyYXRvcihcImRvY3MvcHJpdmF0ZS9tb2RwYWNrXCIsIHRydWUpLnNpZGViYXJdLFxuICAgICAgXCJwcml2YXRlL21vZHBhY2svbHlpbmdfd29ybGQvXCI6IFtuZXcgU2lkZWJhckdlbmVyYXRvcihcImRvY3MvcHJpdmF0ZS9tb2RwYWNrL2x5aW5nX3dvcmxkXCIsIHRydWUpLnNpZGViYXJdLFxuICAgIH0sXG5cbiAgICBvdXRsaW5lOiB7XG4gICAgICBsZXZlbDogWzIsNl0sXG4gICAgICBsYWJlbDogXCJcdTY1ODdcdTdBRTBcdTc2RUVcdTVGNTVcIlxuICAgIH0sXG5cbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9za3lyYWFoL1NreXJhYWhXZWInIH1cbiAgICBdLFxuXG4gICAgZG9jRm9vdGVyOntcbiAgICAgIHByZXY6IFwiXHU0RTBBXHU0RTAwXHU5ODc1XCIsXG4gICAgICBuZXh0OiBcIlx1NEUwQlx1NEUwMFx1OTg3NVwiXG4gICAgfVxuICB9LFxuICBtYXJrZG93bjoge1xuICAgIG1hdGg6dHJ1ZSxcbiAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgbWQudXNlKHNwb2lsZXIpO1xuICAgICAgbWQudXNlKGFiYnIpO1xuICAgICAgbWQudXNlKGFsaWduKTtcbiAgICAgIG1kLnVzZShpbnMpO1xuICAgICAgbWQudXNlKG1hcmspO1xuICAgICAgbWQudXNlKHJ1YnkpO1xuICAgICAgbWQudXNlKHRpbWVsaW5lKTtcbiAgICAgIG1kLnVzZShhbGVydCk7XG4gICAgICBtZC51c2UodGFic01hcmtkb3duUGx1Z2luKTtcbiAgICAgIG1kLnVzZSh0YXNrbGlzdCk7XG4gICAgICBtZC51c2UoZGwpO1xuICAgIH1cbiAgfSxcbiAgdml0ZToge1xuICAgIHNzcjoge1xuICAgICAgbm9FeHRlcm5hbDogWyd2dWV0aWZ5J10sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbVERlc2lnblJlc29sdmVyKHtcbiAgICAgICAgICBsaWJyYXJ5OiAndnVlLW5leHQnXG4gICAgICAgIH0pXSxcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1REZXNpZ25SZXNvbHZlcih7XG4gICAgICAgICAgbGlicmFyeTogJ3Z1ZS1uZXh0J1xuICAgICAgICB9KV0sXG4gICAgICB9KSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fOiB0cnVlLFxuICAgIH0sXG4gIH0sXG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRzpcXFxcbWluZWNyYWZ0XFxcXHByb2plY3RzXFxcXFNreXJhYWhXZWJcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJHOlxcXFxtaW5lY3JhZnRcXFxccHJvamVjdHNcXFxcU2t5cmFhaFdlYlxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcdXRpbHNcXFxcc2lkZWJhckdlbmVyYXRvci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovbWluZWNyYWZ0L3Byb2plY3RzL1NreXJhYWhXZWIvZG9jcy8udml0ZXByZXNzL3V0aWxzL3NpZGViYXJHZW5lcmF0b3IudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBtYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lkZWJhckdlbmVyYXRvcntcclxuICAgIHByaXZhdGUgZGlyUGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjb3JyZWN0ZWRQYXRobmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYXRobmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpdGVtczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9zaWRlYmFyOiBTaWRlYmFyO1xyXG4gICAgcHJpdmF0ZSBpc1RvcDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBESVJfUEFUSDogc3RyaW5nID0gcGF0aC5yZXNvbHZlKCk7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBCTEFDS19MSVNUOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICBcIi52aXRlcHJlc3NcIixcclxuICAgICAgICBcIm5vZGVfbW9kdWxlc1wiLFxyXG4gICAgICAgIFwiYXNzZXRzXCIsXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZTpzdHJpbmcsIGlzVG9wOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaWRlYmFyID0ge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcclxuICAgICAgICB0aGlzLmRpclBhdGggPSBwYXRoLmpvaW4oU2lkZWJhckdlbmVyYXRvci5ESVJfUEFUSCwgcGF0aG5hbWUpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmZpbHRlck91dFdoaXRlTGlzdChmcy5yZWFkZGlyU3luYyh0aGlzLmRpclBhdGgpLCBTaWRlYmFyR2VuZXJhdG9yLkJMQUNLX0xJU1QpO1xyXG4gICAgICAgIHRoaXMuY29ycmVjdGVkUGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15kb2NzXFwvLywgJy8nKTtcclxuICAgICAgICB0aGlzLmlzVG9wPSBpc1RvcDtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIoSlNPTi5zdHJpbmdpZnkodGhpcy5fc2lkZWJhciwgbnVsbCwgMikpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzaWRlYmFyKCkgOiBTaWRlYmFyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZWJhcjtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRlcigpOiB2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuaXNUb3ApIHRoaXMuX3NpZGViYXIuaXRlbXMudW5zaGlmdCh7XHJcbiAgICAgICAgICAgIHRleHQ6XCJcdTU2REVcdTUyMzBcdTRFMEFcdTdFQTdcIixcclxuICAgICAgICAgICAgbGluazpcIi4uXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmluZGV4UmVhZGVyKCk/LnJvb3Q7XHJcbiAgICAgICAgaWYocm9vdCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3RUaXRsZTogc3RyaW5nID0gcm9vdC50aXRsZTtcclxuICAgICAgICAgICAgY29uc3Qgc3ViRGlyczogU3ViRGlyW10gPSByb290LnN1YkRpcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3NpZGViYXIudGV4dCA9IHJvb3RUaXRsZTtcclxuICAgICAgICAgICAgdGhpcy5fc2lkZWJhci5jb2xsYXBzZWQgPSByb290LmNvbGxhcHNlZDtcclxuXHJcbiAgICAgICAgICAgIHN1YkRpcnMuZm9yRWFjaChzdWJEaXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViU2lkZUJhcjogU2lkZWJhciA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YkRpclBhdGg6IHN0cmluZyA9IHBhdGguam9pbih0aGlzLmRpclBhdGgsIHN1YkRpci5wYXRoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXIoc3ViRGlyUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJTaWRlQmFyLnRleHQgPSBzdWJEaXIudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViU2lkZUJhci5jb2xsYXBzZWQgPSBzdWJEaXIuY29sbGFwc2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZGViYXIuaXRlbXMucHVzaChzdWJTaWRlQmFyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJEaXJDb250YWluZXIgPSBuZXcgU2lkZWJhckdlbmVyYXRvcihgJHt0aGlzLnBhdGhuYW1lfS8ke3N1YkRpci5wYXRofWAsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJEaXJDb250YWluZXIuX3NpZGViYXIuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViU2lkZUJhci5pdGVtcy5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4odGhpcy5kaXJQYXRoLCBpdGVtKTtcclxuICAgICAgICAgICAgY29uc3QgZmlsZTogRmlsZUZyb250TWF0dGVyfCBudWxsID0gdGhpcy5maWxlUmVhZGVyKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNEaXIoZmlsZVBhdGgpICYmICFmaWxlPy5ub2d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtV2l0aG91dE1kOiBzdHJpbmcgPSBpdGVtLnJlcGxhY2UoL1xcLm1kJC9pLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2lkZWJhci5pdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogZmlsZT8udGl0bGUgfHwgaXRlbVdpdGhvdXRNZCxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rIDogYCR7dGhpcy5jb3JyZWN0ZWRQYXRobmFtZX0vJHtpdGVtV2l0aG91dE1kfWBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNEaXIocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZzLmxzdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlsZVJlYWRlcihmaWxlUGF0aDogc3RyaW5nKTogRmlsZUZyb250TWF0dGVyfCBudWxse1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVPYmplY3Q6IHN0cmluZyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxuICAgICAgICAgICAgY29uc3Qge2RhdGF9ID0gbWF0dGVyKGZpbGVPYmplY3QpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgRmlsZUZyb250TWF0dGVyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZpbGUgZm9ybWF0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZXhSZWFkZXIoKTogSW5kZXh8bnVsbCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXhQYXRoOiBzdHJpbmcgPSBwYXRoLmpvaW4odGhpcy5kaXJQYXRoLCAnaW5kZXgubWQnKTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXhGaWxlOiBzdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMoaW5kZXhQYXRoLCAndXRmOCcpO1xyXG4gICAgICAgICAgICBjb25zdCB7ZGF0YX0gPSBtYXR0ZXIoaW5kZXhGaWxlKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucm9vdCAmJiBBcnJheS5pc0FycmF5KGRhdGEucm9vdC5zdWJEaXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBJbmRleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbmRleCBmaWxlIGZvcm1hdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dnZXIoc3RyaW5nOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICdkZXYubG9nJyksIGAke3N0cmluZ31cXG5gLCB7IGZsYWc6ICdhKycgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJPdXRXaGl0ZUxpc3QgPSAoZmlsZXM6IHN0cmluZ1tdLCBibGFja0xpc3Q6IHN0cmluZ1tdKSA9PiBmaWxlcy5maWx0ZXIoKGZpbGU6IHN0cmluZykgPT4gIWJsYWNrTGlzdC5pbmNsdWRlcyhmaWxlKSk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBTaWRlYmFyIHtcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGNvbGxhcHNlZD86Ym9vbGVhbjtcclxuICAgIGl0ZW1zOiBBcnJheTxGaWxlSXRlbSB8IFNpZGViYXI+O1xyXG59XHJcbmludGVyZmFjZSBGaWxlSXRlbSB7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbiAgICBsaW5rOiBzdHJpbmc7XHJcbn1cclxuaW50ZXJmYWNlIEluZGV4IHtcclxuICAgIHJvb3Q6IHtcclxuICAgICAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgIGNvbGxhcHNlZD86IGJvb2xlYW47IFxyXG4gICAgICAgIHN1YkRpcjogU3ViRGlyW11cclxuICAgIH1cclxufVxyXG5pbnRlcmZhY2UgU3ViRGlyIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICBjb2xsYXBzZWQ/OiBib29sZWFuO1xyXG59XHJcbmludGVyZmFjZSBGaWxlRnJvbnRNYXR0ZXIge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG5vZ3VpZGU/OiBib29sZWFuO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9COzs7QUNEK1UsT0FBTyxVQUFVO0FBQzdYLE9BQU8sUUFBUTtBQUNmLE9BQU8sWUFBWTtBQUZuQixJQUFNLG1DQUFtQztBQUlsQyxJQUFNLG1CQUFOLE1BQU0sa0JBQWdCO0FBQUEsRUFDakI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRVIsT0FBZSxXQUFtQixLQUFLLFFBQVE7QUFBQSxFQUMvQyxPQUF3QixhQUF1QjtBQUFBLElBQzNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQUEsRUFFQSxZQUFZLFVBQWlCLE9BQWU7QUFDeEMsU0FBSyxXQUFXO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixPQUFPLENBQUM7QUFBQSxJQUNaO0FBQ0EsU0FBSyxXQUFXO0FBQ2hCLFNBQUssVUFBVSxLQUFLLEtBQUssa0JBQWlCLFVBQVUsUUFBUTtBQUM1RCxTQUFLLFFBQVEsS0FBSyxtQkFBbUIsR0FBRyxZQUFZLEtBQUssT0FBTyxHQUFHLGtCQUFpQixVQUFVO0FBQzlGLFNBQUssb0JBQW9CLEtBQUssU0FBUyxRQUFRLFdBQVcsR0FBRztBQUM3RCxTQUFLLFFBQU87QUFFWixTQUFLLFFBQVE7QUFDYixTQUFLLE9BQU8sS0FB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
