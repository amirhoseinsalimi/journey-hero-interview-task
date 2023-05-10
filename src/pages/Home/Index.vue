<template>
  <div>
    <VRow>
      <VCol
        v-for="(todo, id) in todoStore.todos"
        :key="todo.title"
        cols="12"
        lg="4"
        md="6"
        xl="3"
      >
        <JCardTodo
          v-bind="{ ...todo, id: id || todo }"
          @click="openTodoList"
          @delete="openDeleteDialog"
          @edit="openEditDialog"
        />
      </VCol>
    </VRow>

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
      :modelValue="todoStore.isAdding || todoStore.isEditing"
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

        <JFormTodo
          v-model:description="todoStore.currentTodo.description"
          v-model:title="todoStore.currentTodo.title"
        />
      </VCard>
    </VDialog>

    <VDialog v-model="todoStore.isDeleting" width="auto">
      <VCard>
        <VCardText>
          {{ __('areYouSureYouWantToDeleteTodo', todoStore.currentTodo) }}
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { __ } from '@/helpers'
import { useTodoStore } from '@/store/modules/todos'
import JCardTodo from './components/JCardTodo.vue'
import JFormTodo from './components/JFormTodo.vue'

const todoStore = useTodoStore()

const router = useRouter()

const openEditDialog = (todoId: string) => {
  todoStore.setCurrentTodo(todoId)
  todoStore.setIsEditing(true)
}

const openTodoList = async (todoId: string) =>
  await router.push({ name: 'Tasks', params: { todoId } })

const openDeleteDialog = (todoId: string) => {
  todoStore.setCurrentTodo(todoId)
  todoStore.setIsDeleting(true)
}

const handleAddButton = () => {
  todoStore.clearCurrentTodo()
  todoStore.setIsAdding(true)
}

const saveButtonText = computed(() =>
  todoStore.isEditing ? __('save') : __('add')
)

const dialogHeaderText = computed(() =>
  todoStore.isEditing ? __('editTodo') : __('addANewTodo')
)

const formIsValid = computed(
  () => todoStore.currentTodo.description && todoStore.currentTodo.title
)

const handleCloseDialog = () => {
  todoStore.clearCurrentTodo()
  todoStore.setIsAdding(false)
  todoStore.setIsEditing(false)
  todoStore.setIsDeleting(false)
}

const handleSave = () => {
  if (todoStore.isAdding) {
    todoStore.addTodo(todoStore.currentTodo)
  } else {
    todoStore.updateTodo(todoStore.currentTodo.id, todoStore.currentTodo)
  }

  handleCloseDialog()
}

const handleDelete = () => {
  todoStore.deleteTodo(todoStore.currentTodo.id)

  handleCloseDialog()
}
</script>
