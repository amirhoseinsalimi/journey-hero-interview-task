<template>
  <VForm>
    <VContainer>
      <VRow>
        <VCol cols="12" md="4">
          <VTextField v-model="internalTitle" :label="__('title')" />
        </VCol>

        <VCol cols="12" md="4">
          <VTextField
            v-model="internalDueDate"
            class="task-due-date"
            :label="__('dueDate')"
          />

          <DatePicker
            v-model="internalDueDate"
            customInput=".task-due-date"
            displayFormat="DD/MM/YYYY HH:mm"
            format="DD/MM/YYYY HH:mm"
            locale="en"
            type="datetime"
          />
        </VCol>

        <VCol cols="12" md="4">
          <VSelect
            v-model="internalPriority"
            :items="priorities"
            :label="__('priority')"
          />
        </VCol>

        <VCol cols="12">
          <VTextarea v-model="internalDescription" :label="__('description')" />
        </VCol>
      </VRow>
    </VContainer>
  </VForm>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { __ } from '../../../helpers/index'
import DatePicker from 'vue3-persian-datetime-picker'

const priorities = ['High', 'Medium', 'Low']

const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false,
  },
  description: {
    type: String,
    default: '',
    required: false,
  },
  dueDate: {
    type: Number,
    default: null,
    required: false,
  },
  priority: {
    type: String,
    required: true,
    validator: (value: string) => ['High', 'Medium', 'Low'].includes(value),
  },
})

const emit = defineEmits([
  'update:title',
  'update:description',
  'update:dueDate',
  'update:priority',
])

const internalTitle = computed({
  get() {
    return props.title
  },
  set(title) {
    emit('update:title', title)
  },
})

const internalDescription = computed({
  get() {
    return props.description
  },
  set(description) {
    emit('update:description', description)
  },
})

const internalDueDate = computed({
  get() {
    return props.dueDate
  },
  set(dueDate) {
    emit('update:dueDate', dueDate)
  },
})

const internalPriority = computed({
  get() {
    return props.priority
  },
  set(priority) {
    emit('update:priority', priority)
  },
})
</script>
