<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>

    <div class="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
      <!-- 預覽圖片 -->
      <img
        v-if="previewImageSrc || defaultImage"
        :src="previewImageSrc || defaultImage"
        class="object-cover"
      >

      <!-- 預設佔位灰底區塊 -->
      <div v-else class="flex justify-center items-center bg-gray-400 text-white">
        <heroicons-outline-photograph class="w-10 h-10" />
      </div>

      <!-- 刪除圖片按鈕 -->
      <div v-if="modelFile">
        <button
          type="button"
          class="absolute top-4 right-4 w-6 h-6 flex justify-center items-center bg-gray-700/50 text-white rounded-full"
          @click="removeSelectedFile"
        >
          <heroicons-outline-x class="w-5 h-5" />
        </button>
      </div>
    </div>

    <PrimaryButton class="mt-3 w-full flex items-center" @click="selectFile">
      <heroicons-outline-cloud-upload class="mr-1" />
      上傳圖片
    </PrimaryButton>

    <div v-if="error" class="form-error">{{ error }}</div>
    <div class="mt-2 text-gray-400 text-sm">
      圖片最大 5MB
    </div>

    <input
      ref="fileEl"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onChangeFile"
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'

export default {
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    id: String,
    modelValue: File,
    defaultImage: String,
    label: String,
    error: String,
    wrapperClass: [String, Array, Object],
  },
  setup(props, { emit }) {
    const modelFile = useVModel(props)
    const fileEl = ref(null)
    const previewImageSrc = ref(null)

    const selectFile = () => {
      fileEl.value.click()
    }

    const onChangeFile = () => {
      const [file] = fileEl.value.files

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const dataUrl = reader.result
        previewImageSrc.value = dataUrl
        emit('update:modelValue', file)
      }
    }

    const removeSelectedFile = () => {
      previewImageSrc.value = null
      emit('update:modelValue', null)
    }

    return { modelFile, fileEl, previewImageSrc, selectFile, onChangeFile, removeSelectedFile }
  },
}
</script>
