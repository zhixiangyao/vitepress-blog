import DefaultTheme from 'vitepress/theme'

type Theme = typeof DefaultTheme

import Layout from './Layout.vue'
import FilterJDCookie from './components/FilterJDCookie.vue'
import BlogList from './components/BlogList.vue'
import Rain from './components/Rain.vue'

export default <Theme>{
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom Behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    ctx.app.component('FilterJDCookie', FilterJDCookie)
    ctx.app.component('BlogList', BlogList)
    ctx.app.component('Rain', Rain)
  },
  Layout,
}
