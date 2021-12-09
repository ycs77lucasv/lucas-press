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
        class="p-6 2xl:p-8"
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
      title: `哈囉！你好~`,
      content: `
        <h2>Hi！我是 Lucas</h2>
        <p>
          我的部落格：<a href="https://lucas-yang.vercel.app/">星星的筆記．Lucas</a>
        </p>
        <img src="https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg" />
        <ul>
          <li><strong>個人嗜好</strong>：刻網站、看動漫</li>
          <li><strong>喜歡的唱見</strong>：hanser、三无Marblue</li>
          <li><strong>喜歡的遊戲</strong>：崩壞3rd、原神</li>
        </ul>
        <p>
          自學網頁前後端，主要以 Laravel、Vue.js、Tailwind CSS 為慣用開發框架。做過幾個小網站。
        </p>
        <blockquote>
          夜空中的小星星，也會閃耀著光芒 ✨
          <br />
          — Lucas
        </blockquote>
      `,
      image: null,
      description: '很高興認識你~',
      tags: ['Tailwind CSS', 'Vue 3'],
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
