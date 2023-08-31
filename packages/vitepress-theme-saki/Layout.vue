<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import GoogleTag from './components/GoogleTag.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <GoogleTag />

  <Layout />
</template>

<style>
:root {
  height: 100svh;
  overflow-y: scroll;
}

/* fix vision error */
header .content-body {
  transition: none !important;
}
</style>
