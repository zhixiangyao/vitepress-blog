# htop

[htop](https://htop.dev/) 是一个交互式的系统监视器, 用于监控 `Linux` 系统 (也支持 `macOS`, 因为 `macOS` 是类 `unix` 系统) 的资源使用情况. 它提供了一个更直观、更友好的界面, 可以实时显示系统的 `CPU` 使用率、内存使用情况、进程列表等信息.

<ZoomImg src="/screenshot_htop.png" width="1138" height="657" />

## 安装二进制文件

安装 `htop` 的方法取决于你使用的 `Linux` 发行版(`macOS` 也可以). 以下是一些常见发行版的安装方法:

- `macOS`: 使用以下命令安装 `htop` (`macOS` 需要先安装 `homebrew`):

  ```bash
  brew install htop
  ```

- `Debian/Ubuntu`: 使用以下命令安装 `htop`:

  ```bash
  sudo apt install htop
  ```

- `CentOS`: 使用以下命令安装 `htop`:

  ```bash
  sudo yum install htop
  ```

- `Fedora`: 使用以下命令安装 `htop`:

  ```bash
  sudo dnf install htop
  ```

- `Arch Linux`: 使用以下命令安装 `htop`:
  ```bash
  sudo pacman -S htop
  ```

## 文档

`htop` 提供了一些颜色标识，用于表示不同的进程状态。例如，`红色`表示内核线程，`绿色`表示正常进程，`蓝色`表示虚拟内存等。

使用 `htop` 可以方便地监控系统的资源使用情况，查看进程的详细信息，并进行一些操作，如杀死进程、调整进程的优先级等。

### 中间的进程列表术语

- `PID`: 进程的 `ID` (`Process ID`), 用于唯一标识一个进程.

- `USER`: 进程所属的用户.

- `PRI`: 进程的优先级 (`Priority`), 值越小表示优先级越高.

- `NI`: 进程的 `nice` 值 (`Nice Value`), 用于调整进程的优先级, 默认为0.

- `VIRT`: 进程使用的虚拟内存 (`Virtual Memory`) 大小.

- `RES`: 进程使用的物理内存 (`Resident Set Size`) 大小.

- `SHR`: 进程使用的共享内存 (`Shared Memory`) 大小.

- `S`: 进程的状态 (`Status`), 包括运行中 (`R`)、睡眠 (`S`)、僵尸 (`Z`)等.

- `CPU%`: 进程使用的 `CPU` 资源百分比.

- `MEM%`: 进程使用的内存资源百分比.

- `TIME+`: 进程运行的累计 `CPU` 时间.

- `Command`: 进程的命令行.

### 底部的快捷键说明

- `F1`: 显示 `htop` 的帮助文档

- `F2`: 进入设置界面

- `F3`: 根据进程名称进行搜索

- `F4`: 根据进程的用户进行搜索

- `F5`: 刷新显示

- `F6`: 根据不同的排序方式进行排序

- `F9`: 向选定的进程发送信号

- `F10`: 退出 htop
