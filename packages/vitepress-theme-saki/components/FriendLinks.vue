<script setup lang="ts">
import { VPTeamMembers, DefaultTheme } from 'vitepress/theme'

defineOptions({
  name: 'FriendLinks',
})

type Props = { members: DefaultTheme.TeamMember[] }

const props = defineProps<Props>()
</script>

<template>
  <VPTeamMembers class="mt-21" size="small" :members="props.members" />
</template>
