<template>
  <Layout>
    <PageHeader>
      <template #title>個人資料</template>
    </PageHeader>

    <Card class="mt-6" stretch>
      <CardContent>
        <form @submit.prevent="submit">
          <div class="grid gap-6 md:grid-cols-12">
            <div class="space-y-6 md:col-span-9">
              <TextInput label="姓名" id="name" v-model="form.name" />
              <TextareaInput label="介紹" id="description" v-model="form.description" class="h-28" />
            </div>

            <div class="text-center order-first md:col-span-3 md:order-none">
              <ImageUpload
                id="avatar"
                v-model="form.avatar"
                :default-image="defaultAvatar"
                image-class="aspect-w-1 aspect-h-1 rounded-full"
                image-wrapper-class="w-32 mx-auto"
              />
            </div>

            <div class="md:col-span-6">
              <TextInput label="E-mail" type="email" id="email" v-model="form.email" />
            </div>

            <div class="md:col-span-6">
              <TextInput label="密碼" type="password" id="password" v-model="form.password" />
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <PrimaryButton type="submit" class="w-full md:w-auto">
              儲存設定
            </PrimaryButton>
          </div>
        </form>
      </CardContent>

      <Loading :show="loading" text="保存中..." />
    </Card>

    <Card class="mt-10 mb-[120px]" stretch>
      <CardContent>
        <h4 class="text-xl text-gray-800 dark:text-gray-200 font-medium tracking-wide">其他設定</h4>

        <div class="mt-4">
          <label for="theme" class="form-label">主題顏色</label>
          <Select
            id="theme"
            v-model="theme"
            :options="themeOptions"
            class="max-w-[200px]"
          >
            <template #button>
              <div class="inline-flex items-center">
                <div class="w-5 h-5 mr-2 rounded" :class="currentTheme.color"></div>
                {{ currentTheme.label }}
              </div>
            </template>
            <template #option="{ option }">
              <div class="inline-flex items-center">
                <div class="w-5 h-5 mr-2 rounded" :class="option.color"></div>
                {{ option.label }}
              </div>
            </template>
          </Select>
        </div>
      </CardContent>
    </Card>
  </Layout>
</template>

<script>
import { reactive, ref } from 'vue'
import { promiseTimeout } from '@vueuse/core'
import { successNotify } from '@/composables/useNotification'
import { useTheme } from '@/composables/useTheme'

export default {
  setup() {
    const loading = ref(false)

    const form = reactive({
      name: 'Lucas 洛可',
      description: '哈囉！我是 Lucas~',
      avatar: null,
      email: 'test@email.com',
      password: '',
    })

    const defaultAvatar = ref('https://cdn.jsdelivr.net/npm/slidev-theme-ycs77/public/images/lucas_v_avatar.jpg')

    const submit = async () => {
      loading.value = true
      await promiseTimeout(1000)
      loading.value = false

      successNotify('個人資料保存成功')
    }

    const { theme, themeOptions, currentTheme } = useTheme()

    return {
      loading,
      form,
      defaultAvatar,
      submit,

      theme,
      themeOptions,
      currentTheme,
    }
  },
}
</script>
