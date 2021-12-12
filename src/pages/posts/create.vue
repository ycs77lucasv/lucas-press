<template>
  <Layout>
    <PageHeader>
      <template #title>
        <RouterLink to="/posts" class="link">文章</RouterLink>
        / 新增文章
      </template>
    </PageHeader>

    <Card class="mt-6" stretch>
      <div class="p-4 grid gap-6 lg:grid-cols-12">
        <!-- 左側文章標題/內容 -->
        <div class="space-y-6 lg:col-span-8 xl:col-span-9">
          <TextInput label="文章標題" id="title" v-model="form.title" />

          <TextareaInput label="文章內容" id="content" v-model="form.content" class="h-[200px]" />

          <!-- 電腦版 - 送出按鈕 -->
          <div class="hidden lg:flex lg:justify-end lg:items-center lg:space-x-4">
            <SecondaryButton @click="submitDraft">
              保存草稿
            </SecondaryButton>
            <PrimaryButton @click="submit">
              發布文章
            </PrimaryButton>
          </div>
        </div>

        <!-- 右側側邊欄 -->
        <div class="space-y-6 lg:col-span-4 xl:col-span-3">
          <ImageUpload
            label="縮圖"
            id="image"
            v-model="form.image"
            :default-image="defaultImage"
          />

          <TextareaInput label="文章簡介" id="description" v-model="form.description" />

          <TagsInput
            label="標籤"
            id="tags"
            v-model="form.tags"
            :autocomplete-items="tagsAutocompleteItems"
          />

          <!-- 手機版 - 送出按鈕 -->
          <div class="grid grid-cols-2 gap-4 lg:hidden">
            <SecondaryButton @click="submitDraft">
              保存草稿
            </SecondaryButton>
            <PrimaryButton @click="submit">
              發布文章
            </PrimaryButton>
          </div>
        </div>
      </div>

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
      title: '',
      content: `哈囉~ 我是 Lucas~`,
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
