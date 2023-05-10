<template>
  <VForm>
    <VContainer>
      <VRow>
        <VCol cols="12">
          <VTextField v-model="internalTitle" :label="__('title')" required />
        </VCol>

        <VCol cols="12">
          <VTextarea
            v-model="internalDescription"
            :label="__('description')"
            required
          />
        </VCol>
      </VRow>
    </VContainer>
  </VForm>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { __ } from '../../../helpers/index'

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
})

const emit = defineEmits(['update:title', 'update:description'])

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
</script>
