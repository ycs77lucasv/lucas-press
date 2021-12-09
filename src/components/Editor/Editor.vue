<template>
  <div :class="wrapperClass">
    <label :for="id" class="form-label">
      {{ label }}
    </label>

    <div v-if="editor" class="form-input p-0 focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600">
      <EditorMenuBar :editor="editor" />
      <EditorContent :editor="editor" class="mt-2 px-3 py-2" />
    </div>

    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    id: String,
    modelValue: String,
    label: String,
    error: String,
    wrapperClass: [String, Array, Object],
  },
  setup(props, { emit }) {
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose focus:outline-none !max-w-full min-h-[300px]',
        },
      },
      onUpdate: () => {
        emit('update:modelValue', editor.value.getHTML())
      },
    })

    watch(() => props.modelValue, value => {
      if (editor.value.getHTML() === value) {
        return
      }

      editor.value.commands.setContent(value, false)
    })

    return { editor }
  },
}
</script>
