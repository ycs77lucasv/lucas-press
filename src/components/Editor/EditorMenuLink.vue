<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="isActive() ? 'bg-violet-600 text-white' : 'hover:bg-violet-600 hover:text-white'"
      :title="title"
      @click="handleAction"
    >
      <RemixIcon :icon="icon" />
    </button>

    <div v-if="showPopover" class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] p-2 flex items-center bg-white border border-gray-200 rounded shadow-md">
      <input
        type="text"
        ref="urlEl"
        class="form-input text-sm px-2 py-1"
        placeholder="連結..."
        v-model="url"
        @keyup.enter="handleSubmit"
      >

      <button
        type="button"
        title="插入連結"
        class="ml-1 flex-shrink-0 w-7 h-7 p-1 hover:bg-violet-600 hover:text-white rounded"
        @click="handleSubmit"
      >
        <RemixIcon icon="check-line" />
      </button>

      <button
        type="button"
        title="取消連結"
        class="ml-1 flex-shrink-0 w-7 h-7 p-1 hover:bg-violet-600 hover:text-white rounded"
        @click="handleUnlink"
      >
        <RemixIcon icon="link-unlink" />
      </button>

      <a
        :href="url"
        target="_blank"
        title="瀏覽網頁"
        class="ml-1 flex-shrink-0 w-7 h-7 p-1 hover:bg-violet-600 hover:text-white rounded"
      >
        <RemixIcon icon="external-link-line" />
      </a>
    </div>
  </div>
</template>

<script>
import { inject, onBeforeUnmount, ref, watch } from 'vue'

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    isActive: {
      type: Function,
      default: () => false,
    },
  },
  setup(props) {
    const editor = inject('editor')
    const editorEvent = inject('editorEvent')

    const url = ref('')
    const urlEl = ref(null)

    const showPopover = ref(false)

    editorEvent.on('link-selected', attrs => {
      url.value = attrs.href
    })

    onBeforeUnmount(() => {
      editorEvent.off('link-selected')
    })

    watch(() => props.isActive(), isActive => {
      if (!isActive) {
        showPopover.value = false
      }
    })

    const handleAction = () => {
      showPopover.value = !showPopover.value

      if (!showPopover.value) return

      if (props.isActive()) {
        // 更新連結
        url.value = editor.value.getAttributes('link').href || ''
      } else {
        // 建立連結
        url.value = ''
        props.action(url.value)
      }

      setTimeout(() => {
        urlEl.value.focus()
      })
    }
    
    const handleSubmit = () => {
      props.action(url.value)
      showPopover.value = false
    }

    const handleUnlink = () => {
      props.action(null)
      showPopover.value = false
    }

    return {
      url,
      urlEl,
      showPopover,

      handleAction,
      handleSubmit,
      handleUnlink,
    }
  },
}
</script>
