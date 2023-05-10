<template>
  <VHover>
    <template #default="{ isHovering, props }">
      <!-- TODO: Add pointer cursor -->
      <VCard :elevation="isHovering ? 5 : 2" v-bind="props" @click="emitClick">
        <VCardTitle class="clearfix">
          {{ title }}

          <VMenu>
            <template #activator="{ props }">
              <VIcon
                v-bind="props"
                class="float-right"
                color="grey"
                icon="mdi-dots-horizontal"
              />
            </template>
            <VList>
              <VListItem
                v-for="action in actions"
                :key="action.title"
                :class="`text-${action.color}`"
                @click="handleAction(action.action)"
              >
                <VListItemTitle>
                  {{ action.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VCardTitle>
        <VCardSubtitle>
          {{ formattedDate }}
        </VCardSubtitle>
        <VCardText>
          {{ description }}
        </VCardText>
      </VCard>
    </template>
  </VHover>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import { __ } from '../../../helpers'

const actions = [
  {
    title: __('edit'),
    color: 'black',
    action: 'edit',
  },
  {
    title: __('delete'),
    color: 'error',
    action: 'delete',
  },
]

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['click', 'edit', 'delete'])

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(new Date(props.creationDate).getTime())
})

const emitEdit = () => emit('edit', props.id)
const emitClick = () => emit('click', props.id)
const emitDelete = () => emit('delete', props.id)

const handleAction = (action: string) =>
  action === 'edit' ? emitEdit() : emitDelete()
</script>
