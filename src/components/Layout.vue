<template>
  <div class="flex flex-col sm:flex-row min-h-screen">
    <!-- 左側選單欄 -->
    <div class="flex flex-col justify-between flex-shrink-0 w-full bg-violet-600 text-white sm:w-64">
      <!-- Logo -->
      <div class="flex justify-between items-center h-16 px-4 sm:justify-center">
        <div class="flex justify-center items-center">
          <heroicons-outline-book-open class="w-10 h-10 mr-2" />
          <span class="text-xl font-medium">LucasPress</span>
        </div>

        <button
          class="w-8 h-8 flex justify-center items-center sm:hidden"
          @click="toggleMenu"
        >
          <heroicons-outline-menu class="w-5 h-5" />
        </button>
      </div>

      <div
        class="flex-grow sm:flex sm:flex-col sm:justify-between"
        :class="showMenu ? '' : 'hidden'"
      >

        <!-- 主要選單 -->
        <ul>
          <li>
            <RouterLink to="/" class="flex items-center px-4 py-3 text-white sm:px-5">
              <heroicons-outline-home class="w-5 h-5 mr-2" />
              首頁
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="flex items-center px-4 py-3 text-violet-400 hover:text-white sm:px-5">
              <heroicons-outline-document-text class="w-5 h-5 mr-2" />
              文章
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="flex items-center px-4 py-3 text-violet-400 hover:text-white sm:px-5">
              <heroicons-outline-user class="w-5 h-5 mr-2" />
              個人資料
            </RouterLink>
          </li>
        </ul>

        <!-- 用戶名稱區塊 - 手機版 -->
        <div class="mt-2 py-1 border-t border-violet-400 sm:hidden">
          <div class="flex items-center px-4 py-3">
            <img class="w-8 h-8 rounded-full mr-2" src="https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg" alt="">
            <div class="font-medium tracking-wide">Lucas 洛可</div>
          </div>
        </div>

        <!-- 用戶名稱區塊 - 電腦版 -->
        <div class="hidden sm:flex sm:justify-between sm:items-center px-5 py-4 border-t border-violet-400">
          <div class="flex items-center">
            <img class="w-8 h-8 rounded-full mr-2" src="https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg" alt="">
            <div class="font-medium tracking-wide">Lucas 洛可</div>
          </div>

          <button class="flex justify-center items-center w-7 h-7 hover:bg-violet-500 rounded transition-colors duration-100" type="button">
            <heroicons-outline-dots-vertical class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    <!-- 右側內容區 -->
    <div class="flex-grow min-w-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showMenu = ref(false)
    const toggleMenu = () => showMenu.value = !showMenu.value

    return { showMenu, toggleMenu }
  },
}
</script>
