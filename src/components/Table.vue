<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-5 py-3 text-left">
            <input type="checkbox" class="form-checkbox">
          </th>

          <th
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-3 text-left text-sm text-gray-400 font-medium tracking-wider whitespace-nowrap"
          >
            {{ column.label }}
          </th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in data"
          :key="record.id"
        >
          <td class="pl-5 py-3">
            <input type="checkbox" class="form-checkbox">
          </td>

          <td
            v-for="column in columns"
            :key="column.key"
            class="px-5 py-3 text-gray-600 whitespace-nowrap"
          >
            <slot
              :name="`column-${column.key}`"
              :column="column"
              :record="record"
              :value="record[column.key]"
            >
              {{ record[column.key] }}
            </slot>
          </td>

          <td class="px-5 py-3 text-gray-600 whitespace-nowrap">
            <slot name="actions" :record="record" :confirmDeleteText="confirmDeleteText"></slot>
          </td>
        </tr>

        <tr v-if="!data.length">
          <td :colspan="columnsCount" class="py-12 text-center text-gray-400">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    emptyText: {
      type: String,
      default: '當前沒有任何資料',
    },
    confirmDeleteText: {
      type: String,
      default: '確定要執行刪除?',
    },
  },
  setup(props) {
    const columnsCount = computed(() => {
      return props.columns.length + 2
    })

    return { columnsCount }
  },
}
</script>
