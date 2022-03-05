import { computed, watch } from 'vue'
import { useLocalStorage, usePreferredDark } from '@vueuse/core'

const themeOptions = [
  { label: '紫色', value: 'violet', color: 'bg-violet-500' },
  { label: '藍色', value: 'indigo', color: 'bg-indigo-500', htmlClass: 'theme-indigo' },
  { label: '黑色', value: 'dark', color: 'bg-gray-600', htmlClass: 'dark' },
  { label: '跟隨系統', value: 'system', color: 'bg-gray-400' },
]

const theme = useLocalStorage('theme', 'violet')
const isPreferredDark = usePreferredDark()

const currentTheme = computed(() => themeOptions.find(item => item.value === theme.value))

const isDark = computed(() =>
  currentTheme.value.value === 'dark' ||
  currentTheme.value.value === 'system' && isPreferredDark.value
)

const applyColor = mapping => {
  if (currentTheme.value.value === 'system') {
    return mapping[isPreferredDark.value ? 'dark' : 'violet'] || ''
  }
  return mapping[theme.value] || ''
}

watch([theme, isPreferredDark], () => {
  document.documentElement.classList.remove(
    ...themeOptions
      .filter(item => item.htmlClass)
      .map(item => item.htmlClass)
  )

  if (currentTheme.value &&
      currentTheme.value.htmlClass
  ) {
    document.documentElement.classList.add(currentTheme.value.htmlClass)
  } else if (currentTheme.value.value === 'system' && isPreferredDark.value) {
    document.documentElement.classList.add('dark')
  }
}, { immediate: true })

export function useTheme() {
  return { theme, themeOptions, currentTheme, isDark, applyColor }
}
