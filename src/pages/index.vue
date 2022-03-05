<template>
  <Layout>
    <PageHeader>
      <template #title>首頁</template>
    </PageHeader>

    <div class="mt-6 grid md:grid-cols-12 gap-4">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="145"
        :is-up="true"
        trending="12"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="點讚數"
        value="591"
        :is-up="false"
        trending="2"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="7"
        :is-up="true"
        trending="53"
        stretch
      />

      <Card class="md:col-span-8 min-w-0" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">瀏覽人次</h2>
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="lineChartEl"></canvas>
          </div>
        </div>
      </Card>

      <Card class="md:col-span-4 min-w-0" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">瀏覽裝置</h2>
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="barChartEl"></canvas>
          </div>
        </div>
      </Card>

      <Card class="md:col-span-8 min-w-0 h-full" stretch>
        <div class="flex justify-between p-5 pb-0">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">熱門文章</h2>
          <RouterLink to="/posts" class="link flex items-center font-normal">
            全部文章
            <heroicons-outline-chevron-double-right class="ml-1" />
          </RouterLink>
        </div>

        <Table
          class="mt-4"
          :columns="postsColumns"
          :data="postsData"
          :show-selection="false"
          :show-actions="false"
          :show-paginator="false"
        >
          <template #column-title="{ record, value }">
            <RouterLink :to="`/posts/${record.id}`" class="link font-normal">
              {{ value }}
            </RouterLink>
          </template>
          <template #column-visits="{ record, value }">
            <div class="inline-flex items-center font-normal">
              <heroicons-outline-eye class="inline-block w-4 h-4 mr-1" />
              {{ value }}次
              <Trending
                class="ml-2"
                :is-up="record.visits_trending_is_up"
                :value="record.visits_trending_value"
                percentage
              />
            </div>
          </template>
        </Table>
      </Card>

      <Card class="md:col-span-4 min-w-0 h-full" stretch>
        <div class="p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700 dark:text-gray-100">最新留言</h2>
          <ul class="mt-4 space-y-4">
            <li class="flex" v-for="comment in comments" :key="comment.id">
              <img class="w-8 h-8 rounded-full" :src="comment.author_avatar" alt="">
              <div class="mt-1 ml-4 flex-grow">
                <div class="text-gray-800 dark:text-gray-100 font-medium tracking-wide">
                  {{ comment.author_name }}
                </div>
                <div class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                  {{ comment.content }}
                </div>
                <div class="mt-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm rounded">
                  留言文章：<RouterLink :to="`/posts/${comment.post_id}`" class="link">{{ comment.post_title }}</RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </Layout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useLineChart, useBarChart } from '@/composables/useChart'
import { useTheme } from '@/composables/useTheme'

export default {
  setup() {
    const { applyColor } = useTheme()

    const lineChartEl = ref(null)
    const barChartEl = ref(null)

    onMounted(() => {
      useLineChart(
        lineChartEl,
        ['6/21(一)', '6/22(二)', '6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)'],
        [
          {
            label: '6/21 - 6/27',
            data: [0, 10, 5, 2, 20, 30, 45],
            color: applyColor({ violet: '#7C3AED', indigo: '#4f46e5', dark: '#C4B5FD' }), // violet-600
          },
          {
            label: '6/14 - 6/20',
            data: [6, 25, 22, 37, 14, 8, 4],
            color: applyColor({ violet: '#C4B5FD', indigo: '#a5b4fc', dark: '#7C3AED' }), // violet-300
          },
        ]
      )

      useBarChart(
        barChartEl,
        ['一', '二', '三', '四', '五', '六', '日'],
        [
          {
            label: '電腦',
            data: [0, 10, 5, 2, 20, 30, 45],
            color: applyColor({ violet: '#7C3AED', indigo: '#4f46e5', dark: '#C4B5FD' }), // violet-600
          },
          {
            label: '手機',
            data: [6, 25, 22, 37, 14, 8, 4],
            color: applyColor({ violet: '#C4B5FD', indigo: '#a5b4fc', dark: '#7C3AED' }), // violet-300
          },
        ]
      )
    })

    const postsColumns = ref([
      { key: 'title', label: '標題' },
      { key: 'visits', label: '瀏覽次數' },
      { key: 'created_at', label: '建立日期' },
    ])

    const postsData = ref([
      {
        id: 1,
        title: '我的文章1',
        visits: 38,
        visits_trending_is_up: false,
        visits_trending_value: 4,
        created_at: '2021/11/01',
      },
      {
        id: 2,
        title: '我的文章2',
        visits: 29,
        visits_trending_is_up: false,
        visits_trending_value: 9,
        created_at: '2021/11/01',
      },
      {
        id: 3,
        title: '我的文章3',
        visits: 13,
        visits_trending_is_up: true,
        visits_trending_value: 12,
        created_at: '2021/11/01',
      },
      {
        id: 4,
        title: '我的文章4',
        visits: 4,
        visits_trending_is_up: false,
        visits_trending_value: 3,
        created_at: '2021/11/01',
      },
      {
        id: 5,
        title: '我的文章5',
        visits: 15,
        visits_trending_is_up: false,
        visits_trending_value: 8,
        created_at: '2021/11/01',
      },
      {
        id: 6,
        title: '我的文章6',
        visits: 45,
        visits_trending_is_up: true,
        visits_trending_value: 18,
        created_at: '2021/11/01',
      },
      {
        id: 7,
        title: '我的文章7',
        visits: 71,
        visits_trending_is_up: true,
        visits_trending_value: 7,
        created_at: '2021/11/01',
      },
    ])

    const comments = ref([
      {
        author_name: 'Lucas 洛可',
        author_avatar: 'https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Lucas 洛可',
        author_avatar: 'https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg',
        content: '哈囉~~ 你好~',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Lucas 洛可',
        author_avatar: 'https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Lucas 洛可',
        author_avatar: 'https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
    ])

    return {
      lineChartEl,
      barChartEl,

      postsColumns,
      postsData,

      comments,
    }
  },
}
</script>
