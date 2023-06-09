<template>
  <VRow align="center" justify="end">
    <VCol cols="12" md="6" xl="2">
      <VSelect
        v-model="selectedHeaders"
        :items="headers"
        label="Select"
        multiple
      />
    </VCol>

    <VBtn
      class="mb-4"
      color="primary"
      flat
      variant="outlined"
      @click="filterIsOpen ? closeFilters() : openFilters()"
    >
      {{ __('filters') }}
    </VBtn>
  </VRow>

  <VDataTable
    v-model:sortBy="sortBy"
    class="elevation-1"
    :headers="tableHeaders"
    :items="filteredTasks"
  >
    <template #item="{ item }">
      <tr>
        <td v-show="selectedHeaders.includes('Done')">
          <VCheckbox
            v-model="item.columns.done"
            class="pt-5"
            density="compact"
            @click="handleCheck(item)"
          />
        </td>
        <td>
          {{ item.columns.title }}
        </td>
        <td>
          {{ item.columns.description }}
        </td>
        <td>
          {{ item.columns.dueDate }}
        </td>
        <td>
          {{ item.columns.priority }}
        </td>
        <td v-show="selectedHeaders.includes('Edit')">
          <VMenu>
            <template #activator="{ props }">
              <VIcon v-bind="props" color="grey" icon="mdi-dots-vertical" />
            </template>
            <VList>
              <VListItem
                v-for="action in actions"
                :key="action.title"
                :class="`text-${action.color}`"
                @click="handleAction(action.action, item)"
              >
                <VListItemTitle>
                  {{ action.title }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </td>
      </tr>
    </template>
  </VDataTable>

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
          <VBtn :disabled="!formIsValid" variant="text" @click="handleSave">
            {{ saveButtonText }}
          </VBtn>
        </VToolbarItems>
      </VToolbar>

      <JFormTask
        v-model:description="tasksStore.currentTask.description"
        v-model:dueDate="tasksStore.currentTask.dueDate"
        v-model:priority="tasksStore.currentTask.priority"
        v-model:title="tasksStore.currentTask.title"
      />
    </VCard>
  </VDialog>

  <VDialog v-model="tasksStore.isDeleting" width="auto">
    <VCard>
      <VCardText>
        {{ __('areYouSureYouWantToDeleteTask', tasksStore.currentTask) }}
      </VCardText>
      <VCardActions>
        <VBtn color="error" @click="handleDelete">
          {{ __('delete') }}
        </VBtn>

        <VBtn color="primary" @click="handleCloseDialog">
          {{ __('cancel') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <JFilterDrawer
    v-model:open="filterIsOpen"
    @clear="filters = $event"
    @filter="filters = $event"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { __, camelize } from '@/helpers'
import { useTasksStore } from '@/store/modules/tasks'
import { VDataTable } from 'vuetify/labs/VDataTable'
import JFormTask from './components/JFormTask.vue'
import JFilterDrawer from './components/JFilterDrawer.vue'
import useToggle from '@/composables/useToggle'

const sortBy = ref([{ key: 'calories', order: 'asc' }])

const [filterIsOpen, setFilterIsOpen] = useToggle(false)
const filters = ref({})

const openFilters = () => setFilterIsOpen(true)
const closeFilters = () => setFilterIsOpen(false)

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

const task = ref({
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: null,
})

const route = useRoute()
const tasksStore = useTasksStore()

const currentTodoId = computed(() => route.params.todoId.toString())
const formIsValid = computed(
  () =>
    tasksStore.currentTask.description &&
    tasksStore.currentTask.dueDate &&
    tasksStore.currentTask.title
)

const headers = ref([
  __('done'),
  __('title'),
  __('description'),
  __('dueDate'),
  __('priority'),
  __('edit'),
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

const filteredTasks = computed(() => {
  if (!filters.value.hasFilters) {
    return tasksStore.tasks
  }

  const priority = filters.value.priority
  const dueDateEnd = filters.value.dueDateEnd
  const dueDateStart = filters.value.dueDateStart

  if (priority && dueDateStart && dueDateEnd) {
    return tasksStore.tasks.filter(
      (t) =>
        t.priority === filters.value.priority &&
        filters.value.dueDateStart <= t.dueDate &&
        t.dueDate <= filters.value.dueDateEnd
    )
  }

  if (priority && dueDateStart) {
    return tasksStore.tasks.filter(
      (t) =>
        t.priority === filters.value.priority &&
        filters.value.dueDateStart <= t.dueDate
    )
  }

  if (priority) {
    return tasksStore.tasks.filter((t) => t.priority === filters.value.priority)
  }
})

const saveButtonText = computed(() =>
  tasksStore.isEditing ? __('save') : __('add')
)

const dialogHeaderText = computed(() =>
  tasksStore.isEditing ? __('editTodo') : __('addANewTodo')
)

const handleCloseDialog = () => {
  tasksStore.clearCurrentTask()
  tasksStore.setIsAdding(false)
  tasksStore.setIsEditing(false)
  tasksStore.setIsDeleting(false)
}

const handleSave = () => {
  if (tasksStore.isAdding) {
    tasksStore.addTaskToTodo(currentTodoId.value, tasksStore.currentTask)
  } else {
    tasksStore.updateTask(tasksStore.currentTask.id, tasksStore.currentTask)
  }

  handleCloseDialog()
}

onBeforeMount(() => {
  tasksStore.getTasksOfTodo(currentTodoId.value)
})

const handleAddButton = () => {
  tasksStore.clearCurrentTask()
  tasksStore.setIsAdding(true)
}

const handleCheck = (taskItem) => {
  taskItem.raw.done = !taskItem.raw.done
}

const openEditDialog = (taskItem) => {
  tasksStore.setCurrentTask(taskItem.raw)
  tasksStore.setIsEditing(true)
}
const openDeleteDialog = (taskItem) => {
  tasksStore.setCurrentTask(taskItem.raw)
  tasksStore.setIsDeleting(true)
}

onMounted(tasksStore.clearCurrentTask)

const handleAction = (action: string, taskItem: string) =>
  action === 'edit' ? openEditDialog(taskItem) : openDeleteDialog(taskItem)

const handleDelete = () => {
  tasksStore.deleteTask(tasksStore.currentTask.id)

  handleCloseDialog()
}
</script>
