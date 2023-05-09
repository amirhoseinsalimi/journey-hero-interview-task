<template>
  <VHover>
    <template v-slot:default="{ isHovering, props }">
      <!-- TODO: Add pointer cursor -->
      <VCard
        v-bind:="props"
        :elevation="isHovering ? 5 : 2"
      >
        <VCardTitle class="clearfix">
          {{ title }}

          <v-menu>
            <template v-slot:activator="{ props }">
              <VIcon v-bind="props" class="float-right" color="grey" icon="mdi-dots-horizontal" />
            </template>
            <v-list>
              <v-list-item
                v-for="action in actions"
                :key="action.title"
                @click="emitAction(action.action)"
                :class="`text-${action.color}`"
              >
                <v-list-item-title>
                  {{ action.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
import {defineEmits, defineProps} from 'vue'

const actions = [
  {
    title: 'Edit',
    color: 'black',
    action: 'edit',
  },
  {
    title: 'Delete',
    color: 'error',
    action: 'delete',
  }
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
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const emitAction = (action) =>
    action === 'edit' ? emitEdit() : emitDelete()

const emitEdit = () => emit('edit')
const emitDelete = () => emit('delete')
</script>
