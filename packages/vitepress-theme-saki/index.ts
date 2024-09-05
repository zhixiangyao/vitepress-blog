import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext, Theme } from 'vitepress'

import Layout from './Layout.vue'

import FilterJDCookie from './components/FilterJDCookie.vue'
import Base64 from './components/Base64.vue'
import BlogList from './components/BlogList.vue'
import Rain from './components/Rain.vue'
import ZoomImg from './components/ZoomImg.vue'
import FriendLinks from './components/FriendLinks.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext): void {
    // extend default theme custom Behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    ctx.app.component('FilterJDCookie', FilterJDCookie)
    ctx.app.component('Base64', Base64)
    ctx.app.component('BlogList', BlogList)
    ctx.app.component('Rain', Rain)
    ctx.app.component('ZoomImg', ZoomImg)
    ctx.app.component('FriendLinks', FriendLinks)
  },
  Layout,
}

export default theme
