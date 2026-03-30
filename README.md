# 🌟 Gemini Studio

一款精致、纯粹的 Google Gemini 桌面客户端。基于 Electron 构建，致力于提供媲美原生应用的企业级交互体验与极简的视觉享受。

## ✨ 核心特性

- **🎨 极简沉浸式 UI**：摒弃传统系统边框，采用纯白定制顶部导航栏与精致底边阴影，完美融入现代桌面环境。
- **💊 胶囊风格设计**：全局定制马卡龙蓝胶囊风格滚动条与窗口控制按钮，悬浮交互灵动优雅。
- **🔐 账号状态持久化**：首次登录后自动记忆 Session，后续打开告别繁琐的重复登录，即开即用。
- **🔗 智能链接管理**：内置外部链接拦截路由，点击参考链接自动唤起系统默认浏览器（如 Chrome/Edge），保持主应用界面的纯粹性。
- **⚙️ 完整功能保留**：完美支持历史记录侧边栏、模型切换以及 Google 账号管理弹窗（原生 Popup 支持）。
- **🚀 跨分辨率矢量图标**：内置多色渐变 SVG 星形图标，无论在多高分辨率的屏幕下均能保持极致清晰。

## 🛠️ 技术栈

- **核心框架**: [Electron](https://www.electronjs.org/)
- **打包工具**: [electron-builder](https://www.electron.build/)
- **前端技术**: 原生 HTML / CSS / JavaScript

## 📁 项目结构

```text
gemini-studio/
├── assents/               # 静态资源目录
│   └── icon.ico           # 应用全局图标 (需 256x256 分辨率)
├── index.html             # 渲染进程：界面外壳与 CSS 注入逻辑
├── main.js                # 主进程：窗口管理、生命周期与权限控制
├── preload.js             # 预加载脚本：主进程与渲染进程的安全通信桥梁
├── package.json           # 项目配置与打包脚本
└── README.md              # 项目说明文档# Gemini-Studio
