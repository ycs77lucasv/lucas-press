<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="absolute z-40 inset-0 bg-white/90 flex justify-center items-center text-violet-600">
      <LoadingIcon class="w-6 h-6" />
      <span class="ml-2 text-lg">{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '載入中...',
    },
  },
}
</script>
