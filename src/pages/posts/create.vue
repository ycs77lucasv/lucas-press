<template>
  <Layout>
    <PageHeader>
      <template #title>
        <RouterLink to="/posts" class="link">文章</RouterLink>
        / 新增文章
      </template>
    </PageHeader>

    <Card class="mt-6" stretch>
      <CardContent>
        <PostForm
          v-model="form"
          :default-image="defaultImage"
          :tags-autocomplete-items="tagsAutocompleteItems"
          @submit="submit"
          @submit-draft="submitDraft"
        />
      </CardContent>

      <Loading :show="loading" text="保存中..." />
    </Card>
  </Layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { promiseTimeout } from '@vueuse/core'
import { successNotify } from '@/composables/useNotification'

export default {
  setup() {
    const router = useRouter()

    const loading = ref(false)

    const defaultImage = ref('')

    const tagsAutocompleteItems = ref([
      'Vue 2',
      'Vue 3',
      'Tailwind CSS',
    ])

    const form = reactive({
      title: '',
      content: '',
      image: null,
      description: '',
      tags: [],
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
