<template>
  <VDataTable
    v-model:sortBy="sortBy"
    class="elevation-1"
    :headers="headers"
    :items="tasks"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const sortBy = ref([{ key: 'calories', order: 'asc' }])

const headers = ref([
  {
    title: 'Title',
    key: 'title',
    align: 'start',
    sortable: true,
  },
  {
    title: 'Description',
    key: 'description',
    align: 'start',
    sortable: true,
  },
  {
    title: 'Due Date',
    key: 'dueDate',
    align: 'start',
    sortable: true,
  },
  {
    title: 'Priority',
    key: 'priority',
    align: 'start',
    sortable: true,
  },
])

type Task = {
  title: string
  description: string
  deuDate: string
  priority: string
}

const tasks = ref<Task[]>([
  {
    title: '1',
    description: 'Description',
    deuDate: 'Due Date',
    priority: 'low',
  },
])
</script>
