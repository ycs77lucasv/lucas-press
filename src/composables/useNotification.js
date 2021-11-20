import { notify as baseNotify } from '@kyvg/vue3-notification'

export function notify(title, text, options) {
  return baseNotify({ title, text, ...options })
}

export function successNotify(title, text, options) {
  return notify(title, text, { ...options, type: 'success' })
}

export function warningNotify(title, text, options) {
  return notify(title, text, { ...options, type: 'warn' })
}

export function errorNotify(title, text, options) {
  return notify(title, text, { ...options, type: 'error' })
}
