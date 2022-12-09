# 配置 Vitepress 的 Algolia 搜索

[Doc](https://docsearch.algolia.com/docs/legacy/run-your-own/)

## 前置条件

- 注册 `algolia` 的账号
- `intel` 或者 `amd` 的 `x86-64` 处理器 (`Apple` 的 `M1` 试过了不行)
- [jq](https://stedolan.github.io/jq/) 是一个 轻量级 和 灵活 的命令行 `JSON` 工具
  ```sh
  brew install jq # 如果你有安装 homebrew
  # or 使用 yum 来安装 jq
  # 1. yum install epel-release -y
  # 2. yum update -y
  # 3. yum install jq -y
  # 4. jq -V 检查是否安装成功
  ```
- [docker](https://www.docker.com/)

## 配置

- `.env`

  `/root/algolia/.env`

  ```sh
  # Algolia 应用程序的 ID
  APPLICATION_ID=
  # 有读有写的能力的 Admin Api Key
  API_KEY=
  ```

- `config.json`

  `/root/algolia/config.json`

  ```json
  {
    "index_name": "你的 algolia 的 index 名，随便起",
    "start_urls": ["https://需要爬虫的 blog 网页地址.com"],
    "selectors": {
      "lvl0": "",
      "lvl1": ".content h1",
      "lvl2": ".content h2",
      "lvl3": ".content h3",
      "lvl4": ".content h4",
      "lvl5": ".content h5",
      "content": ".content p, .content li"
    }
  }
  ```

## 运行

使用 `docker` 进行爬虫

- 解释
  - `--env-file=/root/algolia/.env` 读取 `ID` 和 `Key`
  - `-e "CONFIG=$(xxx)"` 把解析的 `json` 配置放到 `CONFIG` 这个环境变量里
    - `$(cat /root/algolia/config.json | jq -r tostring)` 用 `jq` 解析 (把 `json` 变成一行)

```sh
docker run -it --env-file=/root/algolia/.env -e "CONFIG=$(cat /root/algolia/config.json | jq -r tostring)" algolia/docsearch-scraper
```

## vitepress

`.vitepress/config.js`

```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    // ...
    algolia: {
      appId: 'Algolia 应用程序的 ID，随便起',
      apiKey: '只有读能力的 Api Key',
      indexName: '你的 algolia 的 index 名',
    },
  },
})
```