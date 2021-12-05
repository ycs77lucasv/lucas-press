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
          <div>
            <label class="form-label">
              縮圖
            </label>
            <div class="aspect-w-16 aspect-h-9">
              <div class="flex justify-center items-center bg-gray-400 text-white rounded-md">
                <heroicons-outline-photograph class="w-10 h-10" />
              </div>
            </div>
            <PrimaryButton class="mt-3 w-full flex items-center">
              <heroicons-outline-cloud-upload class="mr-1" />
              上傳圖片
            </PrimaryButton>
            <div class="mt-2 text-gray-400 text-sm">
              圖片最大 5MB
            </div>
            <!-- <div class="form-error">請輸入標題</div> -->
          </div>

          <TextareaInput label="文章簡介" id="description" v-model="form.description" />

          <div>
            <label for="tags" class="form-label">
              標籤
            </label>
            <input type="text" class="form-input" id="tags" v-model="form.tags">
            <!-- <div class="form-error">請輸入標題</div> -->
          </div>

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
    </Card>
  </Layout>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { successNotify } from '@/composables/useNotification'

export default {
  setup() {
    const router = useRouter()

    const form = reactive({
      title: '',
      content: `哈囉~ 我是 Lucas~`,
      image: null,
      description: '',
      tags: '',
    })

    const submit = () => {
      router.push('/posts').then(() => {
        successNotify('文章發布成功')
      })
    }

    const submitDraft = () => {
      router.push('/posts').then(() => {
        successNotify('草稿保存成功')
      })
    }

    return { form, submit, submitDraft }
  },
}
</script>
