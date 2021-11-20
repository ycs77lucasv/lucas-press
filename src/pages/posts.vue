<template>
  <Layout>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-semibold tracking-wider text-gray-900">文章</h1>

      <div>
        <PrimaryButton to="/posts">新增</PrimaryButton>
      </div>
    </div>

    <div class="mt-6 overflow-x-auto relative bg-white border border-gray-200 rounded-md shadow">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="pl-5 py-3">
              <input type="checkbox" class="form-checkbox">
            </th>
            <th class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap">標題</th>
            <th class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap">簡介</th>
            <th class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap">瀏覽次數</th>
            <th class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap">建立日期</th>
            <th class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap">標籤</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 4">
            <td class="pl-5 py-3">
              <input type="checkbox" class="form-checkbox">
            </td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
              <RouterLink to="/posts/1" class="link font-normal">我的文章1</RouterLink>
            </td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap">文章簡介文章簡介文章簡介文章簡介...</td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap"><heroicons-outline-eye class="inline-block w-4 h-4" />123次</td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap">2021/11/01</td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
              <span class="inline-flex space-x-2">
                <span class="px-2 py-0.5 bg-violet-600 text-white text-sm font-normal tracking-wider rounded-full">標籤一</span>
                <span class="px-2 py-0.5 bg-violet-600 text-white text-sm font-normal tracking-wider rounded-full">標籤二</span>
              </span>
            </td>
            <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
              <RouterLink to="/posts/1" class="inline-flex justify-center items-center w-8 h-8 text-gray-400 hover:text-violet-600 transition-colors">
                <heroicons-outline-pencil-alt />
              </RouterLink>
              <button type="button" class="inline-flex justify-center items-center w-8 h-8 text-gray-400 hover:text-red-600 transition-colors">
                <heroicons-outline-trash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Layout>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>
