# 文件链接方式

在Linux系统中，有两种主要的文件链接方式：硬链接（`Hard Link`）和软链接（`Symbolic Link`）。

- 硬链接（`Hard Link`）：

  - 硬链接是通过文件索引节点（`Inode`）来实现的，它直接指向文件数据的指针。
  - 硬链接可以将一个文件拥有多个文件名，多个文件名指向同一个数据块。
  - 硬链接只能链接到同一文件系统中的文件，不能链接到不同的文件系统。
  - 删除任何一个硬链接不会影响其他硬链接，只有当所有硬链接都被删除时，文件的数据块才会被释放。

- 软链接（`Symbolic Link`）：

  - 软链接也被称为符号链接，它是一个特殊类型的文件，包含了指向目标文件或目录的路径名。
  - 软链接类似于 `Windows` 系统中的快捷方式，它是一个指向目标文件的快捷方式。
  - 软链接可以链接到不同的文件系统中的文件，甚至可以链接到不存在的文件。
  - 删除软链接不会影响目标文件，但如果目标文件被删除或移动，软链接将无效。

## 硬链接 (`Hard Link`)

硬链接 (`Hard Link`)是 `Linux` 系统中的一种文件链接方式，它允许一个文件拥有多个文件名，即一个文件可以通过多个不同的文件名访问。与软链接（`Symbolic Link`）不同，硬链接是直接指向文件数据的指针，而不是指向文件路径的指针。

使用硬链接可以节省存储空间，因为它们共享相同的文件数据块。只有当所有硬链接都被删除时，文件的数据块才会被释放。

### 创建硬链接

要创建一个硬链接，可以使用 `ln` 命令，并提供源文件和目标链接文件的路径作为参数。例如：

```bash
ln <源文件路径> <目标链接文件路径>
```

```bash
ln /path/to/source_file /path/to/link_file
```

这将在指定路径下创建一个新的硬链接文件。

### 查看硬链接

要查看文件的硬链接数量，可以使用ls命令，并使用 `-l` 选项来显示文件的详细信息。硬链接的数量将在第二列中显示。

```bash
ls -l /path/to/file
```

这将显示文件的详细信息，包括硬链接的数量。

### 删除硬链接

要删除一个硬链接，可以使用 `rm` 命令，并提供链接文件的路径作为参数。删除硬链接并不会影响 `原始文件` 或 `其他硬链接`。

```bash
rm /path/to/link_file
```

这将删除指定的硬链接文件。

### 注意

::: warning

需要注意的是，硬链接只能链接到 `同一文件系统` 中的文件。不能在不同的文件系统之间创建硬链接。

:::

## 软链接（`Symbolic Link`）

软链接（`Symbolic Link`）是 `Linux` 系统中的一种文件链接方式，也被称为符号链接。软链接是一个特殊类型的文件，它包含了指向目标文件或目录的路径名。

软链接与硬链接不同，它是一个指向目标文件的快捷方式，而不是直接指向文件数据的指针。软链接文件本身只是一个文本文件，其中包含了目标文件的路径信息。

### 创建软链接

要创建一个软链接，可以使用 `ln` 命令，并提供目标文件的路径和链接文件的路径作为参数。使用 `-s` 选项来指定创建软链接。

```bash
ln -s <目标文件路径> <链接文件路径>
```

```bash
ln -s /path/to/target_file /path/to/link_file
```

这将在指定路径下创建一个新的软链接文件。

### 查看软链接

要查看软链接的详细信息，可以使用 `ls` 命令，并使用 `-l` 选项来显示文件的详细信息。软链接的路径将在第一个列中显示，并以箭头指示链接的目标文件。

```bash
ls -l /path/to/link_file
```

这将显示软链接文件的详细信息，包括链接的目标文件路径。

### 删除软链接

删除一个软链接，可以使用 `rm` 命令，并提供链接文件的路径作为参数。删除软链接 `不会影响目标文件` 。

```bash
rm /path/to/link_file
```

这将删除指定的软链接文件。

### 注意

::: warning

需要注意的是，软链接可以链接到 `不同的文件系统` 中的文件，甚至可以链接到 `不存在的文件`。但如果目标文件被 `删除` 或 `移动`，软链接将失效。

:::