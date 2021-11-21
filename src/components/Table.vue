<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-5 py-3 text-left">
            <SelectAllCheckbox
              :state="selectAllState"
              @update:state="updateSelectAllState"
            />
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
          v-for="(record, index) in data"
          :key="record.id"
          :class="{ 'bg-violet-50': rowSelectStatus[index] }"
        >
          <td class="pl-5 py-3">
            <SelectRowCheckbox
              :state="rowSelectStatus[index]"
              :index="index"
              @update:state="updateRowSelectStatus"
            />
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

  <Paginator
    v-model:current-page="currentPage"
    :total-page="totalPage"
  />
</template>

<script>
import { ref, computed } from 'vue'

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

    // 全部行的選取狀態
    const selectAllState = ref('none')

    // 單行的選取狀態 [false, true, false]
    const rowSelectStatus = ref(props.data.map(_ => false))

    // 已選取的行 id [2, 3]
    const selectedIds = computed(() => {
      return props.data
        .filter((_, index) => rowSelectStatus.value[index])
        .map(record => record.id)
    })

    // 更新 [全部行的選取狀態]
    const updateSelectAllState = state => {
      selectAllState.value = state

      rowSelectStatus.value = rowSelectStatus.value
        .map(() => selectAllState.value === 'all')
    }

    // 更新 [單行的選取狀態]
    const updateRowSelectStatus = (state, index) => {
      rowSelectStatus.value[index] = state

      // 當全部勾選時
      if (selectedIds.value.length === props.data.length) {
        selectAllState.value = 'all'
      }
      // 當部分勾選時
      else if (
        selectedIds.value.length > 0 &&
        selectedIds.value.length < props.data.length
      ) {
        selectAllState.value = 'some'
      }
      // 當沒有勾選時
      else {
        selectAllState.value = 'none'
      }
    }

    // pagination
    const currentPage = ref(1)
    const totalPage = ref(10)

    return {
      columnsCount,

      selectAllState,
      rowSelectStatus,

      updateSelectAllState,
      updateRowSelectStatus,

      // pagination
      currentPage,
      totalPage,
    }
  },
}
</script>
