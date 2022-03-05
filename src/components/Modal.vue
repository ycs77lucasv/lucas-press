<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="handleCancel">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-gray-700/20 dark:bg-gray-900/50" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-sm my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-700 shadow-xl rounded-2xl"
            >
              <div class="px-6 py-4">
                <slot name="icon"></slot>

                <slot name="title">
                  <DialogTitle as="h3" class="text-2xl text-center font-medium text-gray-900">
                    {{ title }}
                  </DialogTitle>
                </slot>

                <slot name="content"></slot>
              </div>

              <div class="p-6">
                <slot name="footer">
                  <PrimaryButton class="w-full py-1.5" @click="handleSuccess">
                    確定
                  </PrimaryButton>
                </slot>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useVModel } from '@vueuse/core'

export default {
  emits: ['update:modelValue', 'success', 'cancel'],
  props: {
    modelValue: Boolean,
    title: String,
  },
  setup(props, { emit }) {
    const isOpen = useVModel(props)

    const openModal = () => {
      isOpen.value = true
    }
    const closeModal = () => {
      isOpen.value = false
    }

    const handleSuccess = () => {
      emit('success')
      closeModal()
    }

    const handleCancel = () => {
      emit('cancel')
      closeModal()
    }

    return { isOpen, openModal, closeModal, handleSuccess, handleCancel }
  },
}
</script>
