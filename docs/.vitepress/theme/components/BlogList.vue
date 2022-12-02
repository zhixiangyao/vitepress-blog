<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()

const list = computed(() => {
  const temp: { link: string; text: string }[] = []
  const sidebars = Object.values(theme.value.sidebar) as any

  for (const sidebar of sidebars) {
    for (const { items } of sidebar) {
      for (const item of items) {
        temp.push(item)
      }
    }
  }

  return temp
})
</script>

<template>
  <ul v-for="item of list" :key="item.link">
    <li>
      <a :href="item.link">{{ item.text }}</a>
    </li>
  </ul>
</template>
