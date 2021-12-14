<template>
  <Layout>
    <PageHeader>
      <template #title>
        <RouterLink to="/posts" class="link">文章</RouterLink>
        / 編輯文章
      </template>
    </PageHeader>

    <Card class="mt-6" stretch>
      <PostForm
        class="p-4"
        v-model="form"
        :default-image="defaultImage"
        :tags-autocomplete-items="tagsAutocompleteItems"
        @submit="submit"
        @submit-draft="submitDraft"
      />

      <Loading :show="loading" text="保存中..." />
    </Card>
  </Layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { promiseTimeout } from '@vueuse/shared'
import { successNotify } from '@/composables/useNotification'

export default {
  setup() {
    const router = useRouter()

    const loading = ref(false)

    const defaultImage = ref('https://lucas-hiskio-2021-tailwindcss-slide.vercel.app/thumbnail.png')

    const tagsAutocompleteItems = ref([
      'Vue 2',
      'Vue 3',
      'Tailwind CSS',
    ])

    const form = reactive({
      title: '這是我的文章',
      content: `哈囉~ 我是 Lucas~`,
      image: null,
      description: '123456',
      tags: ['Tailwind CSS'],
    })

    const submit = async () => {
      loading.value = true
      await promiseTimeout(1000)
      loading.value = false

      router.push('/posts').then(() => {
        successNotify('文章發布成功')
      })
    }

    const submitDraft = async () => {
      loading.value = true
      await promiseTimeout(1000)
      loading.value = false

      router.push('/posts').then(() => {
        successNotify('草稿保存成功')
      })
    }

    return {
      loading,
      defaultImage,
      tagsAutocompleteItems,
      form,
      submit,
      submitDraft,
    }
  },
}
</script>
