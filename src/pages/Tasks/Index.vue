<template>
  <VRow>
    <VCol cols="5" md="4" xl="2">
      <VSelect
        v-model="selectedHeaders"
        :items="headers"
        label="Select"
        multiple
      />
    </VCol>
  </VRow>

  <VDataTable
    v-model:sortBy="sortBy"
    class="elevation-1"
    :headers="tableHeaders"
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
import { __, camelize } from '../../helpers'
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
const currentTodoId = computed(() => route.params.todoId.toString())

const headers = ref([
  __('title'),
  __('description'),
  __('dueDate'),
  __('priority'),
])
const selectedHeaders = ref(headers.value)

const tableHeaders = computed(() =>
  selectedHeaders.value.map((header) => ({
    title: header,
    key: camelize(header),
    align: 'start',
    sortable: true,
  }))
)

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
  tasksStore.getTasksOfTodo(currentTodoId.value)
})

const handleAddButton = () => {
  console.log('aaa')
  tasksStore.setIsAdding(true)
}
</script>
