<template>
  <div class="flex min-h-screen">
    <!-- 左側選單欄 -->
    <div class="flex flex-col justify-between w-64 bg-violet-600 text-white">
      <div>
        <!-- Logo -->
        <div class="flex justify-center items-center h-16">
          <heroicons-outline-book-open class="w-10 h-10 mr-2" />
          <span class="text-xl font-medium">LucasPress</span>
        </div>

        <!-- 主要選單 -->
        <ul>
          <li>
            <RouterLink to="/" class="flex items-center px-5 py-3 text-white">
              <heroicons-outline-home class="w-5 h-5 mr-2" />
              首頁
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="flex items-center px-5 py-3 text-violet-400 hover:text-white">
              <heroicons-outline-document-text class="w-5 h-5 mr-2" />
              文章
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="flex items-center px-5 py-3 text-violet-400 hover:text-white">
              <heroicons-outline-user class="w-5 h-5 mr-2" />
              個人資料
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 用戶名稱 -->
      <div class="flex justify-between items-center px-5 py-4 border-t border-violet-400">
        <div class="flex items-center">
          <img class="w-8 h-8 rounded-full mr-2" src="https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg" alt="">
          <div class="font-medium tracking-wide">Lucas 洛可</div>
        </div>

        <button class="flex justify-center items-center w-7 h-7 hover:bg-violet-500 rounded transition-colors duration-100" type="button">
          <heroicons-outline-dots-vertical class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 右側內容區 -->
    <div class="flex-grow min-w-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
