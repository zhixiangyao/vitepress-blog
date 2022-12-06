<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Live2d from './components/Live2d.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Live2d />

  <Layout />
</template>
