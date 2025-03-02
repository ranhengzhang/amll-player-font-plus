# AMLL Player Font Plus

> 为AMLL Player提供了更加精细化的字体设置。包括但不限于调整歌词整体字体大小；改变歌曲标题粗体；为日语、韩语等特殊语言单独设置字体；翻译、音译字体单独设置并调整字号。

> **更改设置后可能需要拖动一次窗口大小触发Player重新计算歌词布局才能正常显示。**

## 开始使用

### 下载已编译好的插件

前往 [Github Actions](../../actions) 页面，在最新编译中下载编译好的插件包，将插件解压至插件目录[^1]下。

### 自行编译插件

使用`git clone`命令将项目克隆至本地后，使用`pnpm i`安装需要的依赖包，接着使用以下命令**之一**编译至`dist`文件夹，移动到插件目录[^1]下。

```bash
pnpm build:dev # Build plugin with source map
pnpm build:src # Build minified plugin with source map
pnpm build # Build minified plugin without source map
```

[^1]: C:\Users\用户名\AppData\Roaming\net.stevexmh.amllplayer\extensions