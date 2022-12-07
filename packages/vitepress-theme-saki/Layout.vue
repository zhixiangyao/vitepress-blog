<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import Live2d from './components/Live2d.vue'
import NProgress from './components/NProgress.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Live2d />
  <NProgress />

  <Layout />
</template>
