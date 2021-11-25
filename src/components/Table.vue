<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-5 py-3 text-left">
            <SelectAllCheckbox
              :state="selectAllState"
              @update:state="updateSelectAllState"
              :disabled="selectAllDisabled"
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
    class="border-t border-gray-200"
  />

  <ActionsBar :show="showActionsBar">
    <div class="text-gray-600 text-sm sm:text-base">
      已選取 {{ selectedIds.length }} 筆資料
    </div>

    <div class="space-x-2">
      <PrimaryButton class="btn-sm sm:btn-base" @click="updateSelectAllState('all')">
        全選
      </PrimaryButton>
      <DangerButton class="btn-sm sm:btn-base" @click="deleteRows">
        刪除
      </DangerButton>
      <SecondaryButton class="btn-sm sm:btn-base" @click="updateSelectAllState('none')">
        取消
      </SecondaryButton>
    </div>
  </ActionsBar>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'
import { useConfirm } from '@/composables/useConfirmModal'

export default {
  emits: ['delete-selected'],
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
      default: '確定要刪除嗎?',
    },
  },
  setup(props, { emit }) {
    const columnsCount = computed(() => {
      return props.columns.length + 2
    })

    const showActionsBar = ref(false)

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

    const selectAllDisabled = computed(() => {
      return props.data.length === 0
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

    // 刪除行
    const deleteRows = async () => {
      if (await useConfirm(props.confirmDeleteText)) {
        emit('delete-selected', selectedIds.value)

        await nextTick()
        rowSelectStatus.value = props.data.map(_ => false)
        selectAllState.value = 'none'
      }
    }

    // pagination
    const currentPage = ref(1)
    const totalPage = ref(10)

    watch(selectAllState, selectAllState => {
      showActionsBar.value = ['all', 'some'].includes(selectAllState)
    })

    return {
      columnsCount,
      showActionsBar,

      selectAllState,
      rowSelectStatus,
      selectedIds,
      selectAllDisabled,

      updateSelectAllState,
      updateRowSelectStatus,
      deleteRows,

      // pagination
      currentPage,
      totalPage,
    }
  },
}
</script>
