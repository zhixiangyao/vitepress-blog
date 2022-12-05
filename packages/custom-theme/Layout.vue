<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Live2d from './components/Live2d.vue'
import APlayer from './components/APlayer.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Live2d />
  <APlayer />
  <Layout />
</template>
