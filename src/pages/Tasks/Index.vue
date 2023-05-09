<template>
  <VDataTable
    v-model:sortBy="sortBy"
    class="elevation-1"
    :headers="headers"
    :items="tasksStore.tasks"
  />

  <VBtn
    class="add-fab"
    color="primary"
    elevation="8"
    icon="mdi-plus"
    size="large"
    @click="handleAddButton"
  />

  <VDialog
    fullscreen
    :modelValue="tasksStore.isAdding || tasksStore.isEditing"
    transition="dialog-bottom-transition"
  >
    <VCard>
      <VToolbar color="primary" dark>
        <VBtn dark icon @click="handleCloseDialog">
          <VIcon> mdi-close </VIcon>
        </VBtn>
        <VToolbarTitle>
          {{ dialogHeaderText }}
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn variant="text" @click="handleSave">
            {{ saveButtonText }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>

      <JFormTask
        v-model:description="task.description"
        v-model:dueDate="task.dueDate"
        v-model:priority="task.priority"
        v-model:title="task.title"
      />
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { __ } from '../../helpers'
import { useTasksStore } from '../../store/modules/tasks'
import { useRoute } from 'vue-router'
import JFormTask from './components/JFormTask.vue'

const sortBy = ref([{ key: 'calories', order: 'asc' }])

const task = ref({
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: null,
})

const route = useRoute()
const currentTodoId = computed(() => route.params.id.toString())

const headers = ref([
  {
    title: __('title'),
    key: 'title',
    align: 'start',
    sortable: true,
  },
  {
    title: __('description'),
    key: 'description',
    align: 'start',
    sortable: true,
  },
  {
    title: __('dueDate'),
    key: 'dueDate',
    align: 'start',
    sortable: true,
  },
  {
    title: __('priority'),
    key: 'priority',
    align: 'start',
    sortable: true,
  },
])

const tasksStore = useTasksStore()

const saveButtonText = computed(() =>
  tasksStore.isEditing.value ? __('save') : __('add')
)

const dialogHeaderText = computed(() =>
  tasksStore.isEditing.value ? __('editTodo') : __('addANewTodo')
)

const handleCloseDialog = () => {
  tasksStore.clearCurrentTask()
  tasksStore.setIsAdding(false)
  tasksStore.setIsEditing(false)
}

const handleSave = () => {
  handleCloseDialog()

  tasksStore.addTaskToTodo(currentTodoId.value, task.value)
}

onBeforeMount(() => {
  console.log(111, tasksStore.tasks)
  tasksStore.getTasksOfTodo(currentTodoId.value)
  console.log(222, tasksStore.tasks)
})

const handleAddButton = () => {
  console.log('aaa')
  tasksStore.setIsAdding(true)
}
</script>
