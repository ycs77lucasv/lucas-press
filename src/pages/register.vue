<template>
  <div class="flex justify-center items-center bg-violet-600 indigo:bg-indigo-600 dark:bg-gray-800 min-h-screen">
    <div class="w-[400px] px-4">
      <h1 class="flex justify-center items-center text-white">
        <heroicons-outline-book-open class="w-10 h-10 mr-2" />
        <span class="text-4xl font-medium">LucasPress</span>
      </h1>

      <Card class="mt-8 p-6 sm:p-8">
        <form class="space-y-8" @submit.prevent="handleSubmit">
          <TextInput label="姓名" id="name" v-model="form.name" />
          <TextInput label="E-mail" type="email" id="email" v-model="form.email" />
          <TextInput label="密碼" type="password" id="password" v-model="form.password" />
          <TextInput label="確認密碼" type="password" id="confirm_password" v-model="form.confirm_password" />

          <PrimaryButton type="submit" class="w-full" :loading="loading">
            註冊
          </PrimaryButton>
        </form>

        <hr class="mt-6 mb-4 border-gray-300 dark:border-gray-500">
        <div class="text-center text-gray-600 dark:text-gray-300">
          已經註冊過? <RouterLink to="/login" class="link">登入帳號</RouterLink>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { promiseTimeout } from '@vueuse/core'

export default {
  setup() {
    const router = useRouter()

    const loading = ref(false)

    const form = reactive({
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    })

    const handleSubmit = async () => {
      loading.value = true
      await promiseTimeout(1000)
      loading.value = false

      router.push('/')
    }

    return { form, loading, handleSubmit }
  },
}
</script>
