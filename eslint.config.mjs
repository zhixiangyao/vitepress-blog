import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  markdown: false,
  rules: {
    'no-console': ['off'],
    'no-alert': ['off'],
  },
})
