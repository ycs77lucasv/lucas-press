<template>
  <div class="sticky top-0 inset-0 z-10 px-3 py-2 flex items-center flex-wrap bg-white border-b border-gray-200 rounded-t-md">
    <template v-for="(item, index) in items">
      <div class="w-[2px] h-5 bg-gray-200 ml-2 mr-3" v-if="item.type === 'divider'" :key="`divider${index}`" />
      <EditorMenuLink v-else-if="item.icon === 'link'" :key="item.icon" v-bind="item" />
      <EditorMenuItem v-else :key="item.icon" v-bind="item" />
    </template>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const editor = inject('editor')

    const items = [
      {
        icon: 'bold',
        title: '粗體',
        action: () => editor.value.chain().focus().toggleBold().run(),
        isActive: () => editor.value.isActive('bold'),
      },
      {
        icon: 'italic',
        title: '斜體',
        action: () => editor.value.chain().focus().toggleItalic().run(),
        isActive: () => editor.value.isActive('italic'),
      },
      {
        icon: 'strikethrough',
        title: '刪除線',
        action: () => editor.value.chain().focus().toggleStrike().run(),
        isActive: () => editor.value.isActive('strike'),
      },
      {
        icon: 'link',
        title: '連結',
        action: url => {
          if (typeof url === 'string') {
            editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
          } else if (editor.value.isActive('link')) {
            editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
          }
        },
        isActive: () => editor.value.isActive('link'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'h-1',
        title: '標題 1',
        action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 1 }),
      },
      {
        icon: 'h-2',
        title: '標題 2',
        action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 2 }),
      },
      {
        icon: 'paragraph',
        title: '文字',
        action: () => editor.value.chain().focus().setParagraph().run(),
        isActive: () => editor.value.isActive('paragraph'),
      },
      {
        icon: 'list-unordered',
        title: '無序列表',
        action: () => editor.value.chain().focus().toggleBulletList().run(),
        isActive: () => editor.value.isActive('bulletList'),
      },
      {
        icon: 'list-ordered',
        title: '有序列表',
        action: () => editor.value.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.value.isActive('orderedList'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'double-quotes-l',
        title: '註釋區塊',
        action: () => editor.value.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.value.isActive('blockquote'),
      },
      {
        icon: 'separator',
        title: '分隔線',
        action: () => editor.value.chain().focus().setHorizontalRule().run(),
      },
    ]

    return { items }
  },
}
</script>
