# 在 macOS 中从后台列表中删除已删除的应用程序

在 macOS 的**后台列表**中, 有很多 `允许在后台启动` 的 app, 但是有一些 app 我们已经卸载了, 但是它依然还存在**后台列表**中.

那我们要怎么卸载它呢?

<ZoomImg src="/screenshot_settings_general_loginItems.png" class="w-fill"  />

## 打印后台列表

- `\` 换行符号
- `sudo` 启动管理员权限
- `find` 查找文件的命令
  - `-type file` 选项, 过滤只显示文件

```shell
sudo find \
  /Library/LaunchDaemons \
  /Library/LaunchAgents \
  ~/Library/LaunchAgents \
  -type file

/Library/LaunchDaemons/com.docker.socket.plist
/Library/LaunchDaemons/com.google.GoogleUpdater.wake.system.plist
/Library/LaunchDaemons/com.volcengine.corplink.systemextension.plist
/Library/LaunchDaemons/com.sangfor.EasyMonitor.plist
/Library/LaunchDaemons/com.west2online.ClashX.ProxyConfigHelper.plist
/Library/LaunchDaemons/com.xk72.charles.ProxyHelper.plist
/Library/LaunchDaemons/com.tencent.Lemon.listen.plist
/Library/LaunchDaemons/com.google.keystone.daemon.plist
/Library/LaunchDaemons/com.volcengine.corplink.service.plist
/Library/LaunchDaemons/com.tencent.Lemon.uninstall.plist
/Library/LaunchDaemons/com.tencent.Lemon.plist
/Library/LaunchAgents/com.google.keystone.xpcservice.plist
/Library/LaunchAgents/com.google.keystone.agent.plist
/Library/LaunchAgents/com.volcengine.corplink.agent.plist
/Library/LaunchAgents/com.tencent.LemonMonitor.plist
/Library/LaunchAgents/com.sangfor.ECAgentProxy.plist
/Users/saki/Library/LaunchAgents/.DS_Store
/Users/saki/Library/LaunchAgents/homebrew.mxcl.deeplx.plist
/Users/saki/Library/LaunchAgents/com.tencent.Lemon.trash.plist
/Users/saki/Library/LaunchAgents/Corplink.plist
/Users/saki/Library/LaunchAgents/com.github.facebook.watchman.plist
/Users/saki/Library/LaunchAgents/com.valvesoftware.steamclean.plist
```

## 删除 app 后台文件

```shell
sudo rm -rf /Library/LaunchDaemons/com.xk72.charles.ProxyHelper.plist
```
