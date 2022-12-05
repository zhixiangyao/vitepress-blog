# 类型挑战

::: info 什么？ `TypeScript` 你还不会？ 你 out 啦，快来做类型体操吧。 :::

## TS Question 1

Got a TypeScript challenge for ya. How would you write a ToCamelCaseKeys type helper? ([twitter](https://twitter.com/mattpocockuk/status/1548954573120880640?s=21&t=XN8EQozdsUZy-tN9StlLLQ))

[Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgEpxAEwPYFsDSEAngM7IDeAUMjciSHANYQD6CcJEAXHWFKAHMA3NVoAFDuwA2AYQ7dkAI2zYpEDCNrJ2uCLPk8QAV1yLom2gGUZqAKIBBALIBJAHIBxFpdf38tljL2lrY8isACoGAiAL6UlAD0AFSJ1InIACqWyACKRhAkYMDYIMgAtMgAFtgA7sg4yETYRsh8GCQw2FC4yIBg1IDwf8iR2MiA4NR9APyp8XGR0PBIyDLY0EiYhKQUojT0TBBynDwF-CDCW8gADpJw+gdKKmoaZzp6+wrGpuZnJAhQ6riClgYzFeoXCkRicSAA)

```TypeScript
interface RandomKeys {
  snake_case: string
  PascalCase: boolean
  camelCase: number
  SCREAMING_SNAKE_CASE: bigint
}

/**
 * TS Question - how do you transform ⬆️ into ⬇️?
 */

interface CoercedKeys {
  snakeCase: string
  pascalCase: boolean
  camelCase: number
  screamingSnakeCase: bigint
}

type TransformLowercase<T extends string> = T extends `${string}_${string}` ? Lowercase<T> : T
type SplitUnderscore<T extends string> = T extends `${infer A }_${infer B }` ? [A, ...SplitUnderscore<B>] : [T]
type Concat<T extends string[]> = T extends [infer A extends string, ...infer Rest extends string[]]  ? `${Capitalize<A>}${Concat<Rest>}` : ''

type Result = { [k in keyof RandomKeys as Uncapitalize<Concat<SplitUnderscore<TransformLowercase<k>>>>]: RandomKeys[k] }

type IsItWorking = Result extends CoercedKeys ? true : false
```
