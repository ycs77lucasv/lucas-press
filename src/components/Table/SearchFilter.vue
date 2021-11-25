<template>
  <div class="flex items-center">
    <div class="flex flex-grow sm:flex-grow-0">
      <Popover class="relative flex-shrink-0 -mr-px focus:z-[1]">
        <PopoverButton class="form-select pl-4 text-gray-600 rounded-r-none">
          篩選
        </PopoverButton>

        <PopoverPanel class="absolute z-10">
          <div class="mt-2 p-4 w-[270px] bg-white border border-gray-200 rounded-md shadow-lg space-y-4">
            <div>
              <label class="text-gray-400 text-sm">建立日期</label>
              <div class="mt-1 flex">
                <select class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]">
                  <option value="before">之前</option>
                  <option value="after">之後</option>
                </select>
                <input type="date" class="form-input form-input-sm rounded-l-none focus:z-[1]">
              </div>
            </div>

            <div>
              <label class="text-gray-400 text-sm">瀏覽次數</label>
              <div class="mt-1 flex">
                <select class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]">
                  <option value="gt">大於</option>
                  <option value="lt">小於</option>
                </select>
                <input type="number" class="form-input form-input-sm rounded-l-none focus:z-[1]">
              </div>
            </div>

            <div>
              <label class="text-gray-400 text-sm">標籤</label>
              <div class="mt-1">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox mr-1">
                  <span>標籤1</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox mr-1">
                  <span>標籤2</span>
                </label>
              </div>
            </div>

            <div>
              <label class="text-gray-400 text-sm">軟刪除</label>
              <div class="mt-1">
                <label class="flex items-center">
                  <input type="radio" class="form-radio mr-1">
                  <span>默認</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" class="form-radio mr-1">
                  <span>包含軟刪除</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" class="form-radio mr-1">
                  <span>只有軟刪除</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end space-x-2">
              <SecondaryButton class="btn-sm">
                取消
              </SecondaryButton>
              <PrimaryButton class="btn-sm">
                確定
              </PrimaryButton>
            </div>
          </div>
        </PopoverPanel>
      </Popover>

      <input
        type="text"
        placeholder="搜尋..."
        class="form-input placeholder-gray-400 focus:z-[1] rounded-l-none sm:max-w-[200px]"
      >
    </div>

    <button type="button" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors duration-100">
      清除
    </button>
  </div>
</template>

<script>
export default {

}
</script>
