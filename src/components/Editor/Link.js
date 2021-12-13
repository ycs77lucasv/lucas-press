import { getAttributes } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import { Plugin, PluginKey } from 'prosemirror-state'

export default function (editorEvent) {
  return Link.configure({
    openOnClick: false,
  }).extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('handleEmitSelectLinkEvent'),
          props: {
            handleClick: (view, pos, event) => {
              const attrs = getAttributes(view.state, 'link')
              const link = event.target.closest('a')

              if (link) {
                editorEvent.emit('link-selected', attrs)
                return true
              }

              return false
            },
          },
        })
      ]
    }
  })
}
