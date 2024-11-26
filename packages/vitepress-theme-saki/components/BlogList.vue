<script setup lang="ts">
import { DefaultTheme, useData } from 'vitepress'
import { computed } from 'vue'

defineOptions({ name: 'BlogList' })

const { theme } = useData()

type Sidebar = [string, DefaultTheme.SidebarItem[]][]

const sidebar = computed(() => {
  return Object.entries(theme.value.sidebar) as Sidebar
})

const capitalized = (name: string) => {
  const [str, ...rest] = name.replace('/', '').replace('\/', '')

  return str.toUpperCase() + rest.join('')
}
</script>

<template>
  <ul v-for="[name, sidebarValue] of sidebar" :key="name">
    <li>
      <b>{{ capitalized(name) }}</b>

      <ul v-for="item of sidebarValue" :key="item.text">
        <template v-if="item.items?.length !== undefined">
          <li>
            <b>{{ item.text }}</b>

            <ul v-for="{ text, link } of item.items" :key="text">
              <li>
                <a :href="(item.base ?? '') + link">
                  <b>{{ text }}</b>
                </a>
              </li>
            </ul>
          </li>
        </template>

        <template v-else>
          <a :href="(item.base ?? '') + item.link">
            <b>
              {{ item.text }}
            </b>
          </a>
        </template>
      </ul>
    </li>
  </ul>
</template>
