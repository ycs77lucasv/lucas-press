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
export default {
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const items = [
      {
        icon: 'bold',
        title: '粗體',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold'),
      },
      {
        icon: 'italic',
        title: '斜體',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic'),
      },
      {
        icon: 'strikethrough',
        title: '刪除線',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike'),
      },
      {
        icon: 'link',
        title: '連結',
        action: url => {
          //
        },
        isActive: () => props.editor.isActive('link'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'h-1',
        title: '標題 1',
        action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 1 }),
      },
      {
        icon: 'h-2',
        title: '標題 2',
        action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 2 }),
      },
      {
        icon: 'paragraph',
        title: '文字',
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive('paragraph'),
      },
      {
        icon: 'list-unordered',
        title: '無序列表',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList'),
      },
      {
        icon: 'list-ordered',
        title: '有序列表',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'double-quotes-l',
        title: '註釋區塊',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote'),
      },
      {
        icon: 'separator',
        title: '分隔線',
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
    ]

    return { items }
  },
}
</script>
