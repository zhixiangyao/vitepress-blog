# wc

[wc](https://www.redhat.com/sysadmin/linux-wc-command) 是 `word count` 的缩写，它是一个 Unix 和类 Unix 系统中的命令，用于统计文件中的字数、行数和字符数。其基本语法是：

```bash
wc [选项] 文件名
```

## 基本使用

常用的选项包括：

- `-l`：仅显示行数（line count）。
- `-w`：仅显示字数（word count）。
- `-c`：仅显示字符数（character count）。

例如，如果你想统计文件 "example.txt" 中的行数、字数和字符数，你可以运行以下命令：

```bash
wc example.txt
```

```bash
# line  word   character
6       6      80
```

如果你只关心行数，可以使用 -l 选项：

```bash
wc -l example.txt
```

## 搭配管道

```bash
ls -l -a | wc
```
