<template>
  <Layout>
    <PageHeader>
      <template #title>文章</template>
      <template #actions>
        <PrimaryButton to="/posts">新增</PrimaryButton>
      </template>
    </PageHeader>

    <Card class="mt-6" stretch>
      <Table :columns="columns" :data="data">
        <template #column-title="{ record, value }">
          <RouterLink :to="`/posts/${record.id}`" class="link font-normal">
            {{ value }}
          </RouterLink>
        </template>
        <template #column-visits="{ value }">
          <heroicons-outline-eye class="inline-block w-4 h-4" />{{ value }}次
        </template>
        <template #column-tags="{ value }">
          <span class="inline-flex space-x-2">
            <span
              v-for="tag in value"
              :key="tag"
              class="px-2 py-0.5 bg-violet-600 text-white text-sm font-normal tracking-wider rounded-full"
            >{{ tag }}</span>
          </span>
        </template>
      </Table>
    </Card>
  </Layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([
      { key: 'title', label: '標題' },
      { key: 'description', label: '簡介' },
      { key: 'visits', label: '瀏覽次數' },
      { key: 'created_at', label: '建立日期' },
      { key: 'tags', label: '標籤' },
    ])

    const data = ref([
      {
        id: 1,
        title: '我的文章1',
        description: '文章簡介文章簡介文章簡介文章簡介...',
        visits: 123,
        created_at: '2021/11/01',
        tags: ['標籤一', '標籤二'],
      },
      {
        id: 2,
        title: '我的文章2',
        description: '文章簡介文章簡介文章簡介文章簡介...',
        visits: 123,
        created_at: '2021/11/01',
        tags: ['標籤一', '標籤二'],
      },
      {
        id: 3,
        title: '我的文章3',
        description: '文章簡介文章簡介文章簡介文章簡介...',
        visits: 123,
        created_at: '2021/11/01',
        tags: ['標籤一', '標籤二'],
      },
    ])

    return { columns, data }
  },
}
</script>
