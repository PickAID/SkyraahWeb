---
layout: page
title: Runescribing Grid Editor
aside: false
sidebar: false
footer: false
---

<script setup>
import RunescribingEditor from './../../../../../../.vitepress/theme/components/AvalonWard/RunescribingEditor.vue'
</script>

<style>
/* Remove default page margins and paddings */
.VPDoc {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}

.VPContent {
  padding: 0 !important;
}

.VPDoc .container {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.VPDoc .content {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Hide any headers or navigation elements */
.VPNavBar {
  display: none !important;
}

.VPDocFooter {
  display: none !important;
}

/* Ensure full height */
html, body, #app, .VPApp, .VPContent, .VPDoc {
  height: 100%;
  min-height: 100%;
}

/* Optional - ensure dark theme for the editor */
html.dark {
  --vp-c-bg: #1e1e1e;
}
</style>

<RunescribingEditor/>