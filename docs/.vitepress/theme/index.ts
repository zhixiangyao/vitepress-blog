import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import BlogList from './components/BlogList.vue'
import FriendLinks from './components/FriendLinks.vue'
import Rain from './components/Rain.vue'
import ZoomImg from './components/ZoomImg.vue'
import Layout from './Layout.vue'
import './index.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext): void {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('BlogList', BlogList)
    ctx.app.component('Rain', Rain)
    ctx.app.component('ZoomImg', ZoomImg)
    ctx.app.component('FriendLinks', FriendLinks)
  },
  Layout,
}

export default theme
