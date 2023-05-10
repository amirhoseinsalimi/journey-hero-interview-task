import { ref } from 'vue'

export default function useToggle(initialValue = false) {
  const val = ref<boolean>(initialValue)

  const toggle = (to) => {
    if (typeof to === 'boolean') {
      val.value = to
      return
    }

    val.value = !val.value
  }

  return [val, toggle]
}
