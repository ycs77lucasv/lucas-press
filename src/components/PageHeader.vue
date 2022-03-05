<template>
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-semibold tracking-wider text-gray-900 dark:text-white">
      <slot name="title"></slot>
    </h1>

    <div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
