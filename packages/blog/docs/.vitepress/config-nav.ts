import { type DefaultTheme } from 'vitepress'

type Nav = DefaultTheme.Config['nav']

export const nav = (): Nav => {
  return [
    {
      text: 'Moments',
      link: '/moments/空は高く風は歌う',
    },
    {
      text: 'Notes',
      link: '/notes/typescript/covariant-contravariant-invariant',
    },
    {
      text: 'Tools',
      link: '/tools/filter-jd-cookie',
    },
    {
      text: 'Arithmetic',
      link: '/arithmetic/sorting-algorithm',
    },
    { text: 'About', link: '/about' },
  ]
}
