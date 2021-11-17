<template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="showModal = true">開啟視窗</PrimaryButton>

      <Modal v-model="showModal">
        <template #title>
          哈囉 我是標題
        </template>

        <template #content>
          <div class="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores dolor deleniti ullam nihil exercitationem rerum fugit aperiam, porro iste id non iure suscipit veritatis at cum nostrum accusamus cupiditate.
          </div>
        </template>
      </Modal>
    </div>
  </Layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showModal = ref(false)

    return { showModal }
  },
}
</script>
