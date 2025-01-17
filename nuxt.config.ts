// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxtjs-naive-ui'],
  css: ['~/assets/main.css'],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer']
  },
  ssr: false, // 改为客户端渲染
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
      ignore: ['/**']
    }
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-CN'
      }
    }
  },
  routeRules: {
    '/**': { ssr: false }
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['naive-ui', 'vueuc'] : []
    }
  }
})