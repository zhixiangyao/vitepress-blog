<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import GoogleTag from './components/GoogleTag.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <GoogleTag />

  <Layout />
</template>
