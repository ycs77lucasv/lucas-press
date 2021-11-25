<template>
  <div class="flex items-center">
    <div class="flex flex-grow md:flex-grow-0">
      <Popover class="relative flex-shrink-0 -mr-px focus:z-[1]">
        <PopoverButton class="form-select pl-4 text-gray-600 rounded-r-none">
          篩選
        </PopoverButton>

        <TransitionZoom>
          <PopoverPanel
            class="absolute z-10 origin-top-left"
            v-slot="{ close }"
          >
            <div class="mt-2 p-4 w-[270px] bg-white border border-gray-200 rounded-md shadow-lg space-y-4">
              <div>
                <label class="text-gray-400 text-sm">建立日期</label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.created_date_compare"
                    class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                  >
                    <option value="before">之前</option>
                    <option value="after">之後</option>
                  </select>
                  <input
                    v-model="form.created_date_value"
                    type="date"
                    class="form-input form-input-sm rounded-l-none focus:z-[1]"
                  >
                </div>
              </div>

              <div>
                <label class="text-gray-400 text-sm">瀏覽次數</label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.visits_compare"
                    class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                  >
                    <option value="gt">大於</option>
                    <option value="lt">小於</option>
                  </select>
                  <input
                    v-model="form.visits_count"
                    type="number"
                    class="form-input form-input-sm rounded-l-none focus:z-[1]"
                  >
                </div>
              </div>

              <div>
                <label class="text-gray-400 text-sm">標籤</label>
                <div class="mt-1">
                  <label
                    v-for="tag in tagOptions"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      class="form-checkbox mr-1"
                      v-model="form.tags"
                      :value="tag"
                    >
                    <span>{{ tag }}</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="text-gray-400 text-sm">軟刪除</label>
                <div class="mt-1">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="default"
                    >
                    <span>默認</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="contains"
                    >
                    <span>包含軟刪除</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="only"
                    >
                    <span>只有軟刪除</span>
                  </label>
                </div>
              </div>

              <div class="flex justify-end space-x-2">
                <SecondaryButton class="btn-sm" @click="close">
                  取消
                </SecondaryButton>
                <PrimaryButton class="btn-sm" @click="submit(close)">
                  確定
                </PrimaryButton>
              </div>
            </div>
          </PopoverPanel>
        </TransitionZoom>
      </Popover>

      <input
        type="text"
        placeholder="搜尋..."
        v-model="search"
        class="form-input placeholder-gray-400 focus:z-[1] rounded-l-none md:max-w-[200px]"
        @keyup.enter="submitSearch"
      >
    </div>

    <button
      type="button"
      class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors duration-100"
      @click="reset"
    >
      清除
    </button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  emits: ['filter', 'search', 'reset'],
  setup(props, { emit }) {
    const tagOptions = ref([
      '標籤1', '標籤2', 'Tailwind CSS',
    ])

    const form = reactive({
      created_date_compare: null,
      created_date_value: null,
      visits_compare: null,
      visits_count: null,
      tags: [],
      soft_delete: 'default',
    })
    const search = ref('')

    const submit = close => {
      emit('filter', { ...form })
      close()
    }
    const submitSearch = () => {
      emit('search', search.value)
    }
    const reset = () => {
      form.created_date_compare = null
      form.created_date_value = null
      form.visits_compare = null
      form.visits_count = null
      form.tags = []
      form.soft_delete = 'default'
      search.value = ''
    }

    return { tagOptions, form, search, submit, submitSearch, reset }
  },
}
</script>
