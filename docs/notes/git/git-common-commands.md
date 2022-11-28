# Git 常用命令

> [Git learngitbranching 训练第 3 刷达成](https://learngitbranching.js.org/?locale=zh_CN)

### 移动指针

```bash
# 移动 孙子 到 爷爷
~3 # 太爷爷
~2 # 爷爷
~  # 老爸

# 移动 爸爸辈
^  # 老爸
^2 # 二伯
^3 # 大伯
```

### 初始化 git

```bash
git init
```

### 克隆

```bash
git clone [xxx.git]
```

### 提交到暂存区

```bash
git add [file]
```

### git commit

```bash
# 提交 & 附加信息
git commit -m 'xxxx'
```

```bash
# 修改 commit message
git commit --amend
```

### git stash

```bash
# 查看当前所有缓存操作的堆栈记录
git stash list
	stash@{0}: WIP on master: c1820a9 xxx information.
	stash@{1}: WIP on master: c1820a9 yyy information.

# 查看当前某个缓存的具体缓存内容
# x为缓存列表中的数字
git stash show -p stash@{x}

# 弹出缓存操作方式一
git stash pop

# 弹出缓存操作方式二
git stash apply

# 弹出指定的缓存操作，上述两种方式默认弹出缓存列表中最新的缓存记录
# 两种方式： apply & pop
git stash apply stash@{x}
git stash pop stash@{x}

# 删除某个缓存(不是弹出)
git stash drop stash@{x}

# 删除所有缓存
git stash clear
```

### 修改分支名

```bash
git branch -M [branch name]
```

### 删除本地分支

```bash
git branch -D [branch name] [branch name] [branch name] ...
```

### 删除远程分支

```bash
git push origin -d [branch name] [branch name] [branch name] ...
```

### fetch 只下载远程分支

```bash
git fetch
```

### 挑选 n 个 commit 到当前分支

```bash
git cherry-pick [HASH] [HASH] [HASH] ...
```

### 合并分支

```bash
git cherry-pick [origin]/[branch name]
git rebase [origin]/[branch name]
git merge [origin]/[branch name]
```

### 拉取

- git pull 就是 git fetch 和 git merge 的缩写！

```bash
git pull [origin] [branch name]
# or
git fetch
git merge [origin]/[branch name]
```

### 拉取变基

- git pull --rebase 就是 git fetch 和 git rebase [origin]/[branch name] 的缩写！

```bash
git pull --rebase [origin] [branch name]
# or
git fetch
git rebase [origin]/[branch name]
```

### 首次推送

```bash
git push -u [origin] [branch name]
```

### 推送

```bash
git push [origin] [branch name]
```

### 切换分支

```bash
git checkout [HASH]
```

### 创建分支并切换

```bash
git checkout -b [HASH]
```

### 强制 push

```bash
git push --force
```

### 重制-清空暂存区

```bash
git reset
```

### 放弃本地修改的所有文件

```bash
git checkout .
```
