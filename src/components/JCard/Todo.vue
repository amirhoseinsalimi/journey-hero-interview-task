<template>
  <VHover>
    <template #default="{ isHovering, props }">
      <!-- TODO: Add pointer cursor -->
      <VCard :elevation="isHovering ? 5 : 2" v-bind="props">
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
                @click="emitAction(action.action)"
              >
                <VListItemTitle>
                  {{ action.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VCardTitle>
        <VCardSubtitle>
          {{ creationDate }}
        </VCardSubtitle>
        <VCardText>
          {{ description }}
        </VCardText>
      </VCard>
    </template>
  </VHover>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const actions = [
  {
    title: 'Edit',
    color: 'black',
    action: 'edit'
  },
  {
    title: 'Delete',
    color: 'error',
    action: 'delete'
  }
]

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creationDate: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const emitEdit = () => emit('edit')
const emitDelete = () => emit('delete')

const emitAction = (action) => (action === 'edit' ? emitEdit() : emitDelete())
</script>
