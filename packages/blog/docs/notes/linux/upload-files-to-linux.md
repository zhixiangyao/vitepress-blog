# 上传文件到 Linux

`macOS` 里可以很方便的使用 `sftp` 上传文件到远程服务器～

### **连接:**

- `sftp 用户名@IP 地址`

```bash
sftp root@xx.xx.xx.xx
```

<!-- more -->

然后输入密码 `enter` 登录即可

### **查看工作路径:**

- `pwd` `(print working directory)` 查看远程当前工作路径
- `lpwd` `(local print working directory)` 查看远程当前工作路径

```bash
sftp> pwd
Remote working directory: /root
sftp> lpwd
Local working directory: /Users/saki
```

### **上传文件**

- 语法: `sftp>` `put -P 本地路径 远程路径`
- `-P` 是 `permissions` 的意思，上传时会包括完整的文件许可权和访问时间。

```bash
sftp> put -P /xx/xx/xx/xx/file.zip /var/www/
```

### **上传文件夹**

- 语法: `sftp>` `put -P 本地路径/文件夹/\* 远程路径/新建文件夹/`

```bash
sftp> put -P /xx/xx/xx/xx/file/* /var/www/newFolder/
```

### **下载文件**

- 语法: `sftp>` `get -P 远程路径 本地路径`

```bash
sftp> get -P /var/www/file.zip /xx/xx/xx/xx/
```

### **下载文件夹**

- 语法: `sftp>` `get -P 远程路径/文件夹/\* 本地路径/新建文件夹/`

```bash
sftp> get -P  /var/www/xx/* /xx/xx/xx/xx/newFolder/
```

### **结束会话**

- `quit` 和 `exit` 都可以

```bash
sftp> exit
```

### 参考

[SFTP commands and options](https://learn.akamai.com/en-us/webhelp/netstorage/netstorage-user-guide/GUID-E0B5C44E-7618-4C41-B9AB-186CF3E28628.html)
