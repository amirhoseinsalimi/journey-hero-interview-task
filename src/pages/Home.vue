<template>
  <div>
    <VRow>
      {{ todoStore.todos }}
      <VCol
        v-for="todo in todoStore.todos"
        :key="todo.title"
        cols="12"
        lg="4"
        md="6"
        xl="3"
      >
        <JCardTodo
          v-bind="todo"
          @click="handleClick"
          @delete="deleteList"
          @edit="editList"
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
      :scrim="false"
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

        <FormTodo
          v-model:description="todo.description"
          v-model:title="todo.title"
        />
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import JCardTodo from '../components/JCard/Todo.vue'
import { useTodoStore } from '../store/modules/todos'
import FormTodo from '../components/FormTodo.vue'

const todoStore = useTodoStore()

const todo = ref({
  title: '',
  description: '',
})

const router = useRouter()

const editList = () => {
  console.log(editList.name)
}

const deleteList = () => {
  console.log(deleteList.name)
}

const handleClick = async (id) => {
  await router.push({ name: 'Todos', params: { id } })
}

const handleAddButton = () => {
  todoStore.setIsAdding(true)
}

const saveButtonText = computed(() =>
  todoStore.isEditing.value ? 'Save' : 'Add'
)

const dialogHeaderText = computed(() =>
  todoStore.isEditing.value ? 'Edit To-do' : 'Add a new To-do'
)

const handleCloseDialog = () => {
  todoStore.clearCurrentTodo()
  todoStore.setIsAdding(false)
  todoStore.setIsEditing(false)
}

const handleSave = () => {
  handleCloseDialog()

  console.log(todo.value)
  todoStore.addTodo(todo.value)
}
</script>
