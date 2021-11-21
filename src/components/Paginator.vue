<template>
  <div class="paginator px-5 py-3">
    <Pagination
      v-model="currentPage"
      :pages="totalPage"
      hide-first-button
      hide-last-button
    />
  </div>
</template>

<script>
import Pagination from '@hennge/vue3-pagination'
import { useVModel } from '@vueuse/core'

export default {
  emits: ['update:currentPage'],
  components: {
    Pagination,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const currentPage = useVModel(props, 'currentPage')

    return { currentPage }
  },
}
</script>
