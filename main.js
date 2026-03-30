const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 保持对主窗口的全局引用，防止被 JavaScript 垃圾回收机制意外销毁
let mainWindow;

function createWindow() {
  // 设置 User-Agent 伪装成常规 Chrome 浏览器，防止 Google 账号安全策略拦截登录
  app.userAgentFallback = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  // 初始化主窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,         // 移除系统原生边框，使用自定义的顶部导航栏
    transparent: true,    // 开启透明支持，配合 HTML 中的圆角设计
    webPreferences: {
      webviewTag: true,   // 允许使用 <webview> 标签来嵌入网页
      preload: path.join(__dirname, 'preload.js'), // 注入桥接脚本，保障通信安全
      partition: 'persist:gemini-session',         // 独立分区并持久化缓存，实现免登录
      httpCache: true
    }
  });

  // 加载本地构建好的界面外壳
  mainWindow.loadFile('index.html');
}

// 【关键修复】：必须等待 Electron 底层服务完全就绪后，才能调用创建窗口的逻辑
app.whenReady().then(() => {
  createWindow();
  app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      // 如果不是 Google 的登录/认证链接，就交由系统外部浏览器处理
      if (!url.includes('accounts.google.com')) {
        require('electron').shell.openExternal(url);
        return { action: 'deny' }; // 阻止在 Electron 内部打开
      }
      return { action: 'allow' }; // 允许内部弹出登录窗口
    });
  });
  // 针对 macOS 系统的特殊处理：点击 Dock 栏图标时，若无可见窗口则重新创建一个
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当所有窗口被关闭时，彻底退出主进程（除了 macOS 系统通常保持后台运行）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 监听并执行来自前端 UI（通过 preload.js 转发）的窗口控制指令
ipcMain.on('window-control', (event, command) => {
  if (!mainWindow) return;
  
  switch (command) {
    case '最小化':
      mainWindow.minimize();
      break;
    case '最大化':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
      break;
    case '关闭':
      mainWindow.close();
      break;
  }
});