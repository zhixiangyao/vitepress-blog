# 禁用 @monaco-editor/react 的右键菜单

设置 contextmenu 的值为 false 就可以禁用右键菜单了

- monaco

```js
monaco.editor.updateOptions({ contextmenu: false })
```

- @monaco-editor/react

```jsx
<Editor
  defaultLanguage="sql"
  defaultValue={value}
  width={containerSize?.width}
  height={containerSize?.height}
  options={{
    readOnly: true,
    contextmenu: false,
  }}
/>
```
