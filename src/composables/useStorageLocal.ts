import { ref, watch } from 'vue'

export default function useStorageLocal<T>(
  key,
  config = { initialValue: any, override: false, deep: true, serialize: false },
) {
  if (typeof key !== 'string') {
    throw TypeError("'key' must be of type string")
  }

  if (!key) {
    throw RangeError("'key' can't be an empty string")
  }

  function remove() {
    window.localStorage.removeItem(key)
  }

  function shouldSerialize() {
    return config.serialize
  }

  function write(value) {
    if (value === '' || value === null) {
      return remove()
    }

    let valueToWrite = value

    if (shouldSerialize()) {
      valueToWrite = JSON.stringify(value)
    }

    window.localStorage.setItem(key, valueToWrite)
  }

  function read() {
    if (shouldSerialize()) {
      return JSON.parse(window.localStorage.getItem(key))
    }

    return window.localStorage.getItem(key)
  }

  const storedVal = read()

  const value = ref(null)

  if (storedVal) {
    value.value = storedVal
  } else {
    value.value = config.initialValue

    write(value.value)
  }

  if (config.override && config.initialValue) {
    value.value = config.initialValue
  }

  watch(value, write, { deep: config.deep })

  return value
}
