<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import GoogleTag from './components/GoogleTag.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <GoogleTag />

  <Layout class="layout" />
</template>

<style>
:root {
  overflow-y: scroll;
}

/* fix vision error */
header .content-body {
  transition: none !important;
}

@supports (height: 100svh) {
  body.fixed {
    position: fixed;
    height: 100svh;
    overflow: hidden;
  }

  body.fixed .layout {
    min-height: 100svh;
  }

  body.fixed .layout footer {
    border: transparent;
    background-color: transparent;
  }
}
</style>
