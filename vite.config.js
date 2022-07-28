import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    Pages(),
    Components({
      dirs: [
        'src/components',
        'src/sections',
      ],
      resolvers: [
        IconsResolver({
          prefix: false,
          enabledCollections: ['heroicons-outline'],
        }),
        HeadlessUiResolver(),
      ],
    }),
    Icons(),
  ],
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@headlessui/vue',
      '@hennge/vue3-pagination',
      '@kyvg/vue3-notification',
      '@sipec/vue3-tags-input',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/starter-kit',
      '@tiptap/vue-3',
      '@tiptap/core',
      '@vueuse/core',
      'chart.js',
      'mitt',
      'prosemirror-state',
    ],
  },
})
