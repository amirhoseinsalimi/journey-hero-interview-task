<template>
  <VNavigationDrawer v-model="internalOpen" temporary>
    <VContainer>
      <VSelect v-model="priority" :items="priorities" :label="__('priority')" />

      <VTextField
        v-model="dueDateRange"
        class="start-due-date"
        :label="__('dueDate')"
      />

      <DatePicker
        v-model="dueDateRange"
        appendTo="body"
        customInput=".start-due-date"
        displayFormat="MM/DD/YYYY"
        format="MM/DD/YYYY"
        locale="en"
        range
        type="date"
      />

      {{ dueDateRange }}

      <VBtn
        block
        class="mb-3"
        color="success"
        flat
        variant="outlined"
        @click="filter"
      >
        {{ __('filter') }}
      </VBtn>

      <VBtn block color="error" flat variant="outlined" @click="clearFilters">
        <VIcon> mdi-close </VIcon>
        {{ __('clearFilters') }}
      </VBtn>
    </VContainer>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import DatePicker from 'vue3-persian-datetime-picker'
import { computed, ref } from 'vue'
import { __ } from '@/helpers'
import { priorities } from '@/shared'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
    required: false,
  },
})
const emit = defineEmits(['update:open', 'filter', 'clear'])

const internalOpen = computed({
  get() {
    return props.open
  },
  set(open) {
    emit('update:open', open)
  },
})

const dueDateRange = ref(null)
const priority = ref('Medium')

const unsetValues = () => {
  dueDateRange.value = null
  priority.value = 'Medium'
}

const filter = () => {
  const dateRange = dueDateRange?.value

  emit('filter', {
    priority,
    dueDateStart: dateRange ? dateRange[0] : null,
    dueDateEnd: dateRange ? dateRange[1] : null,
    hasFilters: true,
  })

  emit('update:open', false)
}

const clearFilters = () => {
  unsetValues()

  emit('clear', {
    hasFilters: false,
  })

  emit('update:open', false)
}
</script>
