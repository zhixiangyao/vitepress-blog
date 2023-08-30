<script lang="ts" setup>
import VPSwitch from 'vitepress/dist/client/theme-default/components/VPSwitch.vue'

type Props = {
  checked: boolean
  onChange: () => void
}

defineOptions({ name: 'VPSwitch' })

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  onChange() {},
})
</script>

<template>
  <VPSwitch class="switch" :aria-checked="props.checked" @click="props.onChange">
    <svg
      t="1693376323882"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      width="200"
      height="200"
    >
      <path
        d="M512 736a224 224 0 1 1 0-448 224 224 0 0 1 0 448zM512 832A320 320 0 1 0 512 192a320 320 0 0 0 0 640z"
        fill="#000"
        fill-opacity=".9"
      />
    </svg>
  </VPSwitch>
</template>

<style scoped>
.switch[aria-checked='false'] :deep(.check) {
  /* rtl:ignore */
  transform: translateX(18px);
}

.dark .switch .icon path {
  fill: #fff;
}
</style>
