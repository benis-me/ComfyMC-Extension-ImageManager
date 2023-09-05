import App from './App.vue'
import { createApp } from 'vue'
import { useEventBus } from '@vueuse/core'

export default class ExtensionManager implements IExtension {
  id = 'comfymc-image-manager'
  name = 'Image Manager'
  version = '0.0.1'
  description = '生成图片的管理器'

  app: any
  extensionApp: ReturnType<typeof createApp> | null = null

  constructor(app: any) {
    this.app = app
    useEventBus('Extension::ImageManager::Close').on(() => {
      this.closeApp()
    })
  }

  async init() {
    this.app.addMenu({
      id: 'image-manager',
      name: '图片管理器',
      icon: 'ri-folder-image-line',
      onClick: () => {
        this.openApp()
      },
    })
  }

  openApp() {
    const comfyApp = document.getElementById('app')
    if (!comfyApp) return

    const div = document.createElement('div')
    div.id = 'image-manager'

    comfyApp.appendChild(div)

    this.extensionApp = createApp(App)
    this.extensionApp.mount(div)
  }

  closeApp() {
    const div = document.getElementById('image-manager')
    if (!div) return

    if (this.extensionApp) {
      this.extensionApp.unmount()
      this.extensionApp = null
    }
    div.remove()
  }
}

if (import.meta.env.DEV) {
  const app = createApp(App)
  app.mount('#app')
}
