# grep

[grep](https://www.geeksforgeeks.org/grep-command-in-unixlinux/) 是 `global regular expression print` 的缩写，它是一个 Unix 和类 Unix 系统中的命令，是一个强大的文本搜索工具，通常与管道符号一起使用以过滤文本。

其基本语法是：

```bash
grep "pattern" filename
```

这将在指定的文件（filename）中搜索匹配给定模式（pattern）的行，并将它们输出到标准输出。

## 基本使用

常用的选项包括：

- `-i`：忽略大小写，使匹配不区分大小写。
- `-n`：在开头显示匹配行的行号。
- `-r`：递归搜索。
- `-v`：反向匹配。

例如，如果你想过滤文件名包含 "bash" 的数据，你可以运行以下命令：

```bash
ls -la ~ | grep -n 'bash'
```

```bash
6:-rw-------    1 saki  staff                28 Jun 20  2022 .bash_history
7:-rw-r--r--    1 saki  staff               321 Sep 16  2022 .bash_profile
8:-rw-r--r--    1 saki  staff               117 Aug  1 15:32 .bashrc
```
